import User, {LoginFormUser, RegisterFormUser} from "../types/User";
import axios from "axios";
import MapMarker from "../types/MapMarker";
import MapPosition from "../types/MapPosition";

const apiUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.trim() : null;

let authenticateUserFunction, registerUserFunction;
let fetchMarkersFunction;

if (!apiUrl) {

    let users = [
        {
            userId: 1,
            email: "test@test.com",
            needsCheckup: false
        },
        {
            userId: 2,
            email: "test2@test.com",
            needsCheckup: true
        }
    ];

    authenticateUserFunction = (loginFormUser: LoginFormUser): Promise<User> => {
        const foundUser = users.find((user: User) => user.email === loginFormUser.email);
        return new Promise((resolve, reject) => setTimeout(() => {
            if (foundUser) {
                resolve(foundUser)
            }
            reject()
        }, 500))
    };

    registerUserFunction = (registerFormUser: RegisterFormUser): Promise<User> => {
        const foundUser = users.find((user: User) => user.email === registerFormUser.email);
        return new Promise((resolve, reject) => setTimeout(() => {
            if (foundUser) {
                reject("User already exists");
            } else {
                const newUser = {userId: 0, email: registerFormUser.email, needsCheckup: true};
                users.push(newUser);
                resolve(newUser)
            }
        }, 500))
    };

    let markers = [
        {latitude: 45.760534, longitude: 21.218452},
        {latitude: 45.757570, longitude: 21.226778}
    ] as Array<MapMarker>;

    fetchMarkersFunction = (): Promise<Array<MapMarker>> => {
        return new Promise<Array<MapMarker>>((resolve) => setTimeout(() => {
            resolve(markers)
        }, 500))
    }

} else {
    authenticateUserFunction = async (user: LoginFormUser): Promise<User> => {
        const response = await axios.post(apiUrl + 'user/login', user);
        return response.data.user
    };

    registerUserFunction = async (user: RegisterFormUser): Promise<User> => {
        const response = await axios.post(apiUrl + 'user/register', user);
        return response.data.user
    };

    fetchMarkersFunction = async (position: MapPosition): Promise<Array<MapMarker>> => {
        const response = await axios.post(apiUrl + 'points/get', position);
        return response.data.points
    }
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

export const authenticateUser = authenticateUserFunction;
export const fetchMarkers = fetchMarkersFunction;
export const registerUser = registerUserFunction;