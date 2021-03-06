// @ts-ignore
import User, {LoginFormUser, RegisterFormUser} from "./User";
import MapMarker from "./MapMarker";
import MapPosition from "./MapPosition";
import {DiseaseData} from "./DiseaseData";
import {GooglePlaceEntry} from "./GooglePlaceEntry";

export const SUBMIT_USER_FORM = "SUBMIT_USER_FORM";
export const FAIL_SUBMIT_USER_FORM = "FAIL_SUBMIT_USER_FORM";
export const SUCCESS_SUBMIT_USER_FORM = "SUCCESS_SUBMIT_USER_FORM";
export const LOGIN_USER = "LOGIN_USER";
export const UPDATE_LOGIN_FORM = "UPDATE_LOGIN_FORM";
export const UPDATE_REGISTER_FORM = "UPDATE_REGISTER_FORM";
export const SET_CHECKUP_FIELD = "SET_CHECKUP_FIELD";

export interface SubmitUserForm {
    type: typeof SUBMIT_USER_FORM
}

export interface FailSubmitUserForm {
    type: typeof FAIL_SUBMIT_USER_FORM,
    message: string | null
}

export interface SuccessSubmitUserForm {
    type: typeof SUCCESS_SUBMIT_USER_FORM
}

export interface LoginUser {
    type: typeof LOGIN_USER,
    user: User
}

export interface UpdateLoginForm {
    type: typeof UPDATE_LOGIN_FORM,
    user: LoginFormUser
}

export interface UpdateRegisterForm {
    type: typeof UPDATE_REGISTER_FORM,
    user: RegisterFormUser
}

export interface SetCheckupField {
    type: typeof SET_CHECKUP_FIELD
    category: string
    question: string
    points: number
    isTrue: boolean
}

export const SET_CHECKUP_DONE = "SET_CHECKUP_DONE";

export interface SetCheckupDone {
    type: typeof SET_CHECKUP_DONE
}

export type UserTypes =
    | SubmitUserForm
    | SuccessSubmitUserForm
    | FailSubmitUserForm
    | LoginUser
    | UpdateLoginForm
    | UpdateRegisterForm
    | SetCheckupField
    | SetCheckupDone


export const ADD_MAP_MARKERS = "ADD_MAP_MARKERS";
export const SET_MAP_ZOOM = "SET_MAP_ZOOM";
export const SET_MAP_BOUNDS = "SET_MAP_BOUNDS";
export const SET_MAP_POSITION = "SET_MAP_POSITION";
export const SET_MARKERS_LOADED = "SET_MARKERS_LOADED";

export interface SetMarkersLoaded {
    type: typeof SET_MARKERS_LOADED
}

export interface AddMapMarkers {
    type: typeof ADD_MAP_MARKERS
    markers: Array<MapMarker>
}

export interface SetMapZoom {
    type: typeof SET_MAP_ZOOM
    zoom: number
}

export interface SetMapBounds {
    type: typeof SET_MAP_BOUNDS
    bounds: Array<number>
}

export interface SetMapPosition {
    type: typeof SET_MAP_POSITION
    position: MapPosition
}

export const SET_PLACES_LOADED = "SET_PLACES_LOADED";
export const SET_PLACES = "SET_PLACES";

export interface SetPlacesLoaded {
    type: typeof SET_PLACES_LOADED
}

export interface SetPlaces {
    type: typeof SET_PLACES
    hospitals: Array<GooglePlaceEntry> | null,
    stores: Array<GooglePlaceEntry> | null,
    pharmacies: Array<GooglePlaceEntry> | null
}

export type MapTypes =
    | AddMapMarkers
    | SetMapZoom
    | SetMapBounds
    | SetMapPosition
    | SetMarkersLoaded
    | SetPlacesLoaded
    | SetPlaces

export const SET_DISEASE_DATA = "SET_DISEASE_DATA";
export const SET_DISEASE_DATA_LOADED = "SET_DISEASE_DATA_LOADED";

export interface SetDiseaseData {
    type: typeof SET_DISEASE_DATA,
    data: DiseaseData
}

export interface SetDiseaseDataLoaded {
    type: typeof SET_DISEASE_DATA_LOADED,
}

export const SET_COUNTY = "SET_COUNTY";
export const SET_COUNTY_LOADED = "SET_COUNTY_LOADED";

export interface SetCounty {
    type: typeof SET_COUNTY,
    county: string
}

export interface SetCountyLoaded {
    type: typeof SET_COUNTY_LOADED,
}

export type DataType =
    | SetDiseaseData
    | SetDiseaseDataLoaded
    | SetCounty
    | SetCountyLoaded
