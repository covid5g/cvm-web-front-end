import User, {LoginFormUser} from "../types/User";
import axios from "axios";
import MapMarker from "../types/MapMarker";
import MapPosition from "../types/MapPosition";

const apiUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.trim() : null;

let authenticateUserFunction;
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

    fetchMarkersFunction = async (position: MapPosition): Promise<Array<MapMarker>> => {
        const response = await axios.post(apiUrl + 'points/get', position);
        return response.data.points
    }
}


export const authenticateUser = authenticateUserFunction;
export const fetchMarkers = fetchMarkersFunction;