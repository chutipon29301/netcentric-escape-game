import Axios from 'axios'

import { BASE_URL } from '../env';
Axios.defaults.baseURL =   `http://${BASE_URL}`;

export default Axios