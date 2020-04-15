import SnackbarContent from "@material-ui/core/SnackbarContent";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {green} from "@material-ui/core/colors";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import {AppState} from "../store";
import {connect} from "react-redux";
import clsx from "clsx";

// noinspection TypeScriptValidateJSTypes
const useStyles = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
        fontSize: 20,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    snackbar: {
        width: "100%"
    }
}));

interface UserFormMessageProps {
    message: string,
    isSuccess: boolean
}

const UserFormMessage = ({message, isSuccess}: UserFormMessageProps) => {
    const classes = useStyles();
    const Icon = isSuccess ? CheckCircleIcon : ErrorIcon;

    return <SnackbarContent
        className={clsx(classes[isSuccess ? "success" : "error"], classes.snackbar)}
        message={
            <span className={classes.message}>
          <Icon className={classes.iconVariant}/>
                {message}
        </span>
        }
    />
};

const mapStateToProps = (state: AppState) => ({
    isSuccess: state.users.isSuccess,
    message: state.users.message
});

export default connect(mapStateToProps)(UserFormMessage);