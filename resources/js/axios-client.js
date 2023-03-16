import axios from 'axios'

axios.defaults.baseURL = `${document.querySelector('meta[name="base_url"]').content}/api/`;
// Add a request interceptor

// Add a response interceptor
axios.interceptors.request.use(
    config => {
        if (!config.headers.Authorization) {

            const token = JSON.parse(localStorage.getItem("auth-user"))?.token;

            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    error => Promise.reject(error)
);

export default axios
