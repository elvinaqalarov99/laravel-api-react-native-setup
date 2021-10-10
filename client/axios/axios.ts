import axios, { AxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";

const instance = axios.create({
  baseURL: "http://192.168.0.106:8000/api/v1",
  headers: {
    Accept: "application/json",
  },
});

// home: 192.168.0.106 | workplace: 192.168.31.44

instance.interceptors.request.use(
  async function (config: AxiosRequestConfig) {
    const token = await SecureStore.getItemAsync("user-token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
