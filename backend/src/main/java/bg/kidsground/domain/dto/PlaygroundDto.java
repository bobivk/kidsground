package bg.kidsground.domain.dto;

import bg.kidsground.domain.AgeGroup;
import bg.kidsground.domain.Coordinates;
import bg.kidsground.domain.FloorType;
import bg.kidsground.domain.ShadeType;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    private AgeGroup ageGroup;

    @JsonProperty("has_fence")
    private boolean hasFence;

    @JsonProperty("floor_type")
    private FloorType floorType;

    @JsonProperty("shade_type")
    private ShadeType shadeType;

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

    @JsonProperty("user_id")
    private Long userId;
}
