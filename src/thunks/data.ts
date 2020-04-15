import {fetchDiseaseData, fetchReverseGeo} from "../helpers/api-calls";
import {setCounty, setCountyLoaded, setDiseaseData, setDiseaseDataLoaded} from "../actions/data";
import {DiseaseData} from "../types/DiseaseData";
import MapPosition from "../types/MapPosition";

export const fetchDiseaseDataThunk = () => (dispatch: (arg0: any) => void) => {
    dispatch(setDiseaseDataLoaded());
    fetchDiseaseData().then((data: DiseaseData) => {
        dispatch(setDiseaseData(data));
    }).catch(() => {
    });
};

export const fetchReverseGeoThunk = (position: MapPosition) => (dispatch: (arg0: any) => void) => {
    dispatch(setCountyLoaded());
    fetchReverseGeo(position).then((data: string) => {
        dispatch(setCounty(data));
    }).catch(() => {
    });
};