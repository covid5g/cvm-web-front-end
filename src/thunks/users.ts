import {authenticateUser, registerUser} from "../helpers/api-calls";
import {LoginFormUser, RegisterFormUser} from "../types/User";
import {
    failUserForm,
    loginUser,
    submitUserForm,
} from "../actions/users";

export const loginUserThunk = (loginFormUser: LoginFormUser) => (dispatch: (arg0: any) => void) => {
    dispatch(submitUserForm());
    authenticateUser(loginFormUser).then((response) => {
        if (response.err) {
            dispatch(failUserForm(response.res))
        } else {
            dispatch(loginUser({email: loginFormUser.email, userId: 0, needsCheckup: true}));
        }
    }).catch(() => {
        dispatch(failUserForm())
    });
};

export const registerUserThunk = (registerFormUser: RegisterFormUser) => (dispatch: (arg0: any) => void) => {
    dispatch(submitUserForm());
    registerUser(registerFormUser).then((response) => {
        if (response.err) {
            dispatch(failUserForm(response.res))
        } else {
            dispatch(loginUser({email: registerFormUser.email, userId: 0, needsCheckup: true}));
        }
    }).catch(() => {
        dispatch(failUserForm())
    });
};