package yte.intern.eventmanagement1.externalUser.entity;

import lombok.Getter;
import lombok.experimental.Accessors;
import yte.intern.eventmanagement1.common.entity.BaseEntity;

import javax.persistence.*;

@Entity
@Getter
@Accessors(fluent = true)
public class ExternalUser extends BaseEntity {

    private String firstName;
    private String lastName;
    private String tcKimlikNumber;


    protected ExternalUser() {}

    public ExternalUser(final String firstName, final String lastName, final String tcKimlikNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.tcKimlikNumber = tcKimlikNumber;
    }

    /*public void updateUser(final User updatedStudent) {
        this.firstName = updatedStudent.firstName;
        this.lastName = updatedStudent.lastName;
        this.tcKimlikNumber = updatedStudent.tcKimlikNumber;
    }*/


    public boolean hasSameTcKimlikNumberAs(ExternalUser externalUser)  {
        return tcKimlikNumber.equals(externalUser.tcKimlikNumber);
    }
}
