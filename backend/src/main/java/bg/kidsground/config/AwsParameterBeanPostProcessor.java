package bg.kidsground.config;

import jakarta.annotation.PostConstruct;
import java.lang.reflect.Field;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.context.EnvironmentAware;
import org.springframework.core.env.Environment;
import org.springframework.util.ReflectionUtils;
import software.amazon.awssdk.core.exception.SdkException;
import software.amazon.awssdk.services.ssm.SsmClient;
import software.amazon.awssdk.services.ssm.model.GetParametersByPathRequest;
import software.amazon.awssdk.services.ssm.model.GetParametersByPathResponse;
import software.amazon.awssdk.services.ssm.model.Parameter;

public class AwsParameterBeanPostProcessor implements BeanPostProcessor, EnvironmentAware {

    private static final Logger LOG = LoggerFactory.getLogger(AwsParameterBeanPostProcessor.class);
    private final String appName;
    private Environment environment;
    private SsmClient ssmClient;
    private GetParametersByPathResponse applicationParams;

    public AwsParameterBeanPostProcessor(SsmClient ssmClient, String appName) {
        this.ssmClient = ssmClient;
        this.appName = appName;
    }

    @PostConstruct
    public void init() {
        if (ssmClient == null) {
            LOG.warn("application cannot be injected with aws ssm parameters without ssmClient.");
        }
        if (appName == null || appName.isBlank()) {
            LOG.warn("application cannot be injected with aws ssm parameters without setting the 'aws.app.name' property.");
        }
        if (ssmClient != null) {
            try {
                GetParametersByPathRequest byPathRequest = GetParametersByPathRequest.builder().path( "/config/" + appName + "/").build();
                applicationParams = ssmClient.getParametersByPath(byPathRequest);
            } catch (SdkException e) {
                LOG.warn("Unable to retrieve parameters from SSM due to exception: {}", e.getMessage());
                LOG.warn("Parameter injection from SSM will not be possible due to an error communicating with the service. Please check permissions.");
                LOG.warn("Parameter injection will only occur through properties and environment variables");
                ssmClient = null;
            }
        }
    }

    @Override
    public void setEnvironment(Environment environment) {
        this.environment = environment;
    }

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        // instrospec the bean for fields with AwsParameter annotation
        Class<?> clazz = bean.getClass();
        // only scan beans in this package
        if (clazz.getName().startsWith("bg.kidsground")) {
            Field[] fields = clazz.getDeclaredFields();
            for (Field field : fields) {
                if (field.isAnnotationPresent(AwsParameter.class)) {
                    ReflectionUtils.makeAccessible(field);
                    AwsParameter awsParameter = field.getAnnotation(AwsParameter.class);
                    String annotationValue = awsParameter.value();
                    String[] split = annotationValue.split(":");
                    String paramName = split[0];
                    String defaultValue = split.length > 1 ? split[1] : null;

                    if (applicationParams != null) {
                        Optional<Parameter> valueForField = applicationParams.parameters().stream().filter(param -> param.name().contains(paramName)).findFirst();
                        if (valueForField.isPresent()) {
                            LOG.info("Injecting value for field {} into bean {}", paramName, bean.getClass().getCanonicalName());
                            final String value = valueForField.get().value();
                            setField(field, bean, value);
                            continue;
                        }
                    }
                    Object property = environment.getProperty(paramName, field.getType());
                    if (property != null) {
                        setField(field, bean, property);
                    } else if (defaultValue != null) {
                        setField(field, bean, defaultValue);
                    }
                }
            }
        }
        return bean;
    }

    private void setField(Field field, Object bean, Object value) {
        try {
            field.set(bean, value);
        } catch (IllegalArgumentException | IllegalAccessException ex) {
            LOG.error(ex.getMessage(), ex);
        }
    }

}