import { useContext, useEffect } from "react";
import "./App.scss";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import { BrowserRouter as Router, Routes, Route, Form } from "react-router-dom";
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
  Team,
} from "./screens";
import FormEdit from "./screens/formEdit/formEdit";
import AdminRoutes from "./Guard/AdminRoutes";
import UserRoutes from "./Guard/UserRoutes";
import AnalystRoutes from "./Guard/AnalystRoutes";
import Profiling from "./screens/profiling/Profiling";
import Upload from "./screens/upload/upload";
import CreateModel from "./screens/createModel/CreateModel";
import Models from "./screens/models/Models";
import CsvViewer from "./screens/csvViewer/csvViewer";
import AutoModel from "./screens/createModel/AutoModel";
import ManualModel from "./screens/createModel/ManualModel";
// import LoginP from "./screens/login/LoginP";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

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
            </Route>
            <Route element={<AnalystRoutes />}>
              <Route path="/profiling" element={<Profiling />} />
              <Route path="/createmodel" element={<CreateModel />} />
              <Route path="/createmodel/auto" element={<AutoModel />} />
              <Route path="/createmodel/manual" element={<ManualModel />} />
              <Route path="/models" element={<Models />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/csvreader" element={<CsvViewer />} />
            </Route>
            <Route element={<AdminRoutes />}>
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/form" element={<FormUser />} />
              <Route path="/form/:id" element={<FormEdit />} />
              <Route path="/team" element={<Team />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="/login" element={<LoginP />} />
        </Routes>

        <button
          type="button"
          className="theme-toggle-btn"
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
