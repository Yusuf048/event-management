import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import {ChangeEvent, useState} from "react";
import {ExternalUserView} from "../../externalUser/ExternalUserView";

interface Props {
    isOpen: boolean;
    handleClose: () => void;
    updateEventForInstitute: (model: InstituteEventModel) => void;
    currentInstitutionId: number;
    initialEvent: InstituteEventModel;
}

export interface InstituteEventModel {
    name: string;
    startDate: string;
    endDate: string;
    eventQuota: string;
    creatorInstId: number;
}

const initialState: InstituteEventModel = {
    name: "",
    startDate: "",
    endDate: "",
    eventQuota: "",
    creatorInstId: -1
};


export function UpdateEventForm(props: Props) {

    const [eventModel, setEventModel] = useState<InstituteEventModel>(props.initialEvent);

    const onUpdateFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name;
        const value = event.target.value;
        //const numValue = parseInt(event.target.valueAsNumber.toString());
        //react-hook-form
        setEventModel(updateFormState(field, value));
    }

    function updateFormState(field: string, value: string) {
        //const newModelState = {...eventModel};
        const newModelState = props.initialEvent;
        switch (field) {
            case "name":
                if(value != "")
                    newModelState.name = value;
                break;
            case "startDate":
                if(value != "")
                    newModelState.startDate = value;
                break;
            case "endDate":
                if(value != "")
                    newModelState.endDate = value;
                break;
            case "eventQuota":
                if(value != "")
                    newModelState.eventQuota = value;
                break;
        }
        newModelState.creatorInstId = props.currentInstitutionId;
        console.log(props.currentInstitutionId);
        return newModelState;
    }

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.handleClose}>
            <DialogTitle>Add Event</DialogTitle>
            <DialogContent>
                <TextField onChange={onUpdateFormChange} fullWidth name="name" label={props.initialEvent.name}/>
                <TextField onChange={onUpdateFormChange} fullWidth name="startDate" label={props.initialEvent.startDate}/>
                <TextField onChange={onUpdateFormChange} fullWidth name="endDate" label={props.initialEvent.endDate}/>
                <TextField onChange={onUpdateFormChange} fullWidth name="eventQuota" label={props.initialEvent.eventQuota}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={() => props.updateEventForInstitute(eventModel)} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );

}
