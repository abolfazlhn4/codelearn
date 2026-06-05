import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
//const baseURL = "http://localhost:8000";

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${baseURL}/api/v1/users/auth/token/refresh/`,
          {},
          {
            withCredentials: true,
          },
        );

        const newAccessToken = res.data.access;

        localStorage.setItem("access_token", newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        if (
          refreshError.response &&
          (refreshError.response.status === 401 || refreshError.response.status === 400)
        ) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("user_phone");
          localStorage.removeItem("user_role");
          window.location.href = "/auth";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
