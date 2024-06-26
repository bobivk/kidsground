package bg.kidsground.controller;

import bg.kidsground.constants.AppRestEndpoints;
import bg.kidsground.domain.dto.PlaygroundDto;
import bg.kidsground.service.PlaygroundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://kidsground.bg"})
public class PlaygroundController {

    @Autowired
    private PlaygroundService playgroundService;

    @PostMapping(path = AppRestEndpoints.V1.Playground.ADD_PLAYGROUND)
    public ResponseEntity<Long> savePlayground(@RequestBody final PlaygroundDto playground) {
        return ResponseEntity.ok(this.playgroundService.savePlayground(playground));
    }

    @PutMapping(path = AppRestEndpoints.V1.Playground.By.ID)
    public ResponseEntity<PlaygroundDto> updatePlayground(@PathVariable final Long id, @RequestBody final PlaygroundDto playground) {
        return ResponseEntity.ok(this.playgroundService.updatePlayground(id, playground));
    }

    @PostMapping(AppRestEndpoints.V1.Playground.By.UPLOAD_IMAGES)
    public ResponseEntity<PlaygroundDto> uploadImage(@PathVariable final Long id, @RequestBody final List<MultipartFile> file) {
        return ResponseEntity.ok(playgroundService.uploadImages(file, id));
    }

    @GetMapping(path = AppRestEndpoints.V1.Playground.By.ID)
    public ResponseEntity<PlaygroundDto> getById(@PathVariable final Long id) {
        return ResponseEntity.ok(this.playgroundService.getById(id));
    }

    // provide a list of PlaygroundSummary if this gets too slow due to size
    @GetMapping(path = AppRestEndpoints.V1.Playground.GET_ALL)
    public ResponseEntity<List<PlaygroundDto>> getAll() {
        return ResponseEntity.ok(this.playgroundService.getAll());
    }

    @GetMapping(path = AppRestEndpoints.V1.Playground.COUNT)
    public ResponseEntity<Integer> getCount() {
        return ResponseEntity.ok(this.playgroundService.getCount());
    }

    @DeleteMapping(path = AppRestEndpoints.V1.Playground.By.ID)
    public ResponseEntity<Void> deleteByID(@PathVariable final Long id) {
        try {
            playgroundService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @ResponseBody
    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String playgroundNotFoundHandler(final NoSuchElementException ex) {
        return ex.getMessage();
    }
}