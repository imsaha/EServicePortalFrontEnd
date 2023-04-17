import _axios from "axios"
import { useAuthStore } from "../stores/authStore";

const axios = _axios.create({
    baseURL: 'http://localhost:5266/',
    withCredentials: true,
    headers: {
        'x-version': 'v1',
    },
    validateStatus: status => status < 500
})


axios.interceptors.request.use(async config => {
    console.log(config.url)
    const authToken = useAuthStore.getState().auth
    if (!authToken) {
        return config;
    }

    const isTokenValid =
        !!authToken && !!authToken?.expires && new Date(authToken?.expires)?.getTime() >= new Date().getTime();

    if (!isTokenValid) {
        console.log('TODO: Refresh token here!!!')
        useAuthStore.getState().clearAuth();
        return Promise.reject(new Error('Token expired!'));
    }
    config.headers['Authorization'] = `Bearer ${authToken.accessToken}`
    return config;
})

axios.interceptors.response.use(undefined, error => {
    console.log('ERR_INTERCEPT', error);

    if (error.code === "ERR_CANCELED") {
        return Promise.resolve()
    }

    return Promise.reject(error)
})

export default axios;