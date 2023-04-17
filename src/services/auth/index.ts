import axios from '../axios';
import { CommandResponse } from '../types';
import { LoginCommand, LoginResponse, SignupCommand } from './types';
class AuthService {

    async signup(command: SignupCommand, ct?: AbortSignal) {
        const response = await axios.post<CommandResponse<LoginCommand, LoginResponse>>('/Users/Signup', command, { signal: ct })
        return response.data;
    }

    async login(command: LoginCommand, ct?: AbortSignal) {
        const response = await axios.post<CommandResponse<LoginCommand, LoginResponse>>('/Users/Login', command, { signal: ct })
        return response.data;
    }
}

const authService = new AuthService();
export default authService;