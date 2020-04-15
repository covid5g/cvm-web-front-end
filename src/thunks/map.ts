import {fetchMarkers} from "../helpers/api-calls";
import MapPosition from "../types/MapPosition";
import MapMarker from "../types/MapMarker";
import {addMapMarkers, setMarkersLoaded} from "../actions/map";

export const fetchMapMarkersThunk = (position: MapPosition) => (dispatch: (arg0: any) => void) => {
    dispatch(setMarkersLoaded());
    fetchMarkers(position).then((markers: Array<MapMarker>) => {
        dispatch(addMapMarkers(markers));
    }).catch(() => {
        alert("Could not load markers")
    });
};