import React from "react";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        flexGrow: 1
    }
}));

const Wrapper: React.FC = ({children}) => {
    const classes = useStyles();

    return <Grid container direction={"column"} className={classes.root}>
        {children}
    </Grid>
};

export default Wrapper