package yte.intern.eventmanagement1.institutionUser.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.eventmanagement1.common.dto.MessageResponse;
import yte.intern.eventmanagement1.common.enums.MessageType;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@RestController
@RequestMapping("/institution")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class InstitutionUserController {
    private final InstitutionUserService institutionUserService;

    public InstitutionUserController(final InstitutionUserService institutionUserService) {this.institutionUserService = institutionUserService;}

    @GetMapping("/{username}/events")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<EventQueryResponse> getAllEvents(@PathVariable String username) {
        return institutionUserService.getAllEventsFromInstitute(username)
                .stream()
                .map(EventQueryResponse::new)
                .toList();
    }

    // Names are unique for events
    /*@PathVariable String name,*/
    @PostMapping("/addevent")
    @CrossOrigin(origins = "http://localhost:3000")
    public MessageResponse addEventToInstitute(@RequestBody @Valid AddEventToInstituteRequest addEventToInstituteRequest) {
        if(addEventToInstituteRequest.getStartDate().isBefore(LocalDate.now(ZoneId.of("GMT+3")))){
            return new MessageResponse(MessageType.ERROR, "Event cannot have the start date %s because it is before today"
                    .formatted(addEventToInstituteRequest.getStartDate()));
        } else if(addEventToInstituteRequest.getEndDate().isBefore(addEventToInstituteRequest.getStartDate())) {
            return new MessageResponse(MessageType.ERROR, "The end date of event cannot be before the start date");
        }
        return institutionUserService.addEventToInstitution(addEventToInstituteRequest.toEvent());
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

    @GetMapping("/{userid}")
    @CrossOrigin(origins = "http://localhost:3000")
    public InstitutionUserQueryResponse getInstitutionUser(@PathVariable String userid) {
        return new InstitutionUserQueryResponse(institutionUserService.getInstitutionUser(userid));
    }

    /*@PostMapping
    public MessageResponse updateEventForUser(@RequestBody @Valid final AddEventToInstituteRequest addEventToInstituteRequest) {
        return institutionUserService.updateEventForUser(addEventToInstituteRequest);
    }*/
}
