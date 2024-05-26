import React from "react";
import { Outlet, Navigate, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import secureLocalStorage from "react-secure-storage";

function ResetPassGuard({ children }) {
  const [spinner, setSpinner] = React.useState(true);
  const [auth, setauth] = React.useState(false);
  const { token, email } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/auth/link/genreate/${token}`
        );
        secureLocalStorage.setItem("resetEmail", email);
        setauth(await response.json());
        setSpinner(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return spinner ? <Spinner /> : auth ? <Outlet /> : <Navigate to="/login" />;
}

export default ResetPassGuard;
