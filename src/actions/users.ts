import User, {LoginFormUser} from "../types/User";
import {
    CHANGE_USER_IN_FORM,
    CLOSE_USER_MODAL,
    FAIL_SUBMIT_USER_FORM,
    LOGIN_USER,
    SUBMIT_USER_FORM,
    UPDATE_LOGIN_FORM
} from "../types/actions";

export function closeUserModal() {
    return {
        type: CLOSE_USER_MODAL
    }
}

export function updateUserInForm(user: User) {
    return {
        type: CHANGE_USER_IN_FORM,
        user
    }
}

export function submitUserForm() {
    return {
        type: SUBMIT_USER_FORM
    }
}

export function failUserForm() {
    return {
        type: FAIL_SUBMIT_USER_FORM
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