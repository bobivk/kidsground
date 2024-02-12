package bg.kidsground.service;

import bg.kidsground.domain.Playground;

public interface PlaygroundService {

    void savePlayground(final Playground playground);

    Playground getById(final Long id);

}
