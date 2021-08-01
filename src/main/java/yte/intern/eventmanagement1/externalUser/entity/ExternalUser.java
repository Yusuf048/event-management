package yte.intern.eventmanagement1.externalUser.entity;

import lombok.Getter;
import lombok.experimental.Accessors;
import yte.intern.eventmanagement1.common.entity.BaseEntity;
import yte.intern.eventmanagement1.event.entity.Event;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Accessors(fluent = true)
public class ExternalUser extends BaseEntity {

    private String firstName;
    private String lastName;
    private String tcKimlikNumber;
    private String enrolledEventName;
    private String email;
    private String password;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "ext_user_id")
    private Set<Event> extEvents = new HashSet<>();

    //@Todo add dates in external user
    /*@M
    private Set<int> dates = new HashSet<>();*/


    protected ExternalUser() {}

    public ExternalUser(final String firstName, final String lastName, final String tcKimlikNumber, final String enrolledEventName, final String email, final String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.tcKimlikNumber = tcKimlikNumber;
        this.enrolledEventName = enrolledEventName;
        this.email = email;
        this.password = password;
    }

    /*public void updateUser(final User updatedStudent) {
        this.firstName = updatedStudent.firstName;
        this.lastName = updatedStudent.lastName;
        this.tcKimlikNumber = updatedStudent.tcKimlikNumber;
    }*/


    public boolean hasSameTcKimlikNumberAs(ExternalUser externalUser)  {
        return tcKimlikNumber.equals(externalUser.tcKimlikNumber);
    }

    public void addEvent(final Event toBeAddedEvent) {
        extEvents.add(toBeAddedEvent);
    }
}
