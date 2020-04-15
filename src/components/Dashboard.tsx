import React from "react";
import {makeStyles} from "@material-ui/core";
import User from "../types/User";
import {AppState} from "../store"
import {connect} from "react-redux";
import {Redirect} from "react-router-dom"
import Map from "./Map";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import {green, red} from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";

// noinspection TypeScriptValidateJSTypes
const useStyles = makeStyles(theme => ({
    dashboard: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2)
    },
    mapContainer: {
        height: 500
    },
    checkupDoneIcon: {
        color: green.A700,
        display: "block"
    },
    checkupNotDoneIcon: {
        color: red.A700,
        display: "block"
    }
}));


interface LoginFormProps {
    user: User | null,
    dispatch: (arg0: any) => void,
}

const Dashboard = ({user, dispatch}: LoginFormProps) => {
    const classes = useStyles();

    if (user === null) {
        return <Redirect to="/login"/>
    }

    let userCheckupData;
    if (user.needsCheckup) {
        userCheckupData = <Grid container alignItems={"center"} spacing={1}>
            <Grid item>
                <CancelIcon className={classes.checkupNotDoneIcon}/>
            </Grid>
            <Grid item>
                <Typography>
                    Please perform you checkup!
                </Typography>
            </Grid>
            <Grid item>
                <Button color={"primary"} variant={"contained"}>
                    Do checkup!
                </Button>
            </Grid>
        </Grid>
    } else {
        userCheckupData =
            <Grid container alignItems={"center"} spacing={1}>
                <Grid item>
                    <CheckCircleIcon className={classes.checkupDoneIcon}/>
                </Grid>
                <Grid item>
                    <Typography>
                        All good, you checkup is done!
                    </Typography>
                </Grid>
            </Grid>
    }

    return <React.Fragment>
        <Grid item>
            <Grid container direction={"row"} justify={"space-between"}>
                <Grid item>
                    <Paper className={classes.dashboard}>
                        <Typography> Hello, {user.email} </Typography>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.dashboard}>
                        {userCheckupData}
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
        <Grid item className={classes.mapContainer}>
            <Map/>
        </Grid>
    </React.Fragment>
};

const mapStateToProps = (state: AppState) => ({
    user: state.users.appUser
});

export default connect(mapStateToProps)(Dashboard);