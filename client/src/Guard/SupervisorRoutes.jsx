import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "./Spinner";
import secureLocalStorage from "react-secure-storage";

function SupervisorRoutes({ children }) {
  const [spinner, setSpinner] = React.useState(true);
  const [auth, setauth] = React.useState(false);
  const [supervisor, setsupervisor] = React.useState(false);

  React.useEffect(() => {
    if (secureLocalStorage.getItem("auth")) {
      setSpinner(false);
      setauth(true);
      setsupervisor(false);
    } else {
      if (secureLocalStorage.getItem("supervisor")) {
        setSpinner(false);
        setauth(false);
        setsupervisor(true);
      } else {
        setSpinner(false);
        setauth(false);
        setsupervisor(false);
      }
    }
  }, []);

  return spinner ? (
    <Spinner />
  ) : auth ? (
    <Navigate to="/" />
  ) : supervisor ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
}

export default SupervisorRoutes;
