package bg.kidsground.controller;

import bg.kidsground.constants.AppRestEndpoints;
import bg.kidsground.domain.Playground;
import bg.kidsground.service.PlaygroundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PlaygroundController {

    @Autowired
    private PlaygroundService playgroundService;

    @PostMapping(path = AppRestEndpoints.V1.Playground.ADD_PLAYGROUND)
    public ResponseEntity<Void> savePlayground(@RequestBody final Playground playground) {
        this.playgroundService.savePlayground(playground);
        return ResponseEntity.ok().build();
    }

    @PutMapping(path = AppRestEndpoints.V1.Playground.ADD_PLAYGROUND)
    public ResponseEntity<Void> updatePlayground(@RequestBody final Playground playground) {
        this.playgroundService.updatePlayground(playground);
        return ResponseEntity.ok().build();
    }

    @GetMapping(path = AppRestEndpoints.V1.Playground.By.ID)
    public ResponseEntity<Playground> getById(@PathVariable final Long id) {
        return ResponseEntity.ok(this.playgroundService.getById(id));
    }

    // provide a list of PlaygroundSummary if this gets too slow due to size
    @GetMapping(path = AppRestEndpoints.V1.Playground.GET_ALL)
    public ResponseEntity<List<Playground>> getAll() {
        return ResponseEntity.ok(this.playgroundService.getAll());
    }

    @GetMapping(path = AppRestEndpoints.V1.Playground.COUNT)
    public ResponseEntity<Integer> getCount() {
        return ResponseEntity.ok(this.playgroundService.getCount());
    }

    @DeleteMapping(path = AppRestEndpoints.V1.Playground.By.ID)
    public ResponseEntity<Playground> deleteByID(@PathVariable final Long id) {
        return ResponseEntity.ok(this.playgroundService.deleteById(id));
    }

    @ResponseBody
    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String playgroundNotFoundHandler(final NoSuchElementException ex) {
        return ex.getMessage();
    }
}