import User, {LoginFormUser, RegisterFormUser} from "../types/User";
import {
    FAIL_SUBMIT_USER_FORM,
    LOGIN_USER, SET_CHECKUP_FIELD,
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
    checkupFields: {}
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
    },
    checkupFields: {}
};

export default function usersReducer(state = initialState, action: UserTypes) {
    switch (action.type) {
        case SET_CHECKUP_FIELD:
            // @ts-ignore
            const currentCategoryValues = state.checkupFields[action.category] ? state.checkupFields[action.category] : {};
            return {
                ...state,
                checkupFields: {
                    ...state.checkupFields,
                    [action.category]: {
                        ...currentCategoryValues,
                        [action.question]: {
                            points: action.points,
                            isTrue: action.isTrue
                        }
                    }
                }
            };
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
                message: action.message === null ? "Operation failed" : action.message
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