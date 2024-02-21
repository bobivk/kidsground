package bg.kidsground.domain;

public enum FloorType {
    ASPHALT("asphalt"),
    GRASS("grass"),
    RUBBER("rubber"),
    MULCH("mulch"),
    DIRT("dirt");

    public final String value;

    FloorType(String value) {
        this.value = value;
    }
}
