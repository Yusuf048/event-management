import {
    Button, Card, CardActions,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@material-ui/core";
import React, {ChangeEvent, useState, useReducer, useEffect} from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {EventApi, EventQueryResponse, UserQueryResponse} from "../../externalUser/api/EventApi";
import {InstitutionUserQueryResponse, LoginApi} from "../api/LoginApi";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Simulate} from "react-dom/test-utils";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 400,
            margin: `${theme.spacing(0)} auto`
        },
        loginBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1
        },
        header: {
            textAlign: 'center',
            background: '#212121',
            color: '#fff'
        },
        card: {
            marginTop: theme.spacing(10)
        }
    })
);

interface Props {
    isOpen: boolean;
    handleClose: () => void,
    login: (model: State) => void

}

export type State = {
    username: string
    password:  string
    isButtonDisabled: boolean
    helperText: string
    isError: boolean
};

const initialState:State = {
    username: '',
    password: '',
    isButtonDisabled: true,
    helperText: '',
    isError: false
};

type Action = { type: 'setUsername', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setIsButtonDisabled', payload: boolean }
    | { type: 'loginSuccess', payload: string }
    | { type: 'loginFailed', payload: string }
    | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setUsername':
            return {
                ...state,
                username: action.payload
            };
        case 'setPassword':
            return {
                ...state,
                password: action.payload
            };
        case 'setIsButtonDisabled':
            return {
                ...state,
                isButtonDisabled: action.payload
            };
        case 'loginSuccess':
            return {
                ...state,
                helperText: action.payload,
                isError: false
            };
        case 'loginFailed':
            return {
                ...state,
                helperText: action.payload,
                isError: true
            };
        case 'setIsError':
            return {
                ...state,
                isError: action.payload
            };
    }
}

const Login = () => {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [InstitutionUserQueryResponse, setInstitutionUserQueryResponse] = useState<InstitutionUserQueryResponse[]>([]);
    const [ExternalUserQueryResponse, setExternalUserQueryResponse] = useState<UserQueryResponse[]>([]);

    const loginApi = new LoginApi();

    function fetchInstitutionUsers() {
        loginApi.getInstitutionUsers()
            .then(data => setInstitutionUserQueryResponse(data));
    }

    function fetchExternalUsers() {
        loginApi.getExternalUsers().then(data => setExternalUserQueryResponse(data));
    }

    useEffect(() => {
        fetchInstitutionUsers();
        fetchExternalUsers();
    }, []);

    useEffect(() => {
        if (state.username.trim() && state.password.trim()) {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: false
            });
        } else {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: true
            });
        }
    }, [state.username, state.password]);

    const handleLogin = () => {
        fetchInstitutionUsers();
        fetchExternalUsers();
        let count = 0;
        let institutionSuccess = false;
        let externalSuccess = false;

        while(InstitutionUserQueryResponse[count] != null) {
            if (state.username === InstitutionUserQueryResponse[count].username && state.password === InstitutionUserQueryResponse[count].password) {
                dispatch({
                    type: 'loginSuccess',
                    payload: 'Login Successful'
                });
                toast.success("Login Successful!");
                institutionSuccess = true;
                localStorage.setItem("user", JSON.stringify(InstitutionUserQueryResponse[count]))
                console.log(InstitutionUserQueryResponse[count]);
                break;
            }
            if (state.username === ExternalUserQueryResponse[count].email && state.password === ExternalUserQueryResponse[count].password) {
                dispatch({
                    type: 'loginSuccess',
                    payload: 'Login Successful'
                });
                toast.success("Login Successful!");
                externalSuccess = true;
                localStorage.setItem("user", JSON.stringify(ExternalUserQueryResponse[count]))
                console.log(ExternalUserQueryResponse[count]);
                break;
            }
            count++;
        }
        if(institutionSuccess) {
            setTimeout(function() {
                window.location.replace('/institution/:InstitutionUserQueryResponse[count].username');
            }, 2000);
        } else if(externalSuccess) {
            setTimeout(function() {
                window.location.replace('/');
            }, 2000);
        } else {
            dispatch({
                type: 'loginFailed',
                payload: 'Incorrect username or password'
            });
            toast.error("Login Unsuccessful");
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isButtonDisabled || handleLogin();
        }
    };

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setUsername',
                payload: event.target.value
            });
        };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setPassword',
                payload: event.target.value
            });
        }
    return (
        <form className={classes.container} noValidate autoComplete="off">
            <Card className={classes.card}>
                <CardHeader className={classes.header} title="Login App" />
                <CardContent>
                    <div>
                        <TextField
                            error={state.isError}
                            fullWidth
                            id="username"
                            type="email"
                            label="Username/Email"
                            placeholder="Username"
                            margin="normal"
                            onChange={handleUsernameChange}
                            onKeyPress={handleKeyPress}
                        />
                        <TextField
                            error={state.isError}
                            fullWidth
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="Password"
                            margin="normal"
                            helperText={state.helperText}
                            onChange={handlePasswordChange}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        className={classes.loginBtn}
                        onClick={handleLogin}
                        disabled={state.isButtonDisabled}>
                        Login
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}

export default Login;