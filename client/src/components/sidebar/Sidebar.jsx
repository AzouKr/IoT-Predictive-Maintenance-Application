import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import LogoBlue from "../../assets/images/logo_blue.svg";
import LogoWhite from "../../assets/images/logo_white.svg";
import { NavLink } from "react-router-dom";
import { logout } from "../../Hooks/Auth";
import {
  MdOutlineAddAlert,
  MdOutlineAlarm,
  MdOutlineAttachMoney,
  MdOutlineBarChart,
  MdOutlineBusAlert,
  MdOutlineClose,
  MdOutlineCurrencyExchange,
  MdOutlineFileCopy,
  MdOutlineFileOpen,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineMessage,
  MdOutlinePeople,
  MdOutlineReport,
  MdOutlineReportOff,
  MdOutlineSettings,
  MdOutlineShoppingBag,
  MdOutlinePerson,
  MdOutlineContacts,
  MdOutlineCalendarToday,
  MdOutlineHelpOutline,
} from "react-icons/md";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-oepn-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logoutHandler = async () => {
    await logout()
      .then((response) => {
        secureLocalStorage.setItem("authToken", "");
        secureLocalStorage.setItem("auth", false);
        secureLocalStorage.setItem("admin", false);
        secureLocalStorage.setItem("supervisor", false);
        secureLocalStorage.setItem("analyst", false);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" />
          <span className="sidebar-brand-text">tabernam.</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            {secureLocalStorage.getItem("admin") ? (
              <>
                <li className="menu-item">
                  <NavLink
                    to="/users"
                    className="menu-link"
                    activeClassName="active"
                  >
                    <span className="menu-link-icon">
                      <MdOutlinePeople size={18} />
                    </span>
                    <span className="menu-link-text">{t("Manage Users")}</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink
                    to="/contacts"
                    className="menu-link"
                    activeClassName="active"
                  >
                    <span className="menu-link-icon">
                      <MdOutlineContacts size={20} />
                    </span>
                    <span className="menu-link-text">
                      {t("Contact informations")}
                    </span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink
                    to="/teams"
                    className="menu-link"
                    activeClassName="active"
                  >
                    <span className="menu-link-icon">
                      <MdOutlineContacts size={20} />
                    </span>
                    <span className="menu-link-text">{t("Teams")}</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink
                    to="/form"
                    className="menu-link"
                    activeClassName="active"
                  >
                    <span className="menu-link-icon">
                      <MdOutlinePerson size={20} />
                    </span>
                    <span className="menu-link-text">
                      {t("label_sidebar_addUser")}
                    </span>
                  </NavLink>
                </li>
              </>
            ) : null}
            {secureLocalStorage.getItem("auth") ||
            secureLocalStorage.getItem("supervisor") ? (
              <>
                <li className="menu-item">
                  <NavLink
                    to="/"
                    className="menu-link"
                    activeClassName="active"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                      class="w-6 h-6"
                    >
                      <path d="M21 16V4H3v12h18m0-14a2 2 0 012 2v12a2 2 0 01-2 2h-7v2h2v2H8v-2h2v-2H3a2 2 0 01-2-2V4c0-1.11.89-2 2-2h18M5 6h9v5H5V6m10 0h4v2h-4V6m4 3v5h-4V9h4M5 12h4v2H5v-2m5 0h4v2h-4v-2z" />
                    </svg>
                    <span className="menu-link-text">{t("Dashboard")}</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink
                    to="/maintenance-overview"
                    className="menu-link"
                    activeClassName="active"
                  >
                    <span className="menu-link-icon">
                      <MdOutlineBarChart size={18} />
                    </span>
                    <span className="menu-link-text">
                      {t("Maintenance overview")}
                    </span>
                  </NavLink>
                </li>
                {secureLocalStorage.getItem("auth") ? (
                  <li className="menu-item">
                    <NavLink
                      to="/alarmtech"
                      className="menu-link"
                      activeClassName="active"
                    >
                      <span className="menu-link-icon">
                        <MdOutlineAddAlert size={18} />
                      </span>
                      <span className="menu-link-text">{t("Alarms")}</span>
                    </NavLink>
                  </li>
                ) : null}
                {secureLocalStorage.getItem("supervisor") ? (
                  <>
                    <li className="menu-item">
                      <NavLink
                        to="/alarm"
                        className="menu-link"
                        activeClassName="active"
                      >
                        <span className="menu-link-icon">
                          <MdOutlineAddAlert size={18} />
                        </span>
                        <span className="menu-link-text">{t("Alarms")}</span>
                      </NavLink>
                    </li>
                    <li className="menu-item">
                      <NavLink
                        to="/team"
                        className="menu-link"
                        activeClassName="active"
                      >
                        <span className="menu-link-icon">
                          <MdOutlinePeople size={18} />
                        </span>
                        <span className="menu-link-text">
                          {t("Manage Team")}
                        </span>
                      </NavLink>
                    </li>
                  </>
                ) : null}

                <li className="menu-item">
                  <NavLink
                    to="/calendar"
                    className="menu-link"
                    activeClassName="active"
                  >
                    <span className="menu-link-icon">
                      <MdOutlineCalendarToday size={18} />
                    </span>
                    <span className="menu-link-text">{t("Calendar")}</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink
                    to="/faq"
                    className="menu-link"
                    activeClassName="active"
                  >
                    <span className="menu-link-icon">
                      <MdOutlineHelpOutline size={20} />
                    </span>
                    <span className="menu-link-text">{t("FAQ")}</span>
                  </NavLink>
                </li>
              </>
            ) : null}
            {secureLocalStorage.getItem("analyst") ? (
              <>
                <li className="menu-item">
                  <NavLink
                    to="/profiling"
                    className="menu-link"
                    activeClassName="active"
                  >
                    <span className="menu-link-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                        />
                      </svg>
                    </span>
                    <span className="menu-link-text">{t("Profiling")}</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink
                    to="/createmodel"
                    className="menu-link"
                    activeClassName="active"
                  >
                    <span className="menu-link-icon">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        class="w-6 h-6"
                      >
                        <path d="M12 4.5a2.5 2.5 0 00-4.96-.46 2.5 2.5 0 00-1.98 3 2.5 2.5 0 00-1.32 4.24 3 3 0 00.34 5.58 2.5 2.5 0 002.96 3.08 2.5 2.5 0 004.91.05L12 20V4.5zM16 8V5c0-1.1.9-2 2-2M12 13h4" />
                        <path d="M12 18h6a2 2 0 012 2v1M12 8h8M20.5 8a.5.5 0 11-1 0 .5.5 0 011 0zM16.5 13a.5.5 0 11-1 0 .5.5 0 011 0z" />
                        <path d="M20.5 21a.5.5 0 11-1 0 .5.5 0 011 0zM18.5 3a.5.5 0 11-1 0 .5.5 0 011 0z" />
                      </svg>
                    </span>
                    <span className="menu-link-text">{t("Create Model")}</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink
                    to="/models"
                    className="menu-link"
                    activeClassName="active"
                  >
                    <span className="menu-link-icon">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        class="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15.528 2.973a.75.75 0 01.472.696v8.662a.75.75 0 01-.472.696l-7.25 2.9a.75.75 0 01-.557 0l-7.25-2.9A.75.75 0 010 12.331V3.669a.75.75 0 01.471-.696L7.443.184l.004-.001.274-.11a.75.75 0 01.558 0l.274.11.004.001 6.971 2.789zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339z"
                        />
                      </svg>
                    </span>
                    <span className="menu-link-text">{t("Models")}</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink
                    to="/dataset"
                    className="menu-link"
                    activeClassName="active"
                  >
                    <span className="menu-link-icon">
                      <svg
                        viewBox="0 0 384 512"
                        fill="currentColor"
                        class="w-6 h-6"
                      >
                        <path d="M64 0C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zm192 0v128h128L256 0zM80 224h16c22.1 0 40 17.9 40 40v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-4.4-3.6-8-8-8H80c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-8c0-8.8 7.2-16 16-16s16 7.2 16 16v8c0 22.1-17.9 40-40 40H80c-22.1 0-40-17.9-40-40v-80c0-22.1 17.9-40 40-40zm72 46.4c0-25.6 20.8-46.4 46.4-46.4H216c8.8 0 16 7.2 16 16s-7.2 16-16 16h-17.6c-7.9 0-14.4 6.4-14.4 14.4 0 5.2 2.8 9.9 7.2 12.5l25.4 14.5C231 305.7 240 321 240 337.7c0 25.6-20.8 46.4-46.4 46.4H168c-8.8 0-16-7.2-16-16s7.2-16 16-16h25.6c7.9 0 14.4-6.4 14.4-14.4 0-5.2-2.8-9.9-7.2-12.5l-25.4-14.5c-14.5-8.3-23.4-23.7-23.4-40.3zM280 240v31.6c0 23 5.5 45.6 16 66 10.5-20.3 16-42.9 16-66V240c0-8.8 7.2-16 16-16s16 7.2 16 16v31.6c0 34.7-10.3 68.7-29.6 97.6l-5.1 7.7c-3 4.5-8 7.1-13.3 7.1s-10.3-2.7-13.3-7.1l-5.1-7.7c-19.3-28.9-29.6-62.9-29.6-97.6V240c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                      </svg>
                    </span>
                    <span className="menu-link-text">{t("Datasets")}</span>
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <div className="menu-link cursor-pointer" onClick={logoutHandler}>
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">{t("Logout")}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
