import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseURL || 'http://localhost:5001/api';

export default axios;
