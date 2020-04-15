import {authenticateUser, registerUser} from "../helpers/api-calls";
import User, {LoginFormUser, RegisterFormUser} from "../types/User";
import {
    failUserForm,
    loginUser,
    submitUserForm,
} from "../actions/users";

export const loginUserThunk = (loginFormUser: LoginFormUser) => (dispatch: (arg0: any) => void) => {
    dispatch(submitUserForm());
    authenticateUser(loginFormUser).then((user: User) => {
        dispatch(loginUser(user));
    }).catch(() => {
        dispatch(failUserForm())
    });
};

export const registerUserThunk = (registerFormUser: RegisterFormUser) => (dispatch: (arg0: any) => void) => {
    dispatch(submitUserForm());
    registerUser(registerFormUser).then((user: User) => {
        dispatch(loginUser(user));
    }).catch(() => {
        dispatch(failUserForm())
    });
};