package yte.intern.eventmanagement1.event.controller.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;
import yte.intern.eventmanagement1.event.entity.Event;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@RequiredArgsConstructor
@Getter
@ToString
public class AddEventRequest {
    @Size(max = 255, message = "First name can't exceed 255 characters")
    @NotEmpty(message = "First name can't be empty")
    private final String name;

    // ADD IN DATE RANGE
    //@DateTimeFormat
    //@Valid
    @NotEmpty(message = "Start date can't be empty")
    private final String startDate;

    //@DateTimeFormat
    //@Valid
    @NotEmpty(message = "End date can't be empty")
    private final String endDate;

    @NotEmpty(message = "Event Quota can't be empty")
    private final Integer eventQuota;


    public Event toEvent() {
        return new Event(name, startDate, endDate, eventQuota);
    }
}
