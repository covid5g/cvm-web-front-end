import {fetchMarkers, fetchPlace} from "../helpers/api-calls";
import MapPosition from "../types/MapPosition";
import MapMarker from "../types/MapMarker";
import {addMapMarkers, setMarkersLoaded, setPlaces, setPlacesLoaded} from "../actions/map";
import {GooglePlaceEntry} from "../types/GooglePlaceEntry";

export const fetchMapMarkersThunk = (position: MapPosition) => (dispatch: (arg0: any) => void) => {
    dispatch(setMarkersLoaded());
    fetchMarkers(position).then((markers: Array<MapMarker>) => {
        dispatch(addMapMarkers(markers));
    }).catch(() => {
        alert("Could not load markers")
    });
};
export const fetchPlacesThunk = (position: MapPosition) => (dispatch: (arg0: any) => void) => {
    const placeTypes = {
        pharmacy: {key: "pharmacies", radius: 500},
        grocery_or_supermarket: {key: "stores", radius: 500},
        hospital: {key: "hospitals", radius: 2000}
    };
    dispatch(setPlacesLoaded());
    for (const place in placeTypes) {
        // @ts-ignore
        fetchPlace(position, place, placeTypes[place].radius).then((places: Array<GooglePlaceEntry>) => {
            // @ts-ignore
            dispatch(setPlaces(places, placeTypes[place].key));
        }).catch((error) => {
            console.log(error)
        });
    }
};