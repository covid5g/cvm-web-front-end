import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles} from "@material-ui/core";
import {RegisterFormUser} from "../types/User";
import {AppState} from "../store"
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import UserFormMessage from "./UserFormMessage";
import {updateRegisterForm} from "../actions/users";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import {registerUserThunk} from "../thunks/users";

// noinspection TypeScriptValidateJSTypes
const useStyles = makeStyles(theme => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


interface RegisterFormProps {
    isSubmitting: boolean,
    message: string,
    registerForm: RegisterFormUser
    dispatch: (arg0: any) => void,
}

const LoginForm = ({isSubmitting, message, registerForm, dispatch}: RegisterFormProps) => {
    const classes = useStyles();

    const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateRegisterForm({
            ...registerForm,
            email: event.target.value
        }))
    };

    const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateRegisterForm({
            ...registerForm,
            password: event.target.value
        }))
    };

    const updatePasswordConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateRegisterForm({
            ...registerForm,
            passwordConfirm: event.target.value
        }))
    };

    const registerUser = () => {
        dispatch(registerUserThunk(registerForm))
    };

    return <Grid container direction={"row"}>
        {!!message && <UserFormMessage/>}
        <TextField
            disabled={isSubmitting}
            className={classes.input}
            label={"Email"}
            fullWidth
            variant={"outlined"}
            onChange={updateEmail}
        />
        <TextField
            disabled={isSubmitting}
            className={classes.input}
            label={"Password"}
            fullWidth
            variant={"outlined"}
            type={"password"}
            onChange={updatePassword}
        />
        <TextField
            disabled={isSubmitting}
            className={classes.input}
            label={"Confirm Password"}
            fullWidth
            variant={"outlined"}
            type={"password"}
            onChange={updatePasswordConfirm}
        />
        <Button
            fullWidth
            disabled={isSubmitting}
            className={classes.input}
            variant="contained"
            component="label"
            color={"primary"}
            onClick={registerUser}
        >
            {isSubmitting ? <CircularProgress size={24}/> : "Register"}
        </Button>
    </Grid>
};

const mapStateToProps = (state: AppState) => ({
    isSubmitting: state.users.isSubmitting,
    message: state.users.message,
    registerForm: state.users.registerForm
});

export default connect(mapStateToProps)(LoginForm);