package bg.kidsground.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = {"http://localhost:3000", "https://kidsground.bg"})
public class CommentController {

}
