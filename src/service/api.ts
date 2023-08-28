import axios from 'axios';

const axiosInstance = axios.create({ baseURL: `https://www.omdbapi.com/` });

export default axiosInstance;
