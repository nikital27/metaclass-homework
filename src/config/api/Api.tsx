import axios from 'axios';
import {stringify} from 'qs';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_STRAPI_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
  },
  paramsSerializer: (params) => stringify(params),
});

export default apiClient;