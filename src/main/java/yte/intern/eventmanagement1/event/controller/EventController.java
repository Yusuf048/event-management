package yte.intern.eventmanagement1.event.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.eventmanagement1.common.dto.MessageResponse;
import yte.intern.eventmanagement1.event.controller.request.AddUserToEventRequest;
import yte.intern.eventmanagement1.event.controller.response.EventQueryResponse;
import yte.intern.eventmanagement1.event.service.EventService;
import yte.intern.eventmanagement1.event.controller.request.AddEventRequest;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/events")
@Validated
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
    @PostMapping("/{name}/users")
    public MessageResponse addUserToEvent(@RequestBody @Valid AddUserToEventRequest addUserToEventRequest,
                                          @PathVariable String name) {
        return eventService.addUserToEvent(name, addUserToEventRequest.toUser());
    }
}
