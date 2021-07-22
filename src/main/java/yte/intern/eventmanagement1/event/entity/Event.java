package yte.intern.eventmanagement1.event.entity;

import lombok.Getter;
import lombok.experimental.Accessors;
import yte.intern.eventmanagement1.common.dto.MessageResponse;
import yte.intern.eventmanagement1.common.entity.BaseEntity;
import yte.intern.eventmanagement1.common.enums.MessageType;
import yte.intern.eventmanagement1.externalUser.entity.ExternalUser;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Accessors(fluent = true)
@Getter
public class Event extends BaseEntity {
    private String name;
    private String startDate;
    private String endDate;
    //@Setter
    private Integer eventQuota;

    // ManyToMany?
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "event_id")
    private Set<ExternalUser> externalUsers = new HashSet<>();

    protected Event() {
    }

    public Event(final String name, final String startDate,
                 final String endDate, final Integer eventQuota) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.eventQuota = eventQuota;
    }

    /*public boolean hasSameNameAs(User user) {
        return name.equals(user.name);
    }*/

    public void updateEvent(final Event updatedEvent) {
        this.name = updatedEvent.name;
        this.startDate = updatedEvent.startDate;
        this.endDate = updatedEvent.endDate;
        this.eventQuota = updatedEvent.eventQuota;
    }

    public MessageResponse canAddUser(final ExternalUser toBeAddedExternalUser) {
        if (hasSameTcKimlikNumber(toBeAddedExternalUser)) {
            return new MessageResponse(MessageType.ERROR, "Event has already the user %s".formatted(toBeAddedExternalUser.tcKimlikNumber()));
        }

        if(eventQuota <= 0){
            return new MessageResponse(MessageType.ERROR, "Unfortunately the event is full");
        }
        return new MessageResponse(MessageType.SUCCESS, "");
    }

    private boolean hasSameTcKimlikNumber(final ExternalUser toBeAddedExternalUser) {
        return externalUsers.stream()
                .anyMatch(toBeAddedExternalUser::hasSameTcKimlikNumberAs);
    }

    /*private boolean hasSameTcKimlikNumberInDB(final ExternalUser toBeAddedExternalUser) {

    }*/

    public void addUser(final ExternalUser toBeAddedExternalUser) {
        if (canAddUser(toBeAddedExternalUser).hasError()) {
            throw new IllegalStateException();
        }
        externalUsers.add(toBeAddedExternalUser);
        eventQuota--;
    }

    public boolean quotaIsLessThanZero() {
        return (eventQuota < 0);
    }

}
