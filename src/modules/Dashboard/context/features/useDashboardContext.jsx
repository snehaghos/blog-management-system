import { useContext } from "react";
import DashboardContext from "../DashboardContext";

const useDashboardContext = () => {
  return useContext(DashboardContext);
};

export default useDashboardContext;
