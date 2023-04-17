export interface SignupCommand {
    username: string;
    password: string;
    confirmPassword: string;
    name: string;
    email: string;
    mobile: string;
    role: string;
}

export interface LoginCommand {
    username: string;
    password: string;
}
export interface LoginResponse {
    accessToken: string;
    expiry: Date;
}

export interface TokenData {
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid': number;
    nameid: string;
    given_name: string;
    email: string;
    role: string;
    mobile: string;
}