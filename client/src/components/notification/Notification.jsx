import React, { useState, useEffect, useContext } from "react";
import "./notification.scss";
import Close from "../../assets/icons/Close.svg";
import notificationIcon from "../../assets/icons/notificationIcon.svg";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { Link } from "react-router-dom";
import socket from "../../socket"; // Import the socket module
import secureLocalStorage from "react-secure-storage";

const Notification = (props) => {
  const [toggleNotification, setToggleNotification] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [totalCount, settotalCount] = useState(0);

  // Function to convert timestamp to "12am" or "9pm" format
  function formatTimestampToTimeString(timestamp) {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    return hours + ampm;
  }

  socket.on("getUserAlerts/" + secureLocalStorage.getItem("email"), (data) => {
    setListItems(data.data);
    settotalCount(data.count);
  });

  const toggleNotificationHandler = () => {
    setToggleNotification(!toggleNotification);
  };

  const clearAllMessage = () => {
    props.onClearAll && props.onClearAll();
    setListItems([]); // Clear the state as well
  };

  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === LIGHT_THEME ? "#F3F4F6" : "#2e2e48";
  const color = theme === LIGHT_THEME ? "black" : "white";

  return (
    <div className={`notification ${theme === LIGHT_THEME ? "" : "dark-mode"}`}>
      <div className={"iconSection"}>
        <img
          alt={"Notification"}
          src={notificationIcon}
          onClick={toggleNotificationHandler}
          style={{ cursor: "pointer", width: "250%", height: "35px" }}
        />
        <span className={"iconBadge"}>{totalCount}</span>
      </div>
      {toggleNotification && (
        <div
          style={{
            position: "absolute",
            width: "400px",
            border: "0.5px solid #8080803d",
            minHeight: "100px",
            maxHeight: "400px", // Set max-height for scrolling
            overflowY: "auto", // Enable vertical scrolling
            top: "35px",
            right: "0px",
            backgroundColor: backgroundColor, // Apply background color
            //color: color
          }}
          className={"notificationBar"}
        >
          <div style={{ display: "flex" }}>
            <p
              className="text-black"
              style={{
                fontSize: "16px",
                textAlign: "left",
                width: "93%",
                color: color,
              }}
            >
              Notifications
            </p>
            <img
              alt={"close"}
              onClick={toggleNotificationHandler}
              style={{ width: "5%", cursor: "pointer" }}
              src={Close}
            />
          </div>
          {listItems.map((i, k) => (
            <div key={k}>
              <p
                className="text-black"
                style={{
                  fontSize: "12px",
                  margin: "5px 0",
                  textAlign: "left",
                  color: "#747474",
                  display: "initial",
                }}
              >
                <span
                  className="text-black"
                  style={{ display: "inline-block", width: "50%" }}
                >
                  {i.date}
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: "50%",
                    textAlign: "right",
                  }}
                >
                  {k === 0 && (
                    <ClearAllIcon
                      style={{
                        width: "18%",
                        height: "20%",
                        cursor: "pointer",
                        marginBottom: "-6px",
                      }}
                      onClick={clearAllMessage}
                    />
                  )}
                </span>
              </p>
              {i.list.map((l, index) => {
                const time = formatTimestampToTimeString(l.timeStamp);
                return (
                  <div
                    style={{ background: "#fff", padding: "5px" }}
                    className={"lineItems"}
                  >
                    {/* title*/}
                    <span
                      className="text-black"
                      style={{ fontSize: "13px", fontWeight: 700 }}
                    >
                      {`${l.type}`}
                    </span>
                    {/* time*/}
                    <span
                      className="text-black"
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "#747474",
                        float: "right",
                      }}
                    >
                      {`${time}`}
                    </span>
                    {/* desc*/}
                    <div className="text-black" style={{ fontSize: "10px" }}>
                      {l.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;
