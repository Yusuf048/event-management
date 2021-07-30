import {DataGrid} from "@material-ui/data-grid";
import {EventQueryResponse} from "../api/EventApi";
import React, {Dispatch, SetStateAction, useState} from "react";
import {Modal} from "@material-ui/core";
import {UserModel} from "../addUserToEvent/AddUserToEvent";
import {makeStyles} from "@material-ui/core/styles";

const tableColumns = [
    {field: "id", headerName: "ID", width: 120},
    {field: "name", headerName: "NAME", width: 250},
    {field: "startDate", headerName: "STARTDATE", width: 250},
    {field: "endDate", headerName: "ENDDATE", width: 250},
    {field: "eventQuota", headerName: "EVENTQUOTA", width: 250}
];

interface Props {
    events: EventQueryResponse[]
    setEventName: Dispatch<SetStateAction<string>>
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export function EnrolledEventList(props: Props) {
    const [isImageOpen, setImageOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [glblEventName, setEventName] = useState("");

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    let userDetails = JSON.parse(localStorage.getItem('user') as string);
    console.log(userDetails);
    var QRCode = require('qrcode');

    const generateQrCode = async (userModel: UserModel, eventName: string) => {
        try {
            const qrResponse = await QRCode.toDataURL("Event Name: " + eventName
                + "\n User Information: \n" + userModel.firstName + "\n"
                + userModel.lastName + "\n" + userModel.tcKimlikNumber);
            setImageUrl(qrResponse);
            //await generateQrCodeForEvent(userModel.firstName, userModel.lastName, userModel.tcKimlikNumber, eventName);
        }catch (error) {
            console.log(error);
        }
    }



    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">{glblEventName}</h2>
            <img src={imageUrl} alt={"asd"}/>
            <p id="simple-modal-description">
                User First Name: {userDetails.firstName}
                <br></br>
                User Last Name: {userDetails.lastName}
                <br></br>
                User Email: {userDetails.email}
                <br></br>
                User TCKN: {userDetails.tcKimlikNumber}
            </p>
        </div>
    );

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid columns={tableColumns} rows={props.events} pageSize={5} disableMultipleSelection
                      onRowSelected={(newSelection) => {
                          var eventName = newSelection.data.name;
                          setEventName(eventName);
                          console.log(eventName);
                          props.setEventName(eventName);
                          if(!isImageOpen){
                              setImageOpen(true);
                          }else
                              setImageOpen(false);

                          generateQrCode(userDetails, eventName)
                      }}/>
            <Modal
                open={isImageOpen}
                onClose={() => setImageOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}