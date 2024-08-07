package bg.kidsground.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.util.List;

public interface S3Service {
    String uploadFile(MultipartFile file) throws IOException;
    String getImageUrl(String key);
    void deleteImages(List<String> keys);
}
