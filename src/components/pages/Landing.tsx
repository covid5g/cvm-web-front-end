import React from "react";
import {makeStyles} from "@material-ui/core";
import User from "../../types/User";
import {AppState} from "../../store"
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom"
import Card from "@material-ui/core/Card";
import Grid, {GridProps} from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";

// noinspection TypeScriptValidateJSTypes
const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 500,
        width: 500,
        margin: theme.spacing(2)
    },
    cardContent: {
        height: "100%"
    },
    fixForWidth: {
        maxWidth: "100%"
    }
}));

interface TabPanelProps extends GridProps {
    value: number
    index: number
}

const TabPanel = (props: TabPanelProps) => {
    const {children, value, index, ...other} = props;

    // @ts-ignore
    return (
        <Grid item
              role="tabpanel"
              hidden={value !== index}
              {...other}
        >
            {value === index && children}
        </Grid>
    );
};


interface LandingProps {
    user: User | null
}

const Landing = ({user}: LandingProps) => {
    const classes = useStyles();
    const [tabIndex, setTabIndex] = React.useState(0 as any);

    const handleTabChange = (event: React.ChangeEvent<{}>, tabIndex: any) => {
        setTabIndex(tabIndex);
    };

    if (user !== null) {
        return <Redirect to="/"/>
    }

    return <Grid container justify={"space-evenly"}>
        <Grid item className={classes.card}>
            <Card>
                <CardContent>
                    <Typography variant={"h4"}>
                        Disclaimer
                    </Typography>
                    <Typography>
                        The information contained in COVID5G Application is not intended nor implied to be a substitute
                        for professional medical advice, it is meant to supplement the information that you obtain from
                        your physician or your healthcare provider.
                        <br/>
                        <br/>
                        You assume full responsibility for how you choose to use this information.
                        Always seek the advice of your physician or other qualified healthcare provider before starting
                        any new treatment or discontinuing an existing treatment. Talk with your healthcare provider
                        about any questions you may have regarding a medical condition.
                        <br/>
                        <br/>
                        Nothing contained in COVID5G Application is intended to be used for medical diagnosis or
                        treatment.
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
        <Grid item className={classes.card}>
            <Card className={classes.cardContent}>
                <CardContent className={classes.cardContent}>
                    <Grid container direction={"column"} className={classes.cardContent} justify={"space-between"}>
                        <Grid item className={classes.fixForWidth}>
                            <Typography variant={"h4"}>
                                Welcome to Covid Tracker
                            </Typography>
                        </Grid>
                        <TabPanel value={tabIndex} index={0} className={classes.fixForWidth}>
                            <RegisterForm/>
                        </TabPanel>
                        <TabPanel value={tabIndex} index={1} className={classes.fixForWidth}>
                            <LoginForm/>
                        </TabPanel>
                        <Grid item className={classes.fixForWidth}>
                            <Tabs
                                value={tabIndex}
                                onChange={handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                            >
                                <Tab label="Register"/>
                                <Tab label="Login"/>
                                <Tab label="Anonymous" component={Link} to={"/map"}/>
                            </Tabs>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
};

const mapStateToProps = (state: AppState) => ({
    user: state.users.appUser,
});

export default connect(mapStateToProps)(Landing);