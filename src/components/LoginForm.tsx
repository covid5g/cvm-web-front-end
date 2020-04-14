import TextField from "@material-ui/core/TextField";
import React from "react";
import {makeStyles} from "@material-ui/core";
import User, {LoginFormUser} from "../types/User";
import {AppState} from "../store"
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import UserFormMessage from "./UserFormMessage";
import {Redirect} from "react-router-dom"
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import {updateLoginForm} from "../actions/users";
import {loginUserThunk} from "../thunks/users";
import CircularProgress from "@material-ui/core/CircularProgress";

// noinspection TypeScriptValidateJSTypes
const useStyles = makeStyles(theme => ({
    input: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));


interface LoginFormProps {
    user: User | null,
    isSubmitting: boolean,
    message: string,
    loginForm: LoginFormUser
    dispatch: (arg0: any) => void,
}

const LoginForm = ({user, isSubmitting, message, loginForm, dispatch}: LoginFormProps) => {
    const classes = useStyles();

    if (user !== null) {
        return <Redirect to="/"/>
    }

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

    return <Container maxWidth="sm">
        <Card>
            <CardContent>
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
            </CardContent>
        </Card>
    </Container>
};

const mapStateToProps = (state: AppState) => ({
    user: state.users.appUser,
    isSubmitting: state.users.isSubmitting,
    message: state.users.message,
    loginForm: state.users.loginForm
});

export default connect(mapStateToProps)(LoginForm);