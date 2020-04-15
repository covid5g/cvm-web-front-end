import {DiseaseData} from "../types/DiseaseData";
import {SET_COUNTY, SET_COUNTY_LOADED, SET_DISEASE_DATA, SET_DISEASE_DATA_LOADED} from "../types/actions";

export function setDiseaseData(data: DiseaseData) {
    return {
        type: SET_DISEASE_DATA,
        data
    }
}

export function setDiseaseDataLoaded() {
    return {
        type: SET_DISEASE_DATA_LOADED,
    }
}

export function setCounty(county: string) {
    return {
        type: SET_COUNTY,
        county
    }
}

export function setCountyLoaded() {
    return {
        type: SET_COUNTY_LOADED,
    }
}