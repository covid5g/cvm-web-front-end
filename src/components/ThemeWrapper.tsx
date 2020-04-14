import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import React from "react";
import {Grid, makeStyles, MuiThemeProvider} from "@material-ui/core";
import {purple} from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
    palette: {
        primary: purple,
        type: "dark"
    }
});

const useStyles = makeStyles({
    root: {
        minHeight: "100vh",
        width: "100%",
        backgroundColor: theme.palette.background.default
    }
});

const ThemeWrapper: React.FC = ({children}) => {
    const classes = useStyles();

    return <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <Grid container direction={"column"} className={classes.root}>
            {children}
        </Grid>
    </MuiThemeProvider>
};

export default ThemeWrapper
