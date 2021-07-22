package yte.intern.eventmanagement1.institutionUser.controller.response;

import lombok.Getter;
import yte.intern.eventmanagement1.externalUser.entity.ExternalUser;
import yte.intern.eventmanagement1.institutionUser.entity.InstitutionUser;

@Getter
public class InstitutionUserQueryResponse {
    private final Long id;

    private final String username;
    private final String password;

    public InstitutionUserQueryResponse(final InstitutionUser institutionUser) {
        this.id = institutionUser.id();
        this.username = institutionUser.username();
        this.password = institutionUser.password();
    }
}
