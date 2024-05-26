import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "./Spinner";
import secureLocalStorage from "react-secure-storage";

function AnalystRoutes({ children }) {
  const [spinner, setSpinner] = React.useState(true);
  const [auth, setauth] = React.useState(false);
  const [admin, setadmin] = React.useState(false);
  const [analyst, setanalyst] = React.useState(false);

  React.useEffect(() => {
    if (secureLocalStorage.getItem("admin")) {
      setSpinner(false);
      setauth(false);
      setanalyst(false);
      setadmin(true);
    } else {
      if (
        secureLocalStorage.getItem("auth") ||
        secureLocalStorage.getItem("supervisor")
      ) {
        setSpinner(false);
        setadmin(false);
        setanalyst(false);
        setauth(true);
      } else {
        if (secureLocalStorage.getItem("analyst")) {
          setSpinner(false);
          setadmin(false);
          setauth(false);
          setanalyst(true);
        } else {
          setSpinner(false);
          setauth(false);
          setadmin(false);
        }
      }
    }
  }, []);

  return spinner ? (
    <Spinner />
  ) : admin ? (
    <Navigate to="/users" />
  ) : analyst ? (
    <Outlet />
  ) : auth ? (
    <Navigate to="/" />
  ) : (
    <Navigate to="/login" />
  );
}

export default AnalystRoutes;
