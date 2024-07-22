package bg.kidsground.controller;

import bg.kidsground.constants.AppRestEndpoints;
import bg.kidsground.domain.dto.CommentDto;
import bg.kidsground.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;
import java.util.NoSuchElementException;

@Controller
@CrossOrigin(origins = {"http://localhost:3000", "https://kidsground.bg"})
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping(AppRestEndpoints.V1.Comments.ADD)
    public ResponseEntity<Long> saveComment(final @RequestBody CommentDto commentDto,
                                            final @RequestHeader("Authorization") String authToken) {
        return ResponseEntity.ok(this.commentService.saveComment(commentDto, authToken));
    }

    @GetMapping(AppRestEndpoints.V1.Comments.By.USER)
    public ResponseEntity<List<CommentDto>> getCommentsByUserId(final @RequestHeader("Authorization") String authToken) {
        return ResponseEntity.ok(this.commentService.getByAuthToken(authToken));
    }

    @GetMapping(AppRestEndpoints.V1.Comments.By.ID)
    public ResponseEntity<CommentDto> getComment(final @PathVariable Long id) {
        return ResponseEntity.ok(this.commentService.getById(id));
    }

    @DeleteMapping(AppRestEndpoints.V1.Comments.By.ID)
    public ResponseEntity<Void> deleteComment(final @PathVariable Long id) {
        try {
            this.commentService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @ResponseBody
    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String notFoundHandler(final NoSuchElementException ex) {
        return ex.getMessage();
    }
}
