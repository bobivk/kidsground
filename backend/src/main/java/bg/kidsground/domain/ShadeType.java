package bg.kidsground.domain;

public enum ShadeType {

    TREES("trees"),
    FAKE("fake"),
    NONE("none");

    public final String value;

    ShadeType(String value) {
        this.value = value;
    }
}
