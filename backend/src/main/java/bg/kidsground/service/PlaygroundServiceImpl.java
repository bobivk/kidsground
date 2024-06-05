package bg.kidsground.service;

import bg.kidsground.domain.Playground;
import bg.kidsground.repository.PlaygroundRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;
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
    public List<Playground> getAll() {
        return this.playgroundRepository.findAll();
    }

    @Override
    public Integer getCount() {
        return Math.toIntExact(this.playgroundRepository.count());
    }

    @Override
    public Playground updatePlayground(final Playground playground) {
        return this.playgroundRepository.save(playground);
    }

    @Override
    public Playground deleteById(Long id) {
        return null;
    }
}