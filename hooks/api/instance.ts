import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

export const setClientHeaders = (token: string) => {
  instance.interceptors.request.use(function (config: AxiosRequestConfig<any>) {
    if (config.headers) {
      config.headers.Authorization = `${token}`;
      return config;
    }
    return config;
  });
};

export default instance;
