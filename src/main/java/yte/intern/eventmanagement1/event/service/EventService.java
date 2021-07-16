package yte.intern.eventmanagement1.event.service;

import org.apache.catalina.User;
import org.springframework.stereotype.Service;
import yte.intern.eventmanagement1.common.dto.MessageResponse;
import yte.intern.eventmanagement1.common.enums.MessageType;
import yte.intern.eventmanagement1.event.entity.Event;
import yte.intern.eventmanagement1.event.repository.EventRepository;
import yte.intern.eventmanagement1.externalUser.entity.ExternalUser;
import yte.intern.eventmanagement1.externalUser.repository.UserRepository;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    private static final String EVENT_ADDED_MESSAGE = "Event with name %s has been added successfully";
    private static final String EVENT_ALREADY_EXISTS_MESSAGE = "Event with event number %s already exists!";
    private static final String EVENT_DOESNT_EXIST_MESSAGE = "Event with event number %s doesn't exists!";
    private static final String EVENT_DOESNT_EXIST_ID_MESSAGE = "Event with event id %s doesn't exists!";
    private static final String EVENT_UPDATED_MESSAGE = "Event with id %s has been updated successfully!";
    private static final String EVENT_DELETED_MESSAGE = "Event with event name %s has been deleted successfully!";

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public EventService(final EventRepository eventRepository, final UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    public List<Event> getAllEvents() {return eventRepository.findAll();}

    // Add new event and return a message response
    public MessageResponse addEvent(final Event newEvent) {
        if (eventRepository.existsByName(newEvent.name())) {
            return new MessageResponse(MessageType.ERROR, eventAlreadyExistsMessage(newEvent.name()));
        }
        eventRepository.save(newEvent);
        return new MessageResponse(MessageType.SUCCESS, eventAddedMessage(newEvent.name()));
    }

    private String eventAlreadyExistsMessage(final String eventName) {
        return EVENT_ALREADY_EXISTS_MESSAGE.formatted(eventName);
    }

    private String eventAddedMessage(final String eventName) {
        return EVENT_ADDED_MESSAGE.formatted(eventName);
    }

    // Get an event by its name (event names are unique)
    public Event getEventByEventName(final String eventName) {
        return eventRepository.findByName(eventName)
                .orElseThrow(() -> new EntityNotFoundException(EVENT_DOESNT_EXIST_MESSAGE.formatted(eventName)));
    }

    // Maybe add update event class here

    // Delete event using event name (event names are unique)
    public MessageResponse deleteEvent(String eventName) {
        if (!eventRepository.existsByName(eventName)) {
            return new MessageResponse(MessageType.ERROR, EVENT_DOESNT_EXIST_MESSAGE.formatted(eventName));
        }
        eventRepository.deleteByName(eventName);

        return new MessageResponse(MessageType.SUCCESS, EVENT_DELETED_MESSAGE.formatted(eventName));
    }

    // Add user to an event using event name (event names are unique)
    @Transactional
    public MessageResponse addUserToEvent(String eventName, ExternalUser externalUser) {
        Event eventFromDB = eventRepository.findByName(eventName)
                .orElseThrow(() -> new EntityNotFoundException(EVENT_DOESNT_EXIST_MESSAGE.formatted(eventName)));

        MessageResponse response = eventFromDB.canAddUser(externalUser);
        if (response.hasError()) {
            return response;
        }

        /*if (userRepository.existsByTcKimlikNumber(externalUser.tcKimlikNumber())) {
            ExternalUser existingUser =  userRepository.findByTcKimlikNumber(externalUser.tcKimlikNumber());

            return new MessageResponse(MessageType.ERROR, userAlreadyExistsMessage(newExternalUser.tcKimlikNumber()));
        }*/

        eventFromDB.addUser(externalUser);
        eventRepository.save(eventFromDB);
        return new MessageResponse(MessageType.SUCCESS, "User %s has been sucessfully added to the event!".formatted(externalUser.firstName()));
    }

}
