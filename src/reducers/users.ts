import User, {LoginFormUser, RegisterFormUser} from "../types/User";
import {
    FAIL_SUBMIT_USER_FORM,
    LOGIN_USER,
    SUBMIT_USER_FORM,
    SUCCESS_SUBMIT_USER_FORM,
    UPDATE_LOGIN_FORM, UPDATE_REGISTER_FORM,
    UserTypes
} from "../types/actions";

export interface UsersState {
    appUser: User | null
    isSubmitting: boolean,
    isSuccess: boolean,
    message: string,
    isModalOpen: boolean
    loginForm: LoginFormUser,
    registerForm: RegisterFormUser
}

const initialState: UsersState = {
    appUser: null,
    isSubmitting: false,
    isSuccess: false,
    message: "",
    isModalOpen: false,
    loginForm: {
        email: "",
        password: ""
    },
    registerForm: {
        email: "",
        password: "",
        passwordConfirm: ""
    }
};

export default function usersReducer(state = initialState, action: UserTypes) {
    switch (action.type) {
        case SUBMIT_USER_FORM:
            return {
                ...state,
                isSubmitting: true,
            };
        case SUCCESS_SUBMIT_USER_FORM:
            return {
                ...state,
                isSubmitting: false,
                isSuccess: true,
                message: "Operation successful"
            };
        case FAIL_SUBMIT_USER_FORM:
            return {
                ...state,
                isSubmitting: false,
                isSuccess: false,
                message: "Operation failed"
            };
        case UPDATE_LOGIN_FORM:
            return {
                ...state,
                loginForm: action.user
            };
        case UPDATE_REGISTER_FORM:
            return {
                ...state,
                registerForm: action.user
            };
        case LOGIN_USER:
            return {
                ...state,
                appUser: action.user,
                isSubmitting: false,
                isSuccess: false,
                message: "",
            };
        default:
            return state
    }
}