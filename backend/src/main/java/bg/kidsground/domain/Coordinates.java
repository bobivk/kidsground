package bg.kidsground.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Coordinates {

    @JsonProperty("lat")
    private double latitude;

    @JsonProperty("lng")
    private double longitude;

}
