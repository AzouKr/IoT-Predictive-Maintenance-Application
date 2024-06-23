import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import secureLocalStorage from "react-secure-storage";
import { resetPass } from "../../Hooks/Auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ResetPassword() {
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleResetPass = () => {
    if (password !== "" && confirmpassword !== "") {
      if (password === confirmpassword) {
        resetPass(secureLocalStorage.getItem("resetEmail"), password)
          .then((res) => {
            alert(t("Redirecting to login"));
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert(t("Password do not match"));
      }
    } else {
      alert(t("You must enter password and password confirmation"));
    }
  };

  return (
    <div
      className={`h-[100vh] w-full flex items-center justify-center ${
        theme === LIGHT_THEME ? "bg-[#F3F4F6]" : "bg-[#383854]"
      }`}
    >
      <div
        className={`h-[50vh] w-[70vh] rounded-lg shadow-md ${
          theme === LIGHT_THEME ? "bg-[#E5E7EB]" : "bg-[#2e2e48]"
        }`}
      >
        <h1
          className={`text-[4vh] text-center p-[4vh] ${
            theme === LIGHT_THEME ? "bg-[#E5E7EB]" : "bg-[#2e2e48]"
          }`}
        >
          {t("Reset your password")}
        </h1>
        <div className="pl-[4vh] pr-[4vh]">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-[2vh] h-[2vh] opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder={t("Enter your password")}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="pl-[4vh] pr-[4vh] pt-[3vh]">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-[2vh] h-[2vh] opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder={t("Confirm your password")}
              onChange={(e) => {
                setconfirmpassword(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="pt-[5vh]">
          <button onClick={handleResetPass} className="btn btn-wide">
            {t("Reset")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
