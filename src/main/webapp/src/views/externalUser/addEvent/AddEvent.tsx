import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import {ChangeEvent, useState} from "react";

interface Props {
    isOpen: boolean;
    handleClose: () => void,
    addEvent: (model: EventModel) => void
}

export interface EventModel {
    name: string;
    startDate: string;
    endDate: string;
    eventQuota: string;
}

const initialState: EventModel = {
    name: "",
    startDate: "",
    endDate: "",
    eventQuota: ""
};

export function AddEvent(props: Props) {

    const [eventModel, setEventModel] = useState<EventModel>(initialState);

    const onFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name;
        const value = event.target.value;
        //const numValue = parseInt(event.target.valueAsNumber.toString());
        //react-hook-form
        setEventModel(updateFormState(field, value));
    }

    function updateFormState(field: string, value: string) {
        const newModelState = {...eventModel};
        switch (field) {
            case "name":
                newModelState.name = value;
                break;
            case "startDate":
                newModelState.startDate = value;
                break;
            case "endDate":
                newModelState.endDate = value;
                break;
            case "eventQuota":
                newModelState.eventQuota = value;
                break;
        }
        return newModelState;
    }

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.handleClose}>
            <DialogTitle>Add student</DialogTitle>
            <DialogContent>
                <TextField onChange={onFormChange} fullWidth name="name" label="Name"/>
                <TextField onChange={onFormChange} fullWidth name="startDate" label="Start Date"/>
                <TextField onChange={onFormChange} fullWidth name="endDate" label="End Date"/>
                <TextField onChange={onFormChange} fullWidth name="eventQuota" label="Event Quota"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={() => props.addEvent(eventModel)} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );

}
