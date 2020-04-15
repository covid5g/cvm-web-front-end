import React, {useLayoutEffect, useRef, useState} from "react";
import {makeStyles} from "@material-ui/core";
import User from "../../types/User";
import {AppState} from "../../store"
import {connect} from "react-redux";
import {Redirect} from "react-router-dom"
import Map from "../Map";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import {green, orange} from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import {DataState} from "../../reducers/data";
import {fetchDiseaseDataThunk, fetchReverseGeoThunk} from "../../thunks/data";
import MapPosition from "../../types/MapPosition";
import DiseaseDataWidget from "../DiseaseDataWidget";

// noinspection TypeScriptValidateJSTypes
const useStyles = makeStyles(theme => ({
    dashboard: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2)
    },
    mapWrapper: {
        flexGrow: 1
    },
    checkupDoneIcon: {
        color: green.A700,
        display: "block"
    },
    checkupNotDoneIcon: {
        color: orange.A700,
        display: "block"
    }
}));


interface LoginFormProps {
    user: User | null,
    data: DataState,
    userPosition: MapPosition | null,
    dispatch: (arg0: any) => void
}

const Dashboard = ({user, data, userPosition, dispatch}: LoginFormProps) => {
    const classes = useStyles();
    const mapWrapper = useRef<HTMLDivElement | null>(null);
    const [mapHeight, setMapHeight] = useState(500);

    const mapStyle = {
        height: mapHeight,
        width: "100%"
    };

    useLayoutEffect(() => {
        if (mapWrapper && mapWrapper.current !== null && mapWrapper.current.clientHeight > 500) {
            // @ts-ignore
            setMapHeight(mapWrapper.current.clientHeight)
        }
    }, []);

    if (user === null) {
        return <Redirect to="/login"/>
    }

    if (data.diseaseDataLoaded === false) {
        dispatch(fetchDiseaseDataThunk())
    }

    if (data.countryLoaded === false && userPosition !== null) {
        dispatch(fetchReverseGeoThunk(userPosition))
    }

    let userCheckupData;
    if (user.needsCheckup) {
        userCheckupData = <Grid container alignItems={"center"} spacing={1}>
            <Grid item>
                <WarningIcon className={classes.checkupNotDoneIcon}/>
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
            <Grid container direction={"row"} justify={"space-between"} alignItems={"center"}>
                <Grid item>
                    <Paper className={classes.dashboard}>
                        <DiseaseDataWidget/>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.dashboard}>
                        {userCheckupData}
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
        <Grid item ref={mapWrapper} className={classes.mapWrapper}>
            <Box style={mapStyle}>
                <Map/>
            </Box>
        </Grid>
    </React.Fragment>
};

const mapStateToProps = (state: AppState) => ({
    user: state.users.appUser,
    data: state.data,
    userPosition: state.map.userPosition
});

export default connect(mapStateToProps)(Dashboard);