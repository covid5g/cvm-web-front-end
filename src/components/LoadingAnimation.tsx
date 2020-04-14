import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

const useStyles = makeStyles({
    progressContainer: {
        flexGrow: 1
    }
});

export default () => {
    const classes = useStyles();

    return <Grid
        className={classes.progressContainer}
        container
        justify={"center"}
        alignItems={"center"}
    >
        <Grid item>
            <CircularProgress size={100}/>
        </Grid>
    </Grid>
}