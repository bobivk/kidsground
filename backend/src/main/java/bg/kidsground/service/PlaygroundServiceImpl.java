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
    public void savePlayground(final Playground playground) {
        this.playgroundRepository.save(playground);
    }

    @Override
    public Playground getById(final Long id) {
        return this.playgroundRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    @Override
    public void updatePlayground(Playground playground) {
        return this.playgroundRepository.update(playground);
    }

    @Override
    public Playground deleteById(Long id) {
        return null;
    }
}
