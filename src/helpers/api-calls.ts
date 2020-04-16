import User, {LoginFormUser, RegisterFormUser} from "../types/User";
import axios from "axios";
import MapMarker from "../types/MapMarker";
import MapPosition from "../types/MapPosition";
import PlaceMapPosition from "../types/PlaceMapPosition";
import {GooglePlaceEntry} from "../types/GooglePlaceEntry";
import PlaceMapResponse from "../types/PlaceMapResponse";

const apiUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.trim() : null;

let authenticateUserFunction, registerUserFunction;
let fetchMarkersFunction, checkBusyFunction: (positions: Array<PlaceMapPosition>) => Promise<Array<PlaceMapResponse>>;

interface ResponseInterface {
    err: boolean,
    res: any
}

if (!apiUrl) {

    let users = [
        {
            userId: "1",
            email: "test@test.com",
            needsCheckup: false
        },
        {
            userId: "2",
            email: "test2@test.com",
            needsCheckup: true
        }
    ];

    authenticateUserFunction = (loginFormUser: LoginFormUser): Promise<ResponseInterface> => {
        const foundUser = users.find((user: User) => user.email === loginFormUser.email);
        return new Promise((resolve, reject) => setTimeout(() => {
            if (foundUser) {
                resolve({res: true, err: false})
            }
            reject()
        }, 500))
    };

    registerUserFunction = (registerFormUser: RegisterFormUser): Promise<ResponseInterface> => {
        const foundUser = users.find((user: User) => user.email === registerFormUser.email);
        return new Promise((resolve, reject) => setTimeout(() => {
            if (foundUser) {
                reject("User already exists");
            } else {
                const newUser = {userId: "0", email: registerFormUser.email, needsCheckup: true};
                users.push(newUser);
                resolve({res: true, err: false})
            }
        }, 500))
    };

    let markers = [
        {latitude: 45.760534, longitude: 21.218452},
        {latitude: 45.757570, longitude: 21.226778},
        {latitude: 45.434121, longitude: 12.338134},
        {latitude: 45.435024, longitude: 12.336911},
        {latitude: 45.435239, longitude: 12.340022}
    ] as Array<MapMarker>;

    fetchMarkersFunction = (): Promise<Array<MapMarker>> => {
        return new Promise<Array<MapMarker>>((resolve) => setTimeout(() => {
            resolve(markers)
        }, 500))
    };

    const statuses = ["ok", "some", "crowded"];
    checkBusyFunction = (positions: Array<PlaceMapPosition>): Promise<Array<PlaceMapResponse>> => {
        const result = [] as Array<PlaceMapResponse>;
        for (const position of positions) {
            result.push({
                identifier: position.identifier,
                status: statuses[Math.floor(Math.random() * statuses.length)]
            } as PlaceMapResponse)
        }
        return new Promise((resolve, reject) => setTimeout(() => {
            resolve(result);
        }, 500))
    };

} else {
    authenticateUserFunction = async (user: LoginFormUser): Promise<ResponseInterface> => {
        const response = await axios.post(apiUrl + 'user/login', user);
        return response.data
    };

    registerUserFunction = async (user: RegisterFormUser): Promise<ResponseInterface> => {
        const response = await axios.post(apiUrl + 'user/register', user);
        return response.data
    };

    fetchMarkersFunction = async (position: MapPosition): Promise<Array<MapMarker>> => {
        const response = await axios.post(apiUrl + 'user/position/nearby', position);
        return response.data.points
    };

    checkBusyFunction = async (position: Array<PlaceMapPosition>): Promise<Array<PlaceMapResponse>> => {
        const response = await axios.post(apiUrl + 'user/positions/check/busy', position);
        return response.data
    };
}

export const fetchDiseaseData = async () => {
    const response = await axios.get("https://covid19.geo-spatial.org/api/dashboard/getCasesByCounty");
    return response.data.data;
};

export const fetchReverseGeo = async (position: MapPosition) => {
    const apiKey = process.env.REACT_APP_GOOGLE_KEY || '';
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.latitude},${position.longitude}&key=${apiKey}`);
    for (const result of response.data.results) {
        for (const addressComponent of result.address_components) {
            if (addressComponent.types.includes("administrative_area_level_1")) {
                return addressComponent.short_name;
            }
        }
    }
    return "NA";
};

export const fetchPlace = async (position: MapPosition, placeType: string, radius: number) => {
    const apiKey = process.env.REACT_APP_GOOGLE_KEY || '';
    const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.latitude},${position.longitude}&radius=2000&type=${placeType}&key=${apiKey}`);

    const checkPositions = await checkBusyFunction(response.data.results.map((entry: GooglePlaceEntry): PlaceMapPosition => {
        return {
            identifier: entry.place_id,
            latitude: entry.geometry.location.lat,
            longitude: entry.geometry.location.lng
        } as PlaceMapPosition
    }));

    for (const checkResponse of checkPositions) {
        const foundEntry = response.data.results.find((entry: GooglePlaceEntry) => checkResponse.identifier === entry.place_id);
        foundEntry.iconStatus = checkResponse.status
    }

    return response.data.results;
};

export const authenticateUser = authenticateUserFunction;
export const fetchMarkers = fetchMarkersFunction;
export const registerUser = registerUserFunction;