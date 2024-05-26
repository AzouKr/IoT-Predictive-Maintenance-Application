import { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";

const Notif = () => {
  const [listItems, setListItems] = useState([
    {
      UTC: "1408648665",
      list: [
        {
          type: "Message",
          content: "A message description for testing notification bar",
          count: 3,
          timestamp: "1PM"
        }
      ]
    },
    {
      UTC: "1598103780",
      list: [
        {
          type: "Login",
          content: "A message description for testing notification bar",
          count: 1,
          timestamp: "2PM"
        }
      ]
    },
    {
        UTC: "1598103780",
        list: [
          {
            type: "Login",
            content: "A message description for testing notification bar",
            count: 1,
            timestamp: "2PM"
          }
        ]
      },
      {
        UTC: "1598103780",
        list: [
          {
            type: "Login",
            content: "A message description for testing notification bar",
            count: 1,
            timestamp: "2PM"
          }
        ]
      },
      {
        UTC: "1598103780",
        list: [
          {
            type: "Login",
            content: "A message description for testing notification bar",
            count: 1,
            timestamp: "2PM"
          }
        ]
      },
      {
        UTC: "1598103780",
        list: [
          {
            type: "Login",
            content: "A message description for testing notification bar",
            count: 1,
            timestamp: "2PM"
          }
        ]
      },
      {
        UTC: "1598103780",
        list: [
          {
            type: "Login",
            content: "A message description for testing notification bar",
            count: 1,
            timestamp: "2PM"
          }
        ]
      },
      {
        UTC: "1598103780",
        list: [
          {
            type: "Login",
            content: "A message description for testing notification bar",
            count: 1,
            timestamp: "2PM"
          }
        ]
      },

      {
        UTC: "1598103780",
        list: [
          {
            type: "Login",
            content: "A message description for testing notification bar",
            count: 1,
            timestamp: "2PM"
          }
        ]
      },
    // Additional items...
  ]);

  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === LIGHT_THEME ? '#F3F4F6' : '#2e2e48';
  const color = theme === LIGHT_THEME ? 'black' : 'white';

  return (
    <div className={`content-area ${theme === LIGHT_THEME ? '' : 'dark-mode'}`}>
      <h1 style={{ color, fontSize: "25px", opacity: "0.7" }}>
        Notifications
      </h1>

      <div
        style={{
            //width: "400px",
            border: "0.5px solid #8080803d",
            backgroundColor: backgroundColor, 
            maxHeight: "80vh", 
            overflowY: "auto", 
            boxShadow: "2px 3px 17px -3px #8888888c", 
            padding: "15px", 
            margin:"10px",
          }}
      >
        {listItems.map((i, index) => (
          <div key={index}>
            <p
              style={{
                fontSize: "16px",
                margin: "8px 0",
                textAlign: "left",
                color: "#747474",
               // display: "initial",
              }}
            >
              <span style={{ display: "inline-block", width: "50%" }}>
                {new Date(i.UTC * 1000).toLocaleDateString()}
              </span>
            </p>
            {i.list.map((l, subIndex) => (
              <div
                key={subIndex}
                style={{ padding: "7px" }}
                className={theme === LIGHT_THEME ? "lineItems bg-white" : "lineItems text-white"}
              >
                <span style={{ fontSize: "16px", fontWeight: 700 }}>
                  {`${l.type} (${l.count})`}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#747474",
                    float: "right"
                  }}
                >
                  {l.timestamp}
                </span>
                <div style={{ fontSize: "16px" }}>{l.content}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notif;
