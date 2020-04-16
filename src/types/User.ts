export default interface User {
    userId: string
    email: string
    needsCheckup: boolean
}

export interface LoginFormUser {
    email: string,
    password: string
}

export interface RegisterFormUser {
    email: string,
    password: string,
    passwordConfirm: string
}