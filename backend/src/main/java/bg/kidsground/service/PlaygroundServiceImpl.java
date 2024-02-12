package bg.kidsground.service;

import bg.kidsground.domain.Playground;
import bg.kidsground.repository.PlaygroundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class PlaygroundServiceImpl implements PlaygroundService {

    @Autowired
    private PlaygroundRepository playgroundRepository;

    @Override
    public void savePlayground(Playground playground) {
        this.playgroundRepository.save(playground);
    }

    @Override
    public Playground getById(Long id) {
        return this.playgroundRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }
}
