import {useEffect, useState} from "react";
import {MessageType} from "../../common/dto/MessageResponse";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {AppBar, Button, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import SignIn from "../SignIn";
import Login from "../institutionUser/login/Login";
import {State} from "../institutionUser/login/Login"
import {Link, Redirect} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {EventList} from "../externalUser/eventList/EventList";
import {EventApi, EventQueryResponse, UserQueryResponse} from "../externalUser/api/EventApi";
import {AddEventToInstitute, InstituteEventModel} from "./addEventToInstitute/AddEventToInstitute";
import {ExternalUserView} from "../externalUser/ExternalUserView";
import {ExternalUsersList} from "./showExternalUsers/ExternalUsersList";
import {EventListForInstitution} from "./eventListForInstitution/EventListForInstitution";
//import {AddEvent, EventModel} from "../externalUser/addEvent/AddEvent";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export function InstitutionUserView() {
    const classes = useStyles();
    let userDetails = JSON.parse(localStorage.getItem('user') as string);

    const [isAddEventModelOpen, setAddEventModelOpen] = useState(false);
    const [userEventQueryResponse, setUserEventQueryResponse] = useState<EventQueryResponse[]>([]);
    const [isUserModelOpen, setUserModelOpen] = useState(false);
    const [eventUserQueryResponse, seteventUserQueryResponse] = useState<UserQueryResponse[]>([]);

    const userEventApi = new EventApi();

    function fetchEvents() {
        console.log(userEventApi.getEventsOfUser(userDetails.username)
            .then(data => setUserEventQueryResponse(data)));
    }

    function fetchUsersForEvent(eventId: String) {
        userEventApi.getExternalUsersOfEvent(eventId).then(data => seteventUserQueryResponse(data));
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const addEventToInstitute = async (model: InstituteEventModel) => {
        const messageResponse = await userEventApi.addEventToInstitutionUser(model);
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
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Welcome to Event Management {userDetails.username}
                    </Typography>
                    <Button color="secondary" variant="contained" onClick={() => setAddEventModelOpen(true)}>Add event</Button>
                    <Button color="inherit" href="/logout">Back to External User</Button>
                </Toolbar>
            </AppBar>
            <AddEventToInstitute isOpen={isAddEventModelOpen}
                      handleClose={() => setAddEventModelOpen(false)}
                      addEventToInstitute={addEventToInstitute}
                      currentInstitutionId={userDetails.id}/>
            <EventListForInstitution events={userEventQueryResponse} fetchUsersForEvent={fetchUsersForEvent}/>
            <Grid container justifyContent="center" className={classes.root} spacing={10}>
                <Grid item xs={3}>
                    <Button color="primary" variant="contained" onClick={() => setUserModelOpen(true)}>Show Users</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button color="secondary" variant="contained" onClick={() => setUserModelOpen(false)}>Hide Users</Button>
                </Grid>

            </Grid>
            {
                isUserModelOpen && <ExternalUsersList users={eventUserQueryResponse}/>
            }
        </div>

    );
}