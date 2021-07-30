package yte.intern.eventmanagement1.institutionUser.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.eventmanagement1.institutionUser.entity.InstitutionUser;

import java.util.Optional;

public interface InstitutionUserRepository extends JpaRepository<InstitutionUser, Long> {

    Optional<InstitutionUser> findByUsername(String username);
    Optional<InstitutionUser> findById(Long id);

    boolean existsByUsername(String username);
}
