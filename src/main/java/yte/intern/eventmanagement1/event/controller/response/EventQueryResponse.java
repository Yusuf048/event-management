package yte.intern.eventmanagement1.event.controller.response;

import lombok.Getter;

import java.time.LocalDate;
import yte.intern.eventmanagement1.event.entity.Event;

@Getter
public class EventQueryResponse {

    private final Long id;

    private final String name;
    private final String startDate;
    private final String endDate;
    private final Integer eventQuota;

    public EventQueryResponse(final Event event) {
        this.id = event.id();
        this.name = event.name();
        this.startDate = event.startDate();
        this.endDate = event.endDate();
        this.eventQuota = event.eventQuota();
    }
}
