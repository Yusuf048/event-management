package yte.intern.eventmanagement1.common.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import yte.intern.eventmanagement1.common.enums.MessageType;

@Getter
@RequiredArgsConstructor
public class MessageResponse {
    private final MessageType messageType;
    private final String message;

    public boolean hasError() {
        return messageType.equals(MessageType.ERROR);
    }
}