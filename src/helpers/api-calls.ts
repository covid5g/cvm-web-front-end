import User, {LoginFormUser} from "../types/User";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.trim() : null;

let authenticateUserFunction;

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
} else {
    authenticateUserFunction = async (user: LoginFormUser): Promise<User> => {
        const response = await axios.post(apiUrl + 'user/login', user);
        return response.data.user
    };
}


export const authenticateUser = authenticateUserFunction;