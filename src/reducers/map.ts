import {
    ADD_MAP_MARKERS,
    MapTypes,
    SET_MAP_BOUNDS,
    SET_MAP_POSITION,
    SET_MAP_ZOOM,
    SET_MARKERS_LOADED, SET_PLACES, SET_PLACES_LOADED
} from "../types/actions";
import MapMarker from "../types/MapMarker";
import MapPosition from "../types/MapPosition";
import {GooglePlaceEntry} from "../types/GooglePlaceEntry";

export interface MapState {
    markersLoaded: boolean
    markers: Array<MapMarker>
    bounds: Array<number>
    zoom: number
    userPosition: MapPosition | null,
    placesLoaded: boolean,
    hospitals: Array<GooglePlaceEntry> | null,
    stores: Array<GooglePlaceEntry> | null,
    pharmacies: Array<GooglePlaceEntry> | null
}

const initialState: MapState = {
    markersLoaded: false,
    markers: [],
    bounds: [],
    zoom: 15,
    userPosition: null,
    placesLoaded: false,
    hospitals: null,
    stores: null,
    pharmacies: null
};

export default function mapReducer(state = initialState, action: MapTypes) {
    switch (action.type) {
        case SET_MARKERS_LOADED:
            return {
                ...state,
                markersLoaded: true
            };
        case ADD_MAP_MARKERS:
            return {
                ...state,
                markers: [...action.markers, ...(state.markers !== null ? state.markers : [])]
            };
        case SET_PLACES_LOADED:
            return {
                ...state,
                placesLoaded: true
            };
        case SET_PLACES:
            return {
                ...state,
                hospitals: action.hospitals ? action.hospitals : state.hospitals,
                stores: action.stores ? action.stores : state.stores,
                pharmacies: action.pharmacies ? action.pharmacies : state.pharmacies,
            };
        case SET_MAP_BOUNDS:
            return {
                ...state,
                bounds: [...action.bounds]
            };
        case SET_MAP_POSITION:
            return {
                ...state,
                userPosition: {...action.position}
            };
        case SET_MAP_ZOOM:
            return {
                ...state,
                zoom: action.zoom
            };
        default:
            return state
    }
}