import { AxiosRequestConfig } from 'axios';
import axiosInstance from './api';

interface IRequestConfig {
  params?: object;
  body?: object;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
}

const getParams = (params = {}) => {
  let queryParams = '';

  if (Object.keys(params).length > 0) {
    queryParams = `&${Object.entries(params)
      .map(([key, value]) => {
        return `${key}=${value}`;
      })
      .join('&')}`;
  }

  return queryParams;
};

export default {
  makeRequest: async <T>(parameters: IRequestConfig, endpoint: string): Promise<T> => {
    return new Promise((resolve, reject) => {
      const { method, params = {} } = parameters;
      const { VITE_API_KEY } = import.meta.env;

      const queryParams = getParams(params);

      const config: AxiosRequestConfig = {
        method,
        url: `${endpoint}?apikey=${VITE_API_KEY}${queryParams}`,
      };

      axiosInstance(config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
