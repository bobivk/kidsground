package bg.kidsground.controller;

import bg.kidsground.constants.AppRestEndpoints;
import bg.kidsground.domain.Playground;
import bg.kidsground.service.PlaygroundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
public class PlaygroundController {

    @Autowired
    private PlaygroundService playgroundService;

    @PostMapping(path = AppRestEndpoints.V1.Playground.ADD_PLAYGROUND)
    public void savePlayground(@RequestBody final Playground playground) {
        this.playgroundService.savePlayground(playground);
    }

    @GetMapping(path = AppRestEndpoints.V1.Playground.By.ID)
    public Playground getById(@PathVariable final Long id) {
        return this.playgroundService.getById(id);
    }

    @ResponseBody
    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String employeeNotFoundHandler(final NoSuchElementException ex) {
        return ex.getMessage();
    }
}
