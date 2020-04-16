import User, {LoginFormUser, RegisterFormUser} from "../types/User";
import {
    FAIL_SUBMIT_USER_FORM,
    LOGIN_USER, SET_CHECKUP_FIELD,
    SUBMIT_USER_FORM,
    UPDATE_LOGIN_FORM, UPDATE_REGISTER_FORM
} from "../types/actions";

export function submitUserForm() {
    return {
        type: SUBMIT_USER_FORM
    }
}

export function failUserForm(message: string | null = null) {
    return {
        type: FAIL_SUBMIT_USER_FORM,
        message
    }
}

export function loginUser(user: User) {
    return {
        type: LOGIN_USER,
        user
    }
}

export function updateLoginForm(user: LoginFormUser) {
    return {
        type: UPDATE_LOGIN_FORM,
        user
    }
}

export function updateRegisterForm(user: RegisterFormUser) {
    return {
        type: UPDATE_REGISTER_FORM,
        user
    }
}

export function setCheckupField(category: string, question: string, points: number, isTrue: boolean) {
    return {
        type: SET_CHECKUP_FIELD,
        category,
        question,
        points,
        isTrue
    }
}

export function setCheckupDone() {
    return {

    }
}