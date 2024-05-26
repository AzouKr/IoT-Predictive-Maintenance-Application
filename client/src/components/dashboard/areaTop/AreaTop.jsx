import { MdOutlineMenu } from "react-icons/md";
import "./AreaTop.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../../../context/SidebarContext";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import { Link, useLocation } from "react-router-dom";
import Notification from "../../notification/Notification";

const AreaTop = () => {
  const { openSidebar } = useContext(SidebarContext);

  const [listItems, setListItems] = useState([]);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  // Function to get page title based on location
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/profiling":
        return "Profiling-Exploratory data analysis";
      case "/models":
        return "Bibliothèque de modèle";
      case "/datasets":
        return "Listes des Datasets";
      case "/createmodel":
        return "Créer un modèle";
      case "/calendar":
        return "Calendar";
      case "/dataviewer":
        return "Affichage du dataset";
      case "/faq":
        return "FAQ";
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
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
            showMonthAndYearPickers={false}
          />
        </div>
      </div>
    </section>
  );
};

export default AreaTop;
