package bg.kidsground.constants;

public class AppRestEndpoints {
    public class V1 {
        public static final String V1_ROOT = "/v1";
        public class Playground {
            public static final String PLAYGROUND_ROOT = V1_ROOT + "/playgrounds";

            public static final String ADD_PLAYGROUND = PLAYGROUND_ROOT + "/add";
            public static final String COUNT = PLAYGROUND_ROOT + "/count";
            public static final String GET_ALL = PLAYGROUND_ROOT + "/all";
            public static final String TO_APPROVE = PLAYGROUND_ROOT + "/toApprove";

            public class By {
                public static final String ID = PLAYGROUND_ROOT + "/{id}";
                public static final String USER = PLAYGROUND_ROOT + "/byUser";

                public class Id {
                    public static final String UPLOAD_IMAGES = ID + "/uploadImages";
                    public static final String APPROVE = ID + "/approve";
                }
            }
        }

        public class Users {
            public static final String USERS_ROOT = V1_ROOT + "/users";
            public static final String REGISTER = USERS_ROOT + "/register";
            public static final String LOGIN = USERS_ROOT + "/login";
        }

        public class Comments {
            public static final String COMMENTS_ROOT = V1_ROOT + "/comments";
            public static final String ADD = COMMENTS_ROOT + "/add";
            public class By {
                public static final String ID = COMMENTS_ROOT + "/{id}";
                public static final String USER = COMMENTS_ROOT + "/byUser";
                public static final String PLAYGROUND = COMMENTS_ROOT + "/playground/{playground_id}";
            }
        }
    }

}