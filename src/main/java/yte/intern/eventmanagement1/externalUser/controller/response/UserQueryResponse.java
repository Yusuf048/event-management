package yte.intern.eventmanagement1.externalUser.controller.response;

import lombok.Getter;
import yte.intern.eventmanagement1.externalUser.entity.ExternalUser;

@Getter
public class UserQueryResponse {
    private final Long id;

    private final String firstName;
    private final String lastName;
    private final String tcKimlikNumber;
    private final String email;
    private final String password;

    public UserQueryResponse(final ExternalUser externalUser) {
        this.id = externalUser.id();
        this.firstName = externalUser.firstName();
        this.lastName = externalUser.lastName();
        this.tcKimlikNumber = externalUser.tcKimlikNumber();
        this.email = externalUser.email();
        this.password = externalUser.password();
    }
}
