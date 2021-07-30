package yte.intern.eventmanagement1.institutionUser.entity;

import lombok.Getter;
import lombok.experimental.Accessors;
import yte.intern.eventmanagement1.common.dto.MessageResponse;
import yte.intern.eventmanagement1.common.entity.BaseEntity;
import yte.intern.eventmanagement1.common.enums.MessageType;
import yte.intern.eventmanagement1.event.entity.Event;
import yte.intern.eventmanagement1.externalUser.entity.ExternalUser;
import yte.intern.eventmanagement1.institutionUser.controller.request.AddEventToInstituteRequest;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Accessors(fluent = true)
public class InstitutionUser extends BaseEntity {
    private String username;
    private String password;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "institution_id")
    private Set<Event> myEvents = new HashSet<>();

    protected InstitutionUser(){
    }

    public InstitutionUser(final String username, final String password) {
        this.username = username;
        this.password = password;
    }

    public void updateEvent(final AddEventToInstituteRequest toBeUpdatedEvent) {
        myEvents.stream().map(BaseEntity::id).forEach(aLong -> if(aLong == toBeUpdatedEvent.getId())) );
    }

    public MessageResponse canAddEvent(final Event toBeAddedEvent) {
        if (toBeAddedEvent.quotaIsLessThanZero()) {
            return new MessageResponse(MessageType.ERROR, "Event cannot have a quota less than zero");
        }

        return new MessageResponse(MessageType.SUCCESS, "");
    }

    public void addEvent(final Event toBeAddedEvent) {
        if (canAddEvent(toBeAddedEvent).hasError()) {
            throw new IllegalStateException();
        }

        myEvents.add(toBeAddedEvent);
    }
}
