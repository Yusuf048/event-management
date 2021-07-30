package yte.intern.eventmanagement1.externalUser.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.eventmanagement1.common.dto.MessageResponse;
import yte.intern.eventmanagement1.event.controller.response.EventQueryResponse;
import yte.intern.eventmanagement1.externalUser.controller.request.AddUserRequest;
import yte.intern.eventmanagement1.externalUser.controller.response.UserQueryResponse;
import yte.intern.eventmanagement1.externalUser.service.UserService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/users")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;

    public UserController(final UserService userService) {this.userService = userService;}

    @GetMapping
    public List<UserQueryResponse> getAllUsers() {
        return userService.getAllUsers()
                .stream()
                .map(UserQueryResponse::new)
                .toList();
    }

    @GetMapping("/{tcKimlikNumber}/events")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<EventQueryResponse> getAllEventsForUser(@PathVariable String tcKimlikNumber) {
        return userService.getAllEventsOfUser(tcKimlikNumber).stream().map(EventQueryResponse::new).toList();
    }

    @PostMapping
    public MessageResponse addUser(@Valid @RequestBody final AddUserRequest request) {
        return userService.addUser(request.toUser());
    }
}
