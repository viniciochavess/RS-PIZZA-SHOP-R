import { env } from '@/env';
import {Axios} from 'axios';

export const api = new Axios({
    baseURL:`${env.VITE_API_URL}`,
});