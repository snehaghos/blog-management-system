import { useNavigate } from "react-router-dom";
import axiosClient from "../../library/axios";

export const registerService = async (payLoad) => {
  try {
    const res = await axiosClient.post("/api/auth/register", payLoad);
    return res.data;
  } catch (error) {
    console.error(error.response.data);
  }
};

export const loginService = async (payLoad) => {
  try {
    const res = await axiosClient.post("/api/auth/login", payLoad);
    localStorage.setItem("accessToken", res.data.data.accessToken);
    return res.data;
  } catch (error) {
    console.error(error.response.data);
  }
};

export const logoutService = async () => {
  try {
    const res = await axiosClient.post("/api/auth/logout");
    console.log(res.data);
    localStorage.removeItem("accessToken");
    return res.data;
  } catch (error) {
    console.error(error.response.data);
  }
};
