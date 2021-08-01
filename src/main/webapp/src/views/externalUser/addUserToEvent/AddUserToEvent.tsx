import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import {ChangeEvent, useState} from "react";

interface Props {
    isOpen: boolean;
    handleClose: () => void,
    addUserToEvent: (model: UserModel) => void,
    eventName: string,
    generateQrCode: (model: UserModel) => void
}

export interface UserModel {
    firstName: string;
    lastName: string;
    email: string;
    tcKimlikNumber: string;
    enrolledEventName: string
}

const initialState: UserModel = {
    firstName: "",
    lastName: "",
    email: "",
    tcKimlikNumber: "",
    enrolledEventName: ""
};

export function AddUserToEvent(props: Props) {

    const [userModel, setUserModel] = useState<UserModel>(initialState);

    const onFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name;
        const value = event.target.value;
        //const numValue = parseInt(event.target.valueAsNumber.toString());
        //react-hook-form
        setUserModel(updateFormState(field, value));
    }

    function updateFormState(field: string, value: string) {
        const newModelState = {...userModel};
        switch (field) {
            case "firstname":
                newModelState.firstName = value;
                break;
            case "lastname":
                newModelState.lastName = value;
                break;
            case "email":
                newModelState.email = value;
                break;
            case "tcKimlikNumber":
                newModelState.tcKimlikNumber = value;
                break;
        }
        newModelState.enrolledEventName = props.eventName;
        return newModelState;
    }

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.handleClose}>
            <DialogTitle>Add User</DialogTitle>
            <DialogContent>
                <TextField onChange={onFormChange} fullWidth name="firstname" label="First Name"/>
                <TextField onChange={onFormChange} fullWidth name="lastname" label="Last Name"/>
                <TextField onChange={onFormChange} fullWidth name="email" label="Email"/>
                <TextField onChange={onFormChange} fullWidth name="tcKimlikNumber" label="Tc Kimlik Number"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={() => {props.addUserToEvent(userModel);
                    props.generateQrCode(userModel)}} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );

}
