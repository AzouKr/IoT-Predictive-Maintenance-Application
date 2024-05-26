import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { sendLink } from "../../Hooks/Auth";

function Email() {
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext
  const [email, setemail] = useState("");

  const handleResetPass = () => {
    if (email !== "") {
      sendLink(email)
        .then((res) => {
          alert("Link sent to your email address");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("You must enter your email");
    }
  };
  return (
    <div
      className={`h-[100vh] w-full flex items-center justify-center ${
        theme === LIGHT_THEME ? "bg-[#F3F4F6]" : "bg-[#383854]"
      }`}
    >
      <div
        className={`h-[40vh] w-[70vh] rounded-lg shadow-md ${
          theme === LIGHT_THEME ? "bg-[#E5E7EB]" : "bg-[#2e2e48]"
        }`}
      >
        <h1
          className={`text-[4vh] text-center p-[4vh] ${
            theme === LIGHT_THEME ? "text-black" : "text-white"
          }`}
        >
          Send reset link
        </h1>
        <div className="pl-[4vh] pr-[4vh]">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-[2vh] h-[2vh] opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>

            <input
              type="Email"
              className="grow"
              placeholder="Enter your password"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="pt-[5vh]">
          <button
            onClick={() => {
              handleResetPass();
            }}
            className="btn btn-wide"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Email;
