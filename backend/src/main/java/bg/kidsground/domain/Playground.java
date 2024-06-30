package bg.kidsground.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "playground")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
    @Enumerated(EnumType.STRING)
    private ShadeType shadeType;

    @JsonProperty("environment")
    private String environment;

    @JsonProperty("transport")
    @ElementCollection
    private List<String> transport = new ArrayList<>();

    @JsonProperty("toys")
    @ElementCollection
    private List<String> toys = new ArrayList<>();

    @JsonProperty("facilities")
    @ElementCollection
    private List<String> facilities = new ArrayList<>();

    @JsonProperty("image_s3_keys")
    @ElementCollection
    private List<String> imageS3Keys = new ArrayList<>();

    @JsonProperty("coordinates")
    private Coordinates coordinates;

    @JsonProperty("is_new")
    private boolean isNew;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    @JsonProperty("creator_id")
    private User creator;

}
