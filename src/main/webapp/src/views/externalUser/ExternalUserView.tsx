import {useEffect, useState} from "react";
import {EventApi, EventQueryResponse} from "./api/EventApi";
import {AddEvent, EventModel} from "./addEvent/AddEvent";
import {MessageType} from "../../common/dto/MessageResponse";
import {toast} from "react-toastify";
import {Button} from "@material-ui/core";
import {EventList} from "./eventList/EventList";
import SignIn from "../SignIn";
import Login from "../institutionUser/login/Login";
import {State} from "../institutionUser/login/Login"
import {Redirect} from "react-router-dom";

export function ExternalUserView() {

    const [isAddEventModelOpen, setAddEventModelOpen] = useState(false);
    const [eventQueryResponse, setEventQueryResponse] = useState<EventQueryResponse[]>([]);
    const [isLoginModelOpen, setLoginModelOpen] = useState(false);

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
            <Button color="primary" onClick={<Redirect to='/login'  />}>Login as Institute</Button>
            <AddEvent isOpen={isAddEventModelOpen}
                      handleClose={() => setAddEventModelOpen(false)}
                      addEvent={addEvent}/>
            <EventList events={eventQueryResponse}/>
        </div>
    );
}