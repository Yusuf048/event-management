import {useEffect, useState} from "react";
import {EventApi, EventQueryResponse, UserQueryResponse} from "./api/EventApi";
import {AddEvent, EventModel} from "./addEvent/AddEvent";
import {MessageType} from "../../common/dto/MessageResponse";
import {toast} from "react-toastify";
import {
    AppBar,
    Button,
    Grid,
    IconButton, ImageList, ImageListItem,
    ImageListItemBar, ListSubheader,
    Paper,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import {EventList} from "./eventList/EventList";
import SignIn from "../SignIn";
import Login from "../institutionUser/login/Login";
import {State} from "../institutionUser/login/Login"
import {Link, Redirect} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {AddUserToEvent, UserModel} from "./addUserToEvent/AddUserToEvent";
import {ShowImages} from "./showImages/ShowImages";
import {EnrolledEventList} from "./eventList/EnrolledEventList";
//import QRCode from 'qrcode';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        width: 500,
        height: 450,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export interface imageItems {
    img: string;
    title: string;
    author: string;
}

export function ExternalUserView() {
    const classes = useStyles();
    let userDetails = JSON.parse(localStorage.getItem('user') as string);
    //<img src={itemData[0].img} alt='img' />
    var itemData: imageItems[];
    itemData = [{
        img: "change",
        title: "change",
        author: "change"
    }];

    const [isAddEventModelOpen, setAddEventModelOpen] = useState(false);
    const [eventQueryResponse, setEventQueryResponse] = useState<EventQueryResponse[]>([]);
    const [enrolledEventQueryResponse, setEnrolledEventQueryResponse] = useState<EventQueryResponse[]>([]);
    const [isButtonOpen, setButtonOpen] = useState(false);
    const [isAddUserModeOpen, setAddUserModeOpen] = useState(false);
    const [eventName, setEventName] = useState("");
    const [imageUrl, setImageUrl] = useState('');
    const [allimagesUrl, setAllimagesUrl] = useState('');
    const [isImageOpen, setImageOpen] = useState(false);
    const [isEventsOpen, setEventsOpen] = useState(false);
    //const [itemData, setItemData] = useState<imageItems[]>([]);
    const [isEventModelOpen, setEventModelOpen] = useState(false);

    const eventApi = new EventApi();

    var QRCode = require('qrcode');
    var firstTime = 0;

    /*QRCode.toDataURL('I am a pony!', function (err: any, url: any) {
        console.log(url)
    })*/
    const generateQrCode = async (userModel: UserModel) => {
        try {
            const qrResponse = await QRCode.toDataURL("Event Name: " + eventName
                + "\n User Information: \n" + userModel.firstName + "\n"
                + userModel.lastName + "\n" + userModel.tcKimlikNumber);
            setImageUrl(qrResponse);
            //await generateQrCodeForEvent(userModel.firstName, userModel.lastName, userModel.tcKimlikNumber, eventName);
            fetchEnrolledEvents();
        }catch (error) {
            console.log(error);
        }
    }

    const generateQrCodeForEvent = async (firstname: string, lastname: string,
                                          tcKimlikNumber: string, evName: string) => {
        try {
            const qrResponse = await QRCode.toDataURL("Event Name: " + evName
                + "\n User Information: \n" + firstname + "\n"
                + lastname + "\n" + tcKimlikNumber);
            await setAllimagesUrl(qrResponse);
            console.log("qrResponse: ");
            console.log(qrResponse);
        }catch (error) {
            console.log(error);
        }
    }

    function fetchEnrolledEvents() {
        if(userDetails) {
            console.log("in fetch enrolled events...");
            //let oldEvents = enrolledEventQueryResponse;
            console.log(eventApi.getEventsOfExternalUser(userDetails.tcKimlikNumber)
                .then(data => setEnrolledEventQueryResponse(data)));
        }
    }

    async function fillData() {
        let count = 0;
        if(firstTime != 0) {
            while(enrolledEventQueryResponse[count] != undefined) {
                console.log("in while loop");

                let creatorOfEvent = enrolledEventQueryResponse[count].creatorInstId;
                if(itemData.find(value => value.title === enrolledEventQueryResponse[count].name)){
                    count++;
                }else {
                    await generateQrCodeForEvent(JSON.parse(localStorage.getItem('user') as string).firstname,
                        JSON.parse(localStorage.getItem('user') as string).lastname,
                        JSON.parse(localStorage.getItem('user') as string).tcKimlikNumber,
                        enrolledEventQueryResponse[count].name);

                    /*let newItemData = itemData;
                    newItemData.push({
                        img: allimagesUrl,
                        title: enrolledEventQueryResponse[count].name,
                        author: '',
                    })
                    setItemData(newItemData);*/

                    let singleItem = {
                        img: allimagesUrl,
                        title: enrolledEventQueryResponse[count].name,
                        author: '',
                    }

                    if(itemData.find(value => value.img === "change")) {
                        itemData.splice(0, 1, singleItem);
                        console.log("sliced: ");
                        console.log(itemData[0].img);
                    } else {
                        itemData.push({
                            img: allimagesUrl,
                            title: enrolledEventQueryResponse[count].name,
                            author: '',
                        })
                        console.log("pushed: ");
                        console.log(itemData[0].img);
                    }
                    count++;
                }
            }
        } else {
            while(enrolledEventQueryResponse[count] != undefined) {
                await generateQrCodeForEvent(JSON.parse(localStorage.getItem('user') as string).firstname,
                    JSON.parse(localStorage.getItem('user') as string).lastname,
                    JSON.parse(localStorage.getItem('user') as string).tcKimlikNumber,
                    enrolledEventQueryResponse[count].name);
                count++;
            }
            firstTime++;
        }
    }


    function fetchEvents() {
        eventApi.getEvents()
            .then(data => setEventQueryResponse(data));
        fetchEnrolledEvents();
    }


    async function addUserToEvent(userModel: UserModel) {
        const messageResponse = await eventApi.addUserToEvent(userModel);
        console.log(messageResponse);
        if (messageResponse.messageType === MessageType.SUCCESS) {
            toast.success(messageResponse.message);
            setAddEventModelOpen(false);
        } else {
            toast.error(messageResponse.message);
            setAddEventModelOpen(false);
        }
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
    /*
    {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                            <img src={item.img} alt={item.title} />
                            <ImageListItemBar
                                title={item.title}
                                subtitle={<span>by: {item.author}</span>}
                            />
                        </ImageListItem>
                    ))}*/

/*<div className={classes.root}>
                <ImageList rowHeight={180} className={classes.imageList}>
                    <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">December</ListSubheader>
                    </ImageListItem>

                    {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                            <img src={item.img} alt={item.title} />
                            <ImageListItemBar
                                title={item.title}
                                subtitle={<span>by: {item.author}</span>}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>*/

    //<ShowImages itemData={itemData} setEventModelOpen={setEventModelOpen} isEventModelOpen={isEventModelOpen}/>

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Welcome to Event Management {userDetails.firstName}
                    </Typography>
                    <Button disabled={userDetails == null} color="inherit" href="/logout">Log Out</Button>
                    <Button color="inherit" href="/logoutExt">Login</Button>
                </Toolbar>
            </AppBar>
            <AddEvent isOpen={isAddEventModelOpen}
                      handleClose={() => setAddEventModelOpen(false)}
                      addEvent={addEvent}/>
            <EventList events={eventQueryResponse} setButtonOpen={setButtonOpen} setEventName={setEventName}/>
            <Button disabled={isButtonOpen == false} color="primary" variant="contained" onClick={() => setAddUserModeOpen(true)}>Enroll In Event</Button>
            <AddUserToEvent isOpen={isAddUserModeOpen} handleClose={() => setAddUserModeOpen(false)} addUserToEvent={addUserToEvent} eventName={eventName} generateQrCode={generateQrCode}/>
            <Grid container spacing={2}>
                <Grid item>
                    <br/>
                    {imageUrl ? (<img src={imageUrl} alt="img"/>) : null}
                </Grid>
            </Grid>
            <Button disabled={userDetails == null} color="primary" onClick={() => { if(isEventsOpen == false){
                setEventsOpen(true)
            } else {setEventsOpen(false)}
            }}>Show Enrolled Events</Button>

            {
                isEventsOpen && <EnrolledEventList events={enrolledEventQueryResponse} setEventName={setEventName}/>
            }



        </div>
    );
}