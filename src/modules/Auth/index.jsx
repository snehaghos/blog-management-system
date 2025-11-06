import { lazy } from "react";
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));

export {
  Login,
  Register,
};
