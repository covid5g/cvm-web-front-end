export default interface User {
    userId: number
    email: string
    needsCheckup: boolean
}

export interface LoginFormUser {
    email: string,
    password: string
}