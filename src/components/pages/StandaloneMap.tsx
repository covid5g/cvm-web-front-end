import React from "react";
import Map from "../Map";
import {Grid} from "@material-ui/core";

const StandaloneMap = () => {
    const mapStyle = {
        height: "100vh",
        width: "100%"
    };

    return <Grid container style={mapStyle}>
        <Map/>
    </Grid>
};

export default StandaloneMap