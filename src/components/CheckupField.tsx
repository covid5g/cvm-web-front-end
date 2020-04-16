import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React from "react";
import Radio from "@material-ui/core/Radio";
import {AppState} from "../store";
import {connect} from "react-redux";
import {setCheckupField} from "../actions/users";

interface CheckupFieldProps {
    question: string,
    points: number,
    category: string
    dispatch: (arg0: any) => void
}

const CheckupField = ({question, points, category, dispatch}: CheckupFieldProps) => {

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "0") {
            dispatch(setCheckupField(category, question, points, false));
        } else {
            dispatch(setCheckupField(category, question, points, true));
        }
    };

    return (
        <Grid container direction={"column"}>
            <Grid item>
                <Typography>
                    {question}
                </Typography>
            </Grid>
            <Grid item>
                <FormControl component="fieldset">
                    <RadioGroup row aria-label="position" name="position" defaultValue="0" onChange={onChange}>
                        <FormControlLabel value="1" control={<Radio color="primary"/>} label="Yes"/>
                        <FormControlLabel value="0" control={<Radio color="primary"/>} label="No"/>
                    </RadioGroup>
                </FormControl>
            </Grid>

        </Grid>
    )
};

const mapStateToProps = (state: AppState) => ({
    checkupFields: state.users.checkupFields,
});

export default connect(mapStateToProps)(CheckupField);