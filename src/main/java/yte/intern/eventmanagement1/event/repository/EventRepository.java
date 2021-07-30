package yte.intern.eventmanagement1.event.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.eventmanagement1.event.entity.Event;

import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {
    boolean existsByName(String eventName);

    Optional<Event> findByName(String eventName);

    void deleteByName(String eventName);

    Optional<Event> findById(Long id);
}
