import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import {AppState} from "../store";
import {connect} from "react-redux";
import {DataState} from "../reducers/data";
import {CountyDiseaseData} from "../types/CountyDiseaseData";
import {Chip} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

interface DiseaseDataWidgetProps {
    data: DataState
}

const DiseaseDataWidget = ({data}: DiseaseDataWidgetProps) => {
    if (data.diseaseData === null || data.diseaseData.data === undefined || data.county === null) {
        return <CircularProgress size={24}/>
    }

    const dataForLocation = data.diseaseData.data.find((countyData: CountyDiseaseData) => countyData.county_code === data.county);

    if (dataForLocation === undefined) {
        return <CircularProgress size={24}/>
    }

    return <Grid container spacing={1}>
        <Grid item>
            <Chip label={`County: ${dataForLocation.county}`}/>
        </Grid>
        <Grid item>
            <Chip label={`Total: ${dataForLocation.total_county}`}/>
        </Grid>
        <Grid item>
            <Chip label={`Healed: ${dataForLocation.total_healed}`}/>
        </Grid>
        <Grid item>
            <Chip label={`Dead: ${dataForLocation.total_dead}`}/>
        </Grid>
    </Grid>
};

const mapStateToProps = (state: AppState) => ({
    data: state.data,
});

export default connect(mapStateToProps)(DiseaseDataWidget);