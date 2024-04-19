package bg.kidsground.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Playground {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("age_group")
    @Enumerated(EnumType.STRING)
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
    private List<String> transport;

    @JsonProperty("toys")
    private List<String> toys;

    @JsonProperty("facilities")
    private List<String> facilities;

    @JsonProperty("image_links")
    private List<String> imageLinks;

    @JsonProperty("coordinates")
    private Coordinates coordinates;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
