import Axios from 'axios';
import { BASE_URL } from '../env';

Axios.defaults.baseURL = BASE_URL;

export default Axios;
