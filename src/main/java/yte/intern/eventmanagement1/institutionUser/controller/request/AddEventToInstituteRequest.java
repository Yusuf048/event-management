package yte.intern.eventmanagement1.institutionUser.controller.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import yte.intern.eventmanagement1.event.entity.Event;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Getter
@RequiredArgsConstructor
public class AddEventToInstituteRequest {
    private Long id;
    @NotBlank
    private String name;
    @NotNull(message = "Start date was null")
    private LocalDate startDate;
    @NotNull(message = "End date was null")
    private LocalDate endDate;
    private Integer eventQuota;
    private Long creatorInstId;

    public Event toEvent() {
        return new Event(name, startDate, endDate, eventQuota, creatorInstId);
    }
}
