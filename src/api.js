//export const baseUrl = "http://localhost:8000/api";
export const baseUrl = 'https://api.staging.levrfinance.com/api/'

const authUrl = `/dj-rest-auth`

export const LOGIN = `${authUrl}/login/`
export const RESET = `${authUrl}/password/reset/`
export const LOAN_APPLICATION = `/loan_applications/`
export const ORGANIZATION = '/organizations/'
export const USER = `${authUrl}/user/`
export const USERS = `/users/`
