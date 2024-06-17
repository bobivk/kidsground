package bg.kidsground.constants;

public class AppRestEndpoints {
    public class V1 {
        public static final String V1_ROOT = "/v1";
        public class Playground {
            public static final String PLAYGROUND_ROOT = V1_ROOT + "/playgrounds";

            public static final String ADD_PLAYGROUND = PLAYGROUND_ROOT + "/add";
            public static final String COUNT = PLAYGROUND_ROOT + "/count";
            public static final String GET_ALL = PLAYGROUND_ROOT + "/all";

            public class By {
                public static final String ID = PLAYGROUND_ROOT + "/{id}";
            }
        }
    }

}