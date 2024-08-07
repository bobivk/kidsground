package bg.kidsground.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
public class CommentDto {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("text")
    private String text;

    @JsonProperty("playground_id")
    private Long playgroundId;

    @JsonProperty("rating")
    private Double rating;

    @JsonProperty("username")
    private String username;

    @JsonProperty("createdAt")
    private Date createdAt;
}
