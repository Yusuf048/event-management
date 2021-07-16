package yte.intern.eventmanagement1.externalUser.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import yte.intern.eventmanagement1.common.dto.MessageResponse;
import yte.intern.eventmanagement1.externalUser.controller.request.AddUserRequest;
import yte.intern.eventmanagement1.externalUser.controller.response.UserQueryResponse;
import yte.intern.eventmanagement1.externalUser.service.UserService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/users")
@Validated
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

    @PostMapping
    public MessageResponse addUser(@Valid @RequestBody final AddUserRequest request) {
        return userService.addUser(request.toUser());
    }
}
