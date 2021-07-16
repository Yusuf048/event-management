import {useEffect, useState} from "react";
import {EventApi, EventQueryResponse} from "./api/EventApi";
import {AddEvent, EventModel} from "./addEvent/AddEvent";
import {MessageType} from "../../common/dto/MessageResponse";
import {toast} from "react-toastify";
import {Button} from "@material-ui/core";
import {EventList} from "./eventList/EventList";

export function ExternalUserView() {

    const [isAddEventModelOpen, setAddEventModelOpen] = useState(false);
    const [eventQueryResponse, setEventQueryResponse] = useState<EventQueryResponse[]>([]);

    const eventApi = new EventApi();

    function fetchEvents() {
        eventApi.getEvents()
            .then(data => setEventQueryResponse(data));
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const addEvent = async (model: EventModel) => {
        const messageResponse = await eventApi.addEvent(model);
        console.log(messageResponse);
        if (messageResponse.messageType === MessageType.SUCCESS) {
            toast.success(messageResponse.message);
            setAddEventModelOpen(false);
            fetchEvents();
        } else {
            toast.error(messageResponse.message);
        }
    }

    return (
        <div>
            <Button color="primary" onClick={() => setAddEventModelOpen(true)}>Add event</Button>
            <AddEvent isOpen={isAddEventModelOpen}
                      handleClose={() => setAddEventModelOpen(false)}
                      addEvent={addEvent}/>
            <EventList events={eventQueryResponse}/>
        </div>
    );
}