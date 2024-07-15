package bg.kidsground.domain.dto;

import bg.kidsground.domain.AgeGroup;
import bg.kidsground.domain.Coordinates;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class PlaygroundDto {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("description")
    private String description;

    @JsonProperty("name")
    private String name;

    @JsonProperty("age_group")
    @Enumerated(EnumType.STRING)
    private AgeGroup ageGroup;

    @JsonProperty("has_fence")
    private boolean hasFence;

    @JsonProperty("floor_type")
    private List<String> floorType;

    @JsonProperty("shade_type")
    private String shadeType;

    @JsonProperty("environment")
    private String environment;

    @JsonProperty("transport")
    private List<String> transport = new ArrayList<>();

    @JsonProperty("toys")
    private List<String> toys = new ArrayList<>();

    @JsonProperty("facilities")
    private List<String> facilities = new ArrayList<>();

    @JsonProperty("image_links")
    private List<String> imageLinks = new ArrayList<>(); // presigned URLs for images

    @JsonProperty("coordinates")
    private Coordinates coordinates;

    @JsonProperty("rating")
    private Double rating;

    @JsonProperty("comments")
    private List<CommentDto> comments;

    @JsonProperty("username")
    private String username;
}
