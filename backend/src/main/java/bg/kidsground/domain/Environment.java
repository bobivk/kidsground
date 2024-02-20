package bg.kidsground.domain;

public enum Environment {

    BOULEVARD("boulevard"),
    PARK("park"),
    APARTMENTS("apartments"),
    OTHER("other");

    public final String value;
    Environment(final String value){
        this.value = value;
    }
}
