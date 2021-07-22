package yte.intern.eventmanagement1.institutionUser.controller.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import yte.intern.eventmanagement1.externalUser.entity.ExternalUser;
import yte.intern.eventmanagement1.institutionUser.entity.InstitutionUser;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@RequiredArgsConstructor
@Getter
@ToString
public class AddInstituteUserRequest {
    @NotBlank
    private final String username;
    @NotBlank
    private final String password;

    public InstitutionUser toInstituteUser() {
        return new InstitutionUser(username, password);
    }
}
