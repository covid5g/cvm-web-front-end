import {DataType, SET_COUNTY, SET_COUNTY_LOADED, SET_DISEASE_DATA, SET_DISEASE_DATA_LOADED,} from "../types/actions";
import {DiseaseData} from "../types/DiseaseData";

export interface DataState {
    diseaseDataLoaded: boolean
    diseaseData: DiseaseData | null
    county: string | null
    countryLoaded: boolean
}

const initialState: DataState = {
    diseaseDataLoaded: false,
    diseaseData: null,
    countryLoaded: false,
    county: null
};

export default function dataReducer(state = initialState, action: DataType) {
    switch (action.type) {
        case SET_DISEASE_DATA_LOADED:
            return {
                ...state,
                diseaseDataLoaded: true
            };
        case SET_DISEASE_DATA:
            return {
                ...state,
                diseaseData: action.data
            };
        case SET_COUNTY_LOADED:
            return {
                ...state,
                countryLoaded: true
            };
        case SET_COUNTY:
            return {
                ...state,
                county: action.county
            };
        default:
            return state
    }
}