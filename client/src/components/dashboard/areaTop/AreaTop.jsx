import { MdOutlineMenu } from "react-icons/md";
import "./AreaTop.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import { ThemeContext } from "../../../context/ThemeContext";
import { LIGHT_THEME } from "../../../constants/themeConstants";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Notification from "../../notification/Notification";
import "hijri-date";

const AreaTop = () => {
  const { openSidebar } = useContext(SidebarContext);
  const { theme } = useContext(ThemeContext);

  const [listItems, setListItems] = useState([]);

  // const [state, setState] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: addDays(new Date(), 7),
  //     key: "selection",
  //   },
  // ]);
  const today = new Date();
  const todayH = new HijriDate();
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const hijriMonths = [
    "Muharram",
    "Safar",
    "Rabi' al-Awwal",
    "Rabi' al-Thani",
    "Jumada al-Awwal",
    "Jumada al-Thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhu al-Qi'dah",
    "Dhu al-Hijjah",
  ];

  // Function to get page title based on location
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/calendar":
        return "Calendar";
      case "/maintenance-overview":
        return "Maintenance Overview";
      case "/alarm":
        return "Alert";
      case "/alarmtech":
        return "Alert";
      case "/team":
        return "Team";
      case "/faq":
        return "FAQ";
      case "/users":
        return "Manage Users";
      case "/contacts":
        return "Contacts";
      case "/teams":
        return "Teams";
      case "/form":
        return "Add User";
      default:
        return "Unknown Page";
    }
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateRangeRef = useRef(null);

  const handleInputClick = () => {
    setShowDatePicker(true);
  };

  const handleClickOutside = (event) => {
    if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
      setShowDatePicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to clear all notifications
  const handleClearAll = () => {
    setListItems([]);
  };

  return (
    <section className="content-area-top">
      <div className="area-top-l">
        <button
          className="sidebar-open-btn"
          type="button"
          onClick={openSidebar}
        >
          <MdOutlineMenu size={24} />
        </button>
        <h2 className="area-top-title">{getPageTitle()}</h2>
      </div>
      <div className="area-top-r flex gap-5">
        <div>
          <Notification onClearAll={handleClearAll} />
        </div>
        <div
          ref={dateRangeRef}
          className={`date-range-wrapper ${
            !showDatePicker ? "hide-date-range" : ""
          }`}
          onClick={handleInputClick}
        >
          <div
            className={`h-[5vh] w-[45vh] ${
              theme === LIGHT_THEME ? "bg-white" : "bg-[#2e2e48]"
            } flex`}
          >
            <div className="h-full w-[45%] flex items-center justify-center">
              <svg
                viewBox="0 0 21 21"
                fill="currentColor"
                className={`h-[2vh] w-[2vh] mr-[0.5vh] ${
                  theme === LIGHT_THEME ? "text-black" : "text-white"
                }`}
              >
                <g fill="none" fillRule="evenodd">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 2.5h12a2 2 0 012 2v11.99a2 2 0 01-2 2h-12a2 2 0 01-2-2V4.5a2 2 0 012-2zM2.659 6.5H18.5"
                  />
                  <g fill="currentColor">
                    <path d="M6.816 13.155v-1.079h.88c.668 0 1.122-.395 1.122-.972 0-.527-.415-.927-1.103-.927-.713 0-1.152.366-1.201.996H5.15C5.201 9.874 6.201 9 7.788 9c1.563 0 2.432.864 2.427 1.895-.005.854-.542 1.416-1.299 1.601v.093c.981.141 1.577.766 1.577 1.709 0 1.235-1.162 2.11-2.754 2.11S5.063 15.537 5 14.204h1.411c.044.596.552.977 1.309.977.747 0 1.27-.406 1.27-1.016 0-.625-.489-1.01-1.28-1.01zM13.516 16.227v-5.611h-.087L11.7 11.808v-1.372l1.821-1.255h1.47v7.046z" />
                  </g>
                </g>
              </svg>
              <span
                className={`text-sm ${
                  theme === LIGHT_THEME ? "text-black" : "text-white"
                }`}
              >
                {today.getDate() +
                  " " +
                  months[today.getMonth()] +
                  " " +
                  today.getFullYear()}
              </span>
            </div>
            <div className="h-full w-[50%] flex items-center justify-center">
              <svg
                viewBox="0 0 512 512"
                fill="currentColor"
                className={`h-[2vh] w-[2vh] mr-[0.5vh] ${
                  theme === LIGHT_THEME ? "text-black" : "text-white"
                }`}
              >
                <path d="M264 480A232 232 0 0132 248c0-94 54-178.28 137.61-214.67a16 16 0 0121.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200 31.34 0 59.57-5.07 81.61-14.67a16 16 0 0121.06 21.06C442.28 426 358 480 264 480z" />
              </svg>
              <span
                className={`text-sm ${
                  theme === LIGHT_THEME ? "text-black" : "text-white"
                }`}
              >
                {todayH.getDate() +
                  " " +
                  hijriMonths[todayH.getMonth() - 1] +
                  " " +
                  todayH.getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreaTop;
