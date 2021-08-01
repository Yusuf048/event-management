package yte.intern.eventmanagement1.event.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.eventmanagement1.common.dto.MessageResponse;
import yte.intern.eventmanagement1.event.controller.request.AddUserToEventRequest;
import yte.intern.eventmanagement1.event.controller.response.EventQueryResponse;
import yte.intern.eventmanagement1.event.service.EventService;
import yte.intern.eventmanagement1.event.controller.request.AddEventRequest;
import yte.intern.eventmanagement1.externalUser.controller.response.UserQueryResponse;
import yte.intern.eventmanagement1.institutionUser.controller.request.AddEventToInstituteRequest;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/events")
@Validated
@CrossOrigin(origins = "*")
public class EventController {
    private final EventService eventService;

    public EventController(final EventService eventService) {this.eventService = eventService;}

    @GetMapping
    public List<EventQueryResponse> getAllEvents() {
        return eventService.getAllEvents()
                .stream()
                .map(EventQueryResponse::new)
                .toList();

    }

    @PostMapping
    public MessageResponse addEvent(@Valid @RequestBody final AddEventRequest request) {
        return eventService.addEvent(request.toEvent());
    }

    // Names are unique for events
    /*@PathVariable String name,*/
    @PostMapping("/adduser")
    //@CrossOrigin(origins = "http://localhost:3000")
    public MessageResponse addUserToEvent(@RequestBody @Valid AddUserToEventRequest addUserToEventRequest) {
        return eventService.addUserToEvent(addUserToEventRequest);
    }


    @GetMapping("/{eventId}/users")
    //@CrossOrigin(origins = "http://localhost:3000")
    public List<UserQueryResponse> getUsersFromEvent(@PathVariable String eventId) {
        long eventIdLong = Long.parseLong(eventId);
        return eventService.getUsersFromEvent(eventIdLong).stream().map(UserQueryResponse::new).toList();
    }

    @PostMapping("/updateEvent")
    //@CrossOrigin(origins = "http://localhost:3000")
    public MessageResponse updateEvent(@RequestBody @Valid final AddEventToInstituteRequest addEventToInstituteRequest) {
        return eventService.updateEvent(addEventToInstituteRequest);
    }

    @GetMapping("/userNumber")
    //@CrossOrigin(origins = "http://localhost:3000")
    public int[] getNumOfUsersForEvent() {
        //long eventIdLong = Long.parseLong(eventId);
        return eventService.getNumOfUsers();
    }
}
