package bg.kidsground.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.List;

@Entity
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

    @JsonProperty("toys")
    private List<String> toys;

    @JsonProperty("facilities")
    private List<String> facilities;

    private GeoAddress

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
