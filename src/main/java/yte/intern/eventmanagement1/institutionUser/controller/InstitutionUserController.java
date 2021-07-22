package yte.intern.eventmanagement1.institutionUser.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.eventmanagement1.common.dto.MessageResponse;
import yte.intern.eventmanagement1.event.controller.request.AddUserToEventRequest;
import yte.intern.eventmanagement1.event.controller.response.EventQueryResponse;
import yte.intern.eventmanagement1.event.service.EventService;
import yte.intern.eventmanagement1.externalUser.controller.request.AddUserRequest;
import yte.intern.eventmanagement1.externalUser.controller.response.UserQueryResponse;
import yte.intern.eventmanagement1.institutionUser.controller.request.AddEventToInstituteRequest;
import yte.intern.eventmanagement1.institutionUser.controller.request.AddInstituteUserRequest;
import yte.intern.eventmanagement1.institutionUser.controller.response.InstitutionUserQueryResponse;
import yte.intern.eventmanagement1.institutionUser.service.InstitutionUserService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/institution")
@Validated
public class InstitutionUserController {
    private final InstitutionUserService institutionUserService;

    public InstitutionUserController(final InstitutionUserService institutionUserService) {this.institutionUserService = institutionUserService;}

    @GetMapping("/{username}/events")
    public List<EventQueryResponse> getAllEvents(@PathVariable String username) {
        return institutionUserService.getAllEventsFromInstitute(username)
                .stream()
                .map(EventQueryResponse::new)
                .toList();
    }

    // Names are unique for events
    /*@PathVariable String name,*/
    @PostMapping("/{username}/events")
    public MessageResponse addEventToInstitute(@RequestBody @Valid AddEventToInstituteRequest addEventToInstituteRequest,
                                          @PathVariable String username) {
        return institutionUserService.addEventToInstitution(username, addEventToInstituteRequest.toEvent());
    }

    @PostMapping
    public MessageResponse addInstitute(@Valid @RequestBody final AddInstituteUserRequest request) {
        return institutionUserService.addInstitute(request.toInstituteUser());
    }

    @GetMapping
    public List<InstitutionUserQueryResponse> getAllInstitutionUsers() {
        return institutionUserService.getAllInstitutionUsers()
                .stream()
                .map(InstitutionUserQueryResponse::new)
                .toList();

    }
}
