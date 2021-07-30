package yte.intern.eventmanagement1.event.service;

import org.apache.catalina.User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import yte.intern.eventmanagement1.common.dto.MessageResponse;
import yte.intern.eventmanagement1.common.enums.MessageType;
import yte.intern.eventmanagement1.event.controller.request.AddUserToEventRequest;
import yte.intern.eventmanagement1.event.entity.Event;
import yte.intern.eventmanagement1.event.repository.EventRepository;
import yte.intern.eventmanagement1.externalUser.entity.ExternalUser;
import yte.intern.eventmanagement1.externalUser.repository.UserRepository;
import yte.intern.eventmanagement1.institutionUser.controller.request.AddEventToInstituteRequest;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.LinkedList;
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

    // Get all events with dates that are not before today
    public List<Event> getAllEvents() {
        List<Event> allEvents = eventRepository.findAll();
        List<Event> shownEvents = new LinkedList<Event>();
        for(int i = 0; i < allEvents.size(); i++) {
            if (!(allEvents.get(i).startDate().isBefore(LocalDate.now(ZoneId.of("GMT+3"))))) {
                shownEvents.add(allEvents.get(i));
            }
        }

        return shownEvents;
    }

    // Add new event and return a message response
    // MAY DEPRECATE: EVENT NEEDS AN INSTITUTION USER
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
    public MessageResponse addUserToEvent(AddUserToEventRequest addUserToEventRequest) {
        String tc = addUserToEventRequest.getTcKimlikNumber();
        String eventName = addUserToEventRequest.getEnrolledEventName();
        Event eventFromDB = eventRepository.findByName(eventName)
                .orElseThrow(() -> new EntityNotFoundException(EVENT_DOESNT_EXIST_MESSAGE.formatted(eventName)));

        // Find if user already exists
        if (userRepository.existsByTcKimlikNumber(tc)) {
            ExternalUser existingUser =  userRepository.findByTcKimlikNumber(tc);

            // If so, add the event to the existing user and add the existing usr to event
            existingUser.addEvent(eventFromDB);
            MessageResponse response = eventFromDB.canAddUser(existingUser);
            if (response.hasError()) {
                return response;
            }
            eventFromDB.addUser(existingUser);
            eventRepository.save(eventFromDB);
            return new MessageResponse(MessageType.SUCCESS, "The existing user %s was successfully added to the event!".formatted(existingUser.firstName()));
        } else {
            // Else create a new user with constructor
            ExternalUser externalUser = addUserToEventRequest.toUser();
            externalUser.addEvent(eventFromDB);
            userRepository.save(externalUser);

            MessageResponse response = eventFromDB.canAddUser(externalUser);
            if (response.hasError()) {
                return response;
            }

            eventFromDB.addUser(externalUser);
            eventRepository.save(eventFromDB);
            return new MessageResponse(MessageType.SUCCESS, "User %s has been sucessfully added to the event!".formatted(externalUser.firstName()));
        }
    }

    public List<ExternalUser> getUsersFromEvent(Long id) {
        return eventRepository.findById(id).get().externalUsers().stream().toList();
    }

    public int[] getNumOfUsers() {
        int sizeOfEvent = eventRepository.findAll().size();
        int[] result = new int[sizeOfEvent];
        Event eventFromDb;
        for (int i = 0; i < sizeOfEvent; i++) {
            Integer otherI = i+1;
            eventFromDb = eventRepository.findById(Long.parseLong(otherI.toString())).get();
            result[i] = eventFromDb.externalUsers().toArray().length;
            System.out.println(result[i]);
        }

        return result;
    }

    public MessageResponse updateEvent(AddEventToInstituteRequest toBeUpdatedEvent) {
        if(eventRepository.findByCreatorInstId(toBeUpdatedEvent.getCreatorInstId()).isPresent()){
            Event event = eventRepository.findByCreatorInstId(toBeUpdatedEvent.getCreatorInstId()).get();
            if(event.startDate().isBefore(LocalDate.now(ZoneId.of("GMT+3"))))
                return new MessageResponse(MessageType.ERROR, "Event's starting date has already passed! Cannot update");
            event.updateEvent(toBeUpdatedEvent);
            eventRepository.save(event);
            return new MessageResponse(MessageType.SUCCESS, "Event %s was successfully updated!".formatted(toBeUpdatedEvent.getName()));
        } else {
            return new MessageResponse(MessageType.ERROR, "The event to be updated was not found for this user");
        }
    }

}
