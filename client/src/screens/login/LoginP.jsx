import React, { useContext, useState } from "react";
import logimg from "../../assets/images/industrial-robotics.jpeg";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { login } from "../../Hooks/Auth";
import { useTranslation } from "react-i18next";

function LoginP() {
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const loginHandler = async () => {
    if (email !== "" && password !== "") {
      const response = await login(email, password);
      if (response.auth) {
        seterror(false);
        if (response.data === "admin") {
          secureLocalStorage.setItem("auth", false);
          secureLocalStorage.setItem("analyst", false);
          secureLocalStorage.setItem("supervisor", false);
          secureLocalStorage.setItem("admin", true);
          secureLocalStorage.setItem("authToken", response.token);
          secureLocalStorage.setItem("email", email);
          setTimeout(() => {
            navigate("/users");
          }, 2000);
        } else {
          if (response.data === "technicien") {
            secureLocalStorage.setItem("admin", false);
            secureLocalStorage.setItem("analyst", false);
            secureLocalStorage.setItem("supervisor", false);
            secureLocalStorage.setItem("auth", true);
            secureLocalStorage.setItem("authToken", response.token);
            secureLocalStorage.setItem("email", email);

            setTimeout(() => {
              navigate("/");
            }, 2000);
          } else {
            if (response.data === "supervisor") {
              secureLocalStorage.setItem("admin", false);
              secureLocalStorage.setItem("analyst", false);
              secureLocalStorage.setItem("auth", false);
              secureLocalStorage.setItem("supervisor", true);
              secureLocalStorage.setItem("authToken", response.token);
              secureLocalStorage.setItem("email", email);

              setTimeout(() => {
                navigate("/");
              }, 2000);
            } else {
              secureLocalStorage.setItem("admin", false);
              secureLocalStorage.setItem("auth", false);
              secureLocalStorage.setItem("supervisor", false);
              secureLocalStorage.setItem("analyst", true);
              secureLocalStorage.setItem("authToken", response.token);
              secureLocalStorage.setItem("email", email);

              setTimeout(() => {
                navigate("/profiling");
              }, 2000);
            }
          }
        }
      } else {
        seterrorMsg(t("label_login_error2"));
        seterror(true);
      }
    } else {
      seterrorMsg(t("label_login_error"));
      seterror(true);
    }
  };

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Document</title>
      </head>
      <body className={theme === LIGHT_THEME ? "" : "dark-mode"}>
        <style>
          {`
            body {
              background-color: ${
                theme === LIGHT_THEME ? "#F3F4F6" : "#383854"
              };
            }
            .login-container {
              background-color: ${
                theme === LIGHT_THEME ? "#E5E7EB" : "#2e2e48"
              };
              color: ${theme === LIGHT_THEME ? "black" : "white"};
            }
            .login-left-container {
              background-color: ${
                theme === LIGHT_THEME ? "#E5E7EB" : "#2e2e48"
              };
            }
            .login-left-text {
              color: ${theme === LIGHT_THEME ? "white" : "black"};
            }
          `}
        </style>
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
            {/* left side */}
            <div className="relative flex-shrink-0 login-left-container">
              <img
                src={logimg}
                alt="img"
                className="w-[500px] h-full hidden rounded-r-2xl md:block object-cover"
              />
              {/* text on image */}
              <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-5 backdrop-blur-sm rounded drop-shadow-lg md:block login-left-text">
                <span className="text-white text-xl">
                  PREDECTIVE MAINTENANCE <br />
                  SOLUTION
                  <br />
                  for industrial Machines.
                </span>
              </div>
            </div>
            {/* right side */}
            <div className="flex flex-col justify-center p-8 md:p-14 login-container">
              <span className="mb-3 text-4xl font-bold">
                {t("label_login_title")}
              </span>
              <span
                className={`font-light ${
                  theme === LIGHT_THEME ? "text-black" : "text-white"
                } mb-8`}
              >
                {t("label_login_title2")}
              </span>
              <div className="py-4">
                <span className="mb-2 text-md">{t("label_login_email")}</span>
                <input
                  type="email"
                  className={`w-full p-2 border border-gray-300 bg-white rounded-md text-black `}
                  name="user-name"
                  id="user-name"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
              </div>
              <div className="py-4">
                <span className="mb-2 text-md">
                  {t("label_login_password")}
                </span>
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  className={`w-full p-2 border border-gray-300 bg-white rounded-md text-black `}
                />
              </div>
              {/* Apply Tailwind CSS classes to center the text within the button */}
              <button
                className={`w-full p-2 rounded-lg mb-6 text-center hover:bg-white bg-blue-500 hover:text-black hover:border hover:border-gray-300 text-white`}
                onClick={loginHandler}
              >
                {t("label_login_connect")}
              </button>
              <a href="/reset/link" className="text-blue-800 cursor-pointer">
                {t("label_login_frogot")}
              </a>
              {error ? (
                <div role="alert" className="alert alert-error">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{errorMsg}</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

export default LoginP;
