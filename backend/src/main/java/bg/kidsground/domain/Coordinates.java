package bg.kidsground.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
public class Coordinates implements Serializable {

    @JsonProperty("lat")
    private double latitude;

    @JsonProperty("lng")
    private double longitude;

}
