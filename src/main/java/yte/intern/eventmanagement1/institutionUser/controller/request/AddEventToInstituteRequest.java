package yte.intern.eventmanagement1.institutionUser.controller.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import yte.intern.eventmanagement1.event.entity.Event;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Getter
@RequiredArgsConstructor
public class AddEventToInstituteRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String startDate;
    @NotBlank
    private String endDate;
    private Integer eventQuota;

    public Event toEvent() {
        return new Event(name, startDate, endDate, eventQuota);
    }
}
