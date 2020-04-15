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
const useStyles = makeStyles({
    card: {
        maxWidth: 500,
        width: 500,
    },
    cardContent: {
        height: "100%"
    },
    fixForWidth: {
        maxWidth: "100%"
    }
});

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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pellentesque purus quis nisi
                        tristique pharetra. Quisque fermentum tristique placerat. Quisque scelerisque dignissim nunc id
                        malesuada. Vivamus sit amet libero maximus, consectetur massa eget, fermentum enim. Donec sit
                        amet nunc in augue molestie ornare sed vel nisl. Vivamus hendrerit interdum augue, cursus
                        fringilla augue porttitor sit amet. Morbi consequat consectetur augue, id maximus urna luctus
                        at. Fusce mauris ex, posuere sit amet quam in, tristique convallis nunc. Pellentesque molestie
                        sodales nibh, at varius lorem malesuada imperdiet.

                        Ut aliquet nunc turpis, posuere aliquet elit fermentum at. Vestibulum ut dolor eget elit
                        lobortis imperdiet. Curabitur a purus eget ante rhoncus molestie in eu odio. Maecenas iaculis
                        sed arcu id fermentum. Quisque pulvinar commodo lacus eu sagittis. Fusce maximus metus in
                        condimentum tincidunt. Quisque eget magna et urna condimentum consequat non et lorem. Orci
                        varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce
                        consectetur iaculis nunc ac mollis. In viverra mattis ornare. Aliquam rhoncus vestibulum
                        condimentum. Morbi et leo massa. Morbi nec dolor eu tellus efficitur sollicitudin. Vivamus
                        aliquet aliquam erat.
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