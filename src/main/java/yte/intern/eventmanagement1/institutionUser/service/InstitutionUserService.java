package yte.intern.eventmanagement1.institutionUser.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yte.intern.eventmanagement1.common.dto.MessageResponse;
import yte.intern.eventmanagement1.common.enums.MessageType;
import yte.intern.eventmanagement1.event.entity.Event;
import yte.intern.eventmanagement1.event.repository.EventRepository;
import yte.intern.eventmanagement1.externalUser.entity.ExternalUser;
import yte.intern.eventmanagement1.externalUser.repository.UserRepository;
import yte.intern.eventmanagement1.institutionUser.controller.request.AddEventToInstituteRequest;
import yte.intern.eventmanagement1.institutionUser.entity.InstitutionUser;
import yte.intern.eventmanagement1.institutionUser.repository.InstitutionUserRepository;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class InstitutionUserService {
    //private static final String EVENT_ADDED_MESSAGE = "Event with name %s has been added successfully";
    private static final String INSTITUTION_DOESNT_EXIST_MESSAGE = "Institution user with username %s doesn't exist!";
    private static final String INSTITUTION_ALREADY_EXISTS_MESSAGE = "Institution user with username %s already exists!";

    private final EventRepository eventRepository;
    private final InstitutionUserRepository institutionUserRepository;

    public InstitutionUserService(final EventRepository eventRepository, final InstitutionUserRepository institutionUserRepository) {
        this.eventRepository = eventRepository;
        this.institutionUserRepository = institutionUserRepository;
    }

    private String institutionAlreadyExistsMessage(final String userName) {
        return INSTITUTION_ALREADY_EXISTS_MESSAGE.formatted(userName);
    }

    public MessageResponse addInstitute(final InstitutionUser newInstitutionUser) {
        if (institutionUserRepository.existsByUsername(newInstitutionUser.username())) {
            return new MessageResponse(MessageType.ERROR, institutionAlreadyExistsMessage(newInstitutionUser.username()));
        }
        institutionUserRepository.save(newInstitutionUser);
        return new MessageResponse(MessageType.SUCCESS, "Institution user %s has been successfully added!".formatted(newInstitutionUser.username()));
    }

    @Transactional
    public MessageResponse addEventToInstitution (Event event) {
        Long id = event.creatorInstId();
        InstitutionUser institutionFromDB = institutionUserRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(INSTITUTION_DOESNT_EXIST_MESSAGE.formatted(id)));

        MessageResponse response = institutionFromDB.canAddEvent(event);
        if (response.hasError()) {
            return response;
        }

        institutionFromDB.addEvent(event);
        institutionUserRepository.save(institutionFromDB);
        return new MessageResponse(MessageType.SUCCESS, "Event %s has been sucessfully added to the user!".formatted(event.name()));
    }

    public List<Event> getAllEventsFromInstitute (String username) {
        InstitutionUser institutionUserfromDB = institutionUserRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException(INSTITUTION_DOESNT_EXIST_MESSAGE.formatted(username)));

        return institutionUserfromDB.myEvents().stream().toList();
    }

    public List<InstitutionUser> getAllInstitutionUsers() {return institutionUserRepository.findAll();}

    public InstitutionUser getInstitutionUser(String id) {
        InstitutionUser institutionFromDB = institutionUserRepository.findById(Long.parseLong(id))
            .orElseThrow(() -> new EntityNotFoundException(INSTITUTION_DOESNT_EXIST_MESSAGE.formatted(id)));
        return institutionFromDB;
    }

    public MessageResponse updateEventForUser (AddEventToInstituteRequest event) {
        Long id = event.getCreatorInstId();
        InstitutionUser institutionFromDB = institutionUserRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(INSTITUTION_DOESNT_EXIST_MESSAGE.formatted(id)));


    }
}
