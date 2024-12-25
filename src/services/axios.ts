import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { config } from "../../constant";

const instance: AxiosInstance = axios.create({
  baseURL: config.baseAPI,
});

// Add request interceptor
instance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    try {
      // Ensure correct content type for FormData
      if (config.data instanceof FormData) {
        config.headers.set("Content-Type", "multipart/form-data");
      } else {
        config.headers.set("Content-Type", "application/json");
      }

      // Get token from localStorage and set Authorization header
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
    } catch (error) {
      return Promise.reject(error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface ApiResponse<T = any> {
  data: {
    data: T;
    message: string;
    success: boolean;
  };
  message: string;
  status: string;
}

// Add response interceptor to set the response type
instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { instance as http };
