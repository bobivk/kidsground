package bg.kidsground.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "playgrounds")
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

    @JsonProperty("description")
    private String description;

    @JsonProperty("age_groups")
    @ElementCollection
    private List<String> ageGroups = new ArrayList<>();

    @JsonProperty("has_fence")
    private boolean hasFence;

    @JsonProperty("floor_type")
    @ElementCollection
    private List<String> floorType = new ArrayList<>();

    @JsonProperty("shade_type")
    private String shadeType;

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

    @JsonProperty("rating")
    private Double rating;

    @ManyToOne
    @JoinColumn(name = "createdByUser")
    @JsonProperty("created_by_user")
    private User createdByUser;

    @OneToMany(mappedBy = "playground", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    @JsonProperty("createdAt")
    private Date createdAt;

}
