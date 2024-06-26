package bg.kidsground.service;

import org.springframework.beans.factory.annotation.Autowired;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.time.Duration;

@Service
public class S3ServiceImpl implements S3Service {

    private final S3Client s3Client;
    private final S3Presigner presigner;
    private final SecretsService secretsService;

    private final AwsCredentialsProvider awsCredentialsProvider;

    @Autowired
    public S3ServiceImpl(SecretsService secretsService, AwsCredentialsProvider awsCredentialsProvider) {
        this.secretsService = secretsService;
        this.awsCredentialsProvider = awsCredentialsProvider;


        this.s3Client = S3Client.builder()
                .region(Region.EU_CENTRAL_1)
                .credentialsProvider(awsCredentialsProvider)
                .build();

        this.presigner = S3Presigner.builder()
                .region(Region.EU_CENTRAL_1)
                .credentialsProvider(awsCredentialsProvider)
                .build();
    }

    public String uploadFile(MultipartFile file) throws IOException {
        String key = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        String bucketName = secretsService.getSecret("s3.imageBucketName");

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

        return key;
    }

    public String getImageUrl(String key) {
        String bucketName = secretsService.getSecret("s3.imageBucketName");
        GetObjectPresignRequest getObjectPresignRequest = GetObjectPresignRequest.builder()
                .getObjectRequest(b -> b.bucket(bucketName).key(key))
                .signatureDuration(Duration.ofMinutes(60))
                .build();

        PresignedGetObjectRequest presignedGetObjectRequest = presigner.presignGetObject(getObjectPresignRequest);
        return presignedGetObjectRequest.url().toString();
    }
}
