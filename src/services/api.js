import axios from 'axios'
import { StorageService } from './storage';

axios.defaults.baseURL = process.env.API_PATH;
//axios.defaults.headers.post['Content-Type']  = 'application/x-www-form-urlencoded';

axios.defaults.headers.post['Content-Type']  = 'application/json';

// If token exists set header
let token = StorageService.getToken();
if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export const ApiService = {
    removeHeader() {
        axios.defaults.headers.common = {}
    },
    get(apiPath) {
        return axios.get(apiPath)
    },
    post(apiPath, data) {
        return axios.post(apiPath, data);
	},
    put(apiPath, data) {
        return axios.put(apiPath, data)
	},
    delete(apiPath) {
        return axios.delete(apiPath)
    },

    /**
     * Perform a custom Axios request.
     *
     * data is an object containing the following properties:
     *  - method
     *  - url
     *  - data ... request payload
     *  - auth (optional)
     *    - username
     *    - password
    **/
    axios() {
        return axios;
    },
}
