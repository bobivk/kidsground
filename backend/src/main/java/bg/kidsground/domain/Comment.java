package bg.kidsground.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "comment")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "playground")
    @JsonProperty("playground")
    private Playground playground;

    @JsonProperty("text")
    private String text;

    @JsonProperty("rating")
    private Double rating;

    @ManyToOne
    @JoinColumn(name = "createdByUser")
    @JsonProperty("created_by_user")
    private User createdByUser;

    @JsonProperty("createdAt")
    private Date createdAt;
}
