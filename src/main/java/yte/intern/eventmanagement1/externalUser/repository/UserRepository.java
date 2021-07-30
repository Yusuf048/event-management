package yte.intern.eventmanagement1.externalUser.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.eventmanagement1.event.entity.Event;
import yte.intern.eventmanagement1.externalUser.entity.ExternalUser;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<ExternalUser, Long> {
    boolean existsByTcKimlikNumber(String tcKimlikNumber);

    ExternalUser findByTcKimlikNumber(String tcKimlikNumber);
}
