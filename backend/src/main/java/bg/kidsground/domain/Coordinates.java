package bg.kidsground.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;

@Data
public class Coordinates implements Serializable {

    @JsonProperty("lat")
    private double latitude;

    @JsonProperty("lng")
    private double longitude;

}
