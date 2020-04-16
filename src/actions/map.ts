import MapMarker from "../types/MapMarker";
import {
    ADD_MAP_MARKERS,
    SET_MAP_BOUNDS,
    SET_MAP_POSITION,
    SET_MAP_ZOOM,
    SET_MARKERS_LOADED,
    SET_PLACES, SET_PLACES_LOADED, SetPlaces
} from "../types/actions";
import MapPosition from "../types/MapPosition";
import {GooglePlaceEntry} from "../types/GooglePlaceEntry";

export function addMapMarkers(markers: Array<MapMarker>) {
    return {
        type: ADD_MAP_MARKERS,
        markers
    }
}

export function setMapZoom(zoom: number) {
    return {
        type: SET_MAP_ZOOM,
        zoom
    }
}

export function setMapBounds(bounds: Array<number>) {
    return {
        type: SET_MAP_BOUNDS,
        bounds
    }
}

export function setMapPosition(position: MapPosition) {
    return {
        type: SET_MAP_POSITION,
        position
    }
}

export function setMarkersLoaded() {
    return {
        type: SET_MARKERS_LOADED
    }
}

export function setPlaces(placesData: Array<GooglePlaceEntry>, placeType: "hospitals" | "stores" | "pharmacies") {
    let result = {
        type: SET_PLACES,
        hospitals: null,
        stores: null,
        pharmacies: null
    } as SetPlaces;
    result[placeType] = placesData;
    console.log(placesData);

    return result;
}

export function setPlacesLoaded() {
    return {
        type: SET_PLACES_LOADED
    }
}