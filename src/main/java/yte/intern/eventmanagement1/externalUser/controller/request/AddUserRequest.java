package yte.intern.eventmanagement1.externalUser.controller.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.hibernate.validator.constraints.UniqueElements;
import yte.intern.eventmanagement1.externalUser.entity.ExternalUser;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@RequiredArgsConstructor
@Getter
@ToString
public class AddUserRequest {

    @NotBlank
    private final String firstName;
    @NotBlank
    private final String lastName;
    @Size(min = 11, max = 11, message = "TC Kimlik number must be 11 characters long")
    private final String tcKimlikNumber;
    private final String enrolledEventName;
    private final String email;
    private final String password;

    public ExternalUser toUser() {
        return new ExternalUser(firstName, lastName, tcKimlikNumber, enrolledEventName, email, password);
    }
}
