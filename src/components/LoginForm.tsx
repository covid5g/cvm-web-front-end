import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles} from "@material-ui/core";
import {LoginFormUser} from "../types/User";
import {AppState} from "../store"
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import UserFormMessage from "./UserFormMessage";
import {updateLoginForm} from "../actions/users";
import {loginUserThunk} from "../thunks/users";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

// noinspection TypeScriptValidateJSTypes
const useStyles = makeStyles(theme => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));


interface LoginFormProps {
    isSubmitting: boolean,
    message: string,
    loginForm: LoginFormUser
    dispatch: (arg0: any) => void,
}

const LoginForm = ({isSubmitting, message, loginForm, dispatch}: LoginFormProps) => {
    const classes = useStyles();

    const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateLoginForm({
            ...loginForm,
            email: event.target.value
        }))
    };

    const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateLoginForm({
            ...loginForm,
            password: event.target.value
        }))
    };

    const loginUser = () => {
        dispatch(loginUserThunk(loginForm))
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
        <Button
            fullWidth
            disabled={isSubmitting}
            className={classes.input}
            variant="contained"
            component="label"
            color={"primary"}
            onClick={loginUser}
        >
            {isSubmitting ? <CircularProgress size={24}/> : "Login"}
        </Button>
    </Grid>
};

const mapStateToProps = (state: AppState) => ({
    isSubmitting: state.users.isSubmitting,
    message: state.users.message,
    loginForm: state.users.loginForm
});

export default connect(mapStateToProps)(LoginForm);