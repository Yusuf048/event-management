package yte.intern.eventmanagement1.event.controller.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import yte.intern.eventmanagement1.externalUser.entity.ExternalUser;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@RequiredArgsConstructor
public class AddUserToEventRequest {

    @NotBlank
    private final String firstName;
    @NotBlank
    private final String lastName;
    @Size(min = 11, max = 11, message = "TC Kimlik number must be 11 characters long")
    private final String tcKimlikNumber;
    @NotBlank
    private final String enrolledEventName;

    public ExternalUser toUser() {
        return new ExternalUser(firstName, lastName, tcKimlikNumber, enrolledEventName, "", "");
    }
}
