import React, {useState} from "react";
import {makeStyles} from "@material-ui/core";
import User from "../../types/User";
import {AppState} from "../../store"
import {connect} from "react-redux";
import {Redirect} from "react-router-dom"
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CheckupField from "../CheckupField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

// noinspection TypeScriptValidateJSTypes
const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 500,
        width: 500,
        margin: theme.spacing(2)
    },
    cardContent: {
        //height: "100%"
    },
    fixForWidth: {
        //maxWidth: "100%"
    }
}));

const questions = {
    general: [
        {
            "question": "Travel to or residence in a location reporting community transmission of COVID-19",
            "points": 10
        },
        {
            "question": "Having been in contact with a confirmed or probable COVID-19 case",
            "points": 10
        },
        {
            "question": "Required hospitalization",
            "points": 10
        },
        {
            "question": "No alternative diagnosis that fully explains the clinical presentation",
            "points": 10
        }
    ],
    symptoms: [
        {
            "displayName": "Fever",
            "value": false,
            "points": 10
        },
        {
            "displayName": "Dry Cough",
            "value": false,
            "points": 10
        },
        {
            "displayName": "Shortness of Breath",
            "value": false,
            "points": 10
        },
        {
            "displayName": "Fatigue",
            "value": false,
            "points": 10
        },
        {
            "displayName": "Runny Nose",
            "value": false,
            "points": 10
        },
        {
            "displayName": "Headache",
            "value": false,
            "points": 10
        }
    ],
    immediate: [
        {
            "question": "Sever difficulty breathing",
            "points": 10
        },
        {
            "question": "Showing blue-coloured lips or face",
            "points": 10
        },
        {
            "question": "Severe chest pain",
            "points": 10
        },
        {
            "question": "Severe dizziness or lightheadedness",
            "points": 10
        },
        {
            "question": "Feeling confused",
            "points": 10
        },
        {
            "question": "Having a very hard time waking up",
            "points": 10
        },
        {
            "question": "Losing consciousness",
            "points": 10
        },
        {
            "question": "New slurred speech",
            "points": 10
        },
        {
            "question": "New seizure",
            "points": 10
        }
    ],
    suspect: [
        {
            "question": "Chronic lung disease",
            "points": 10
        },
        {
            "question": "Congestive heart failure",
            "points": 10
        },
        {
            "question": "Diabetes with complications",
            "points": 10
        },
        {
            "question": "Neurologic conditions",
            "points": 10
        },
        {
            "question": "Weakened immune system",
            "points": 10
        },
        {
            "question": "Kidney failure",
            "points": 10
        },
        {
            "question": "Liver cirrhosis",
            "points": 10
        },
        {
            "question": "Extreme obesity",
            "points": 10
        }
    ],
    urgent: [
        {
            "question": "Moderate to severe difficulty breathing",
            "points": 10
        },
        {
            "question": "Unable to speak full sentences",
            "points": 10
        },
        {
            "question": "Signs of coughing up blood (more than 1 teaspoon)",
            "points": 10
        },
        {
            "question": "Signs of low blood pressure",
            "points": 10
        }
    ]
};


interface LandingProps {
    user: User | null,
    checkupFields: {}
}

const Checkup = ({user, checkupFields}: LandingProps) => {
    const classes = useStyles();
    const [page, setPage] = useState("general");

    if (user === null) {
        return <Redirect to="/user"/>
    }

    const generalPage = (<React.Fragment>
        <Grid item className={classes.fixForWidth}>
            <Typography variant={"h5"}>
                General
            </Typography>
        </Grid>
        {questions.general.map((entry) => {
            return (
                <CheckupField question={entry.question} points={entry.points} category={"general"}
                              key={"general-" + entry.question}/>);
        })}
        <Grid item className={classes.fixForWidth}>
            <Typography variant={"h5"}>
                Symptoms
            </Typography>
        </Grid>
        {questions.symptoms.map((entry) => {
            return (<CheckupField question={entry.displayName} points={entry.points}
                                  category={"symptoms"} key={"symptoms-" + entry.displayName}/>);
        })}
    </React.Fragment>);

    let categoryToUse = "suspect" as "immediate" | "urgent" | "suspect";
    let generalScore = 0, symptomScore = 0;
    if (checkupFields.hasOwnProperty("general")) {
        // @ts-ignore
        for (const question of checkupFields.general) {
            // @ts-ignore
            if (checkupFields[question].isTrue) {
                // @ts-ignore
                generalScore += checkupFields[question].points
            }
        }
    }
    if (checkupFields.hasOwnProperty("symptoms")) {
        // @ts-ignore
        for (const question of checkupFields.symptoms) {
            // @ts-ignore
            if (checkupFields[question].isTrue) {
                // @ts-ignore
                symptomScore += checkupFields[question].points
            }
        }
    }

    if (symptomScore >= 20 && generalScore >= 10) {
        categoryToUse = "immediate"
    } else if (generalScore >= 10) {
        categoryToUse = "urgent"
    }

    const targetPage = (<React.Fragment>
        <Grid item className={classes.fixForWidth}>
            <Typography variant={"h5"}>

            </Typography>
        </Grid>
        <Grid item className={classes.fixForWidth}>
            <Typography variant={"h5"}>
                {categoryToUse.replace(/^\w/, c => c.toUpperCase())}
            </Typography>
        </Grid>
        {questions[categoryToUse].map((entry) => {
            return (<CheckupField question={entry.question} points={entry.points}
                                  category={categoryToUse} key={categoryToUse + "-" + entry.question}/>);
        })}
    </React.Fragment>);

    return <Grid container justify={"space-evenly"}>
        <Grid item className={classes.card}>
            <Card className={classes.cardContent}>
                <CardContent className={classes.cardContent}>
                    <Grid container direction={"column"} className={classes.cardContent}>
                        <Grid item className={classes.fixForWidth}>
                            <Typography variant={"h4"}>
                                Checkup
                            </Typography>
                        </Grid>
                        {page === "general" && generalPage}
                        {page === "targeted" && targetPage}
                        {page === "done" && <Redirect to={"/"}/>}
                    </Grid>
                </CardContent>
                <CardActions>
                    {page === "general" && (<Button variant={"contained"} onClick={() => {
                        setPage("targeted")
                    }}>
                        Next
                    </Button>)}
                    {page === "targeted" && (<Button variant={"contained"} onClick={() => {
                        setPage("done")
                    }}>
                        Done
                    </Button>)}
                </CardActions>
            </Card>
        </Grid>
    </Grid>
};

const mapStateToProps = (state: AppState) => ({
    user: state.users.appUser,
    checkupFields: state.users.checkupFields
});

export default connect(mapStateToProps)(Checkup);