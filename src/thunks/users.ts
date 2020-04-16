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
            dispatch(loginUser({email: response.res.email, userId: response.res.id, needsCheckup: true}));
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
            dispatch(loginUserThunk(registerFormUser))
        }
    }).catch(() => {
        dispatch(failUserForm())
    });
};

// export const setCheckupDoneThunk = (score: number) => (dispatch: (arg0: any) => void) => {
//     dispatch(submitUserForm());
//     registerUser(registerFormUser).then((response) => {
//         if (response.err) {
//             dispatch(failUserForm(response.res))
//         } else {
//             dispatch(loginUserThunk(registerFormUser))
//         }
//     }).catch(() => {
//         dispatch(failUserForm())
//     });
// };