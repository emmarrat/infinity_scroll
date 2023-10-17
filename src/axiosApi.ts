import axios from "axios";

const axiosApi = axios.create({
    baseURL: 'https://dummyjson.com'
});

export default axiosApi;