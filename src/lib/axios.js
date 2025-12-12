import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;
      if (response.status == 401) {
        localStorage.removeItem("accessToken");
      }
    } catch (e) {
      console.log(e);
      console.error("Axios error:", e.message);
      console.error("Axios config:", e.config);
      console.error("Axios request:", e.request);
    }
    throw error;
  }
);

export default axiosClient;
