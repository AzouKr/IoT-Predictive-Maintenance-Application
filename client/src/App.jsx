import { useContext, useEffect } from "react";
import "./App.scss";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";
import BaseLayout from "./layout/BaseLayout";
import {
  Dashboard,
  PageNotFound,
  LoginP,
  Calendar,
  Contacts,
  Faq,
  FormUser,
} from "./screens";
import Users from "./screens/users/Users";
import Alarm from "./screens/alarm/alarm";
import AlarmTech from "./screens/alarm/alarmTech";
import AlarmMachine from "./screens/alarm/AlarmMachine";
import ReferenceSystem from "./screens/referenceSystem/ReferenceSystem";
import Teams from "./screens/teams/Teams";
import Team from "./screens/Team/Team";
import FormEdit from "./screens/formEdit/formEdit";
import AdminRoutes from "./Guard/AdminRoutes";
import UserRoutes from "./Guard/UserRoutes";
import SupervisorRoutes from "./Guard/SupervisorRoutes";
import AnalystRoutes from "./Guard/AnalystRoutes";
import Profiling from "./screens/profiling/Profiling";
import Upload from "./screens/upload/upload";
import CreateModel from "./screens/createModel/CreateModel";
import Models from "./screens/models/Models";
import CsvViewer from "./screens/csvViewer/csvViewer";
// import AutoModel from "./screens/createModel/AutoModel";
// import ManualModel from "./screens/createModel/ManualModel";
// import ListCsv from "./screens/csvViewer/ListCsv";
// import LoginP from "./screens/login/LoginP";
import { useTranslation } from "react-i18next";
import Results from "./screens/createModel/Results";
import Notif from "./screens/Notification/Notif";
import { Socket } from "socket.io-client";
import Maintenance from "./screens/maintenance-overview/index";
import MachineD from "./screens/MachineDetails/MacineD";
import socket from "./socket";
import notifSounde from "../src/assets/sounds/notif.mp3";
import ResetPassword from "./screens/login/ResetPassword";
import ResetPassGuard from "./Guard/ResetPassGuard";
import Email from "./screens/login/Email";
import MetricsPage from "./screens/createModel/MetricsPage";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  const handleChangeLng = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
  };

  socket.on("soundAlert", () => {
    const audio = new Audio(notifSounde);
    audio.play();
  });

  // adding dark-mode class if the dark mode is set on to the body tag
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <Router>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route element={<UserRoutes />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/maintenance-overview" element={<Maintenance />} />
              <Route path="/machine-overview/:id" element={<MachineD />} />
              <Route
                path="/machine-overview/:id/referenceSystem"
                element={<ReferenceSystem />}
              />
              <Route
                path="/machine-overview/:id/AlarmMachine"
                element={<AlarmMachine />}
              />
              <Route path="/alarmtech" element={<AlarmTech />} />
              <Route element={<SupervisorRoutes />}>
                <Route path="/alarm" element={<Alarm />} />
                <Route path="/team" element={<Team />} />
              </Route>
            </Route>
            <Route element={<AnalystRoutes />}>
              <Route path="/profiling" element={<Profiling />} />
              <Route path="/createmodel" element={<CreateModel />} />
              <Route path="/createmodel/results" element={<Results />} />
              <Route path="/models" element={<Models />} />
              <Route path="/models/metrics" element={<MetricsPage />} />
              <Route path="/dataset" element={<Upload />} />
              <Route path="/csvreader/:name" element={<CsvViewer />} />
            </Route>
            <Route element={<AdminRoutes />}>
              <Route path="/teams" element={<Teams />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/form" element={<FormUser />} />
              <Route path="/form/:id" element={<FormEdit />} />
              <Route path="/users" element={<Users />} />
              <Route path="/notifications" element={<Notif />} />
            </Route>
          </Route>
          <Route path="/login" element={<LoginP />} />
          <Route path="/reset/link" element={<Email />} />
          <Route element={<ResetPassGuard />}>
            <Route
              path="/resetpassword/:email/:token"
              element={<ResetPassword />}
            />
          </Route>
        </Routes>
        <div className="dropdown absolute top-[3.5vh] right-[37vh]">
          <button
            role="button"
            tabIndex={0}
            type="button"
            className="theme-toggle-btn"
          >
            <svg
              viewBox="0 0 512 512"
              fill="currentColor"
              class={`w-6 h-6 ${
                theme === LIGHT_THEME ? "text-black" : "text-white"
              }`}
            >
              <path d="M478.33 433.6l-90-218a22 22 0 00-40.67 0l-90 218a22 22 0 1040.67 16.79L316.66 406h102.67l18.33 44.39A22 22 0 00458 464a22 22 0 0020.32-30.4zM334.83 362L368 281.65 401.17 362zM267.84 342.92a22 22 0 00-4.89-30.7c-.2-.15-15-11.13-36.49-34.73 39.65-53.68 62.11-114.75 71.27-143.49H330a22 22 0 000-44H214V70a22 22 0 00-44 0v20H54a22 22 0 000 44h197.25c-9.52 26.95-27.05 69.5-53.79 108.36-31.41-41.68-43.08-68.65-43.17-68.87a22 22 0 00-40.58 17c.58 1.38 14.55 34.23 52.86 83.93.92 1.19 1.83 2.35 2.74 3.51-39.24 44.35-77.74 71.86-93.85 80.74a22 22 0 1021.07 38.63c2.16-1.18 48.6-26.89 101.63-85.59 22.52 24.08 38 35.44 38.93 36.1a22 22 0 0030.75-4.9z" />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li onClick={() => handleChangeLng("en")}>
              <a>English</a>
            </li>
            <li onClick={() => handleChangeLng("fr")}>
              <a>French</a>
            </li>
            <li onClick={() => handleChangeLng("ar")}>
              <a>العربية</a>
            </li>
          </ul>
        </div>
        <button
          type="button"
          className="theme-toggle-btn mt-[8vh]"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
          />
        </button>
      </Router>
    </>
  );
}

export default App;
