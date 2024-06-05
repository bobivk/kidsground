package bg.kidsground.service;

import bg.kidsground.domain.Playground;

import java.util.List;

public interface PlaygroundService {

    void savePlayground(final Playground playground);

    Playground getById(final Long id);


    List<Playground> getAll();

    Integer getCount();

    Playground updatePlayground(Playground playground);

    Playground deleteById(Long id);
}
