import React from "react";
import {makeStyles} from "@material-ui/core";
import User from "../types/User";
import {AppState} from "../store"
import {connect} from "react-redux";
import {Redirect} from "react-router-dom"
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";

// noinspection TypeScriptValidateJSTypes
const useStyles = makeStyles(theme => ({
    dashboard: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
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

    return <Container>
        <Card className={classes.dashboard}>
            <CardContent>
                Hello, {user.email}
            </CardContent>
        </Card>
    </Container>
};

const mapStateToProps = (state: AppState) => ({
    user: state.users.appUser
});

export default connect(mapStateToProps)(Dashboard);