package bg.kidsground.controller;

import bg.kidsground.constants.AppRestEndpoints;
import bg.kidsground.domain.dto.CommentDto;
import bg.kidsground.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@CrossOrigin(origins = {"http://localhost:3000", "https://kidsground.bg"})
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping(AppRestEndpoints.V1.Comments.ADD)
    public ResponseEntity<Long> saveComment(final @RequestBody CommentDto commentDto) {
        return ResponseEntity.ok(this.commentService.saveComment(commentDto));
    }

    @GetMapping(AppRestEndpoints.V1.Comments.COMMENTS_ROOT)
    public ResponseEntity<List<CommentDto>> getCommentsByUserId(final @RequestParam Long userId) {
        return ResponseEntity.ok(this.commentService.getByUserId(userId));
    }

    @GetMapping(AppRestEndpoints.V1.Comments.BY_ID)
    public ResponseEntity<CommentDto> getComment(final @PathVariable Long id) {
        return ResponseEntity.ok(this.commentService.getById(id));
    }

    @DeleteMapping(AppRestEndpoints.V1.Comments.BY_ID)
    public ResponseEntity<Void> deleteComment(final @PathVariable Long id) {
        try {
            this.commentService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
