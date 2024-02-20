package bg.kidsground.domain;

public enum AgeGroup {

    ZERO_TO_THREE("zero_to_three"),
    THREE_TO_SIX("three_to_six"),
    SIX_TO_TWELVE("six_to_twelve"),
    TWELVE_PLUS("twelve_plus");

    public final String value;

    AgeGroup(String value) {
        this.value = value;
    }
}
