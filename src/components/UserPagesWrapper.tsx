import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Grid} from "@material-ui/core";

interface UserPagesWrapperProps {
    children: any
}

// noinspection TypeScriptValidateJSTypes
const useStyles = makeStyles({
    root: {
        background: "url(/map.jpg) no-repeat center center fixed",
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
        flexGrow: 1
    }
});

const UserPagesWrapper = ({children}: UserPagesWrapperProps) => {
    const classes = useStyles();
    return <Grid container justify={"center"} alignItems={"center"} direction={"column"} className={classes.root}>
        {children}
    </Grid>
};

export default UserPagesWrapper;