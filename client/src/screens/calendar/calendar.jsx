import { AreaTop } from "../../components";
import { LIGHT_THEME } from "../../constants/themeConstants";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { ThemeContext } from "../../context/ThemeContext";
import React, { useContext, useState } from "react";
import { io } from "socket.io-client";
import { backend_url_socket } from "../../Hooks";
import secureLocalStorage from "react-secure-storage";

const Calendar = () => {
  const socket = io(backend_url_socket, {
    withCredentials: true,
    extraHeaders: {
      Authorization: `Bearer ${secureLocalStorage.getItem("authToken")}`,
      "Another-Header": "HeaderValue",
    },
  });
  socket.on("connect", () => {});
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext

  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <div className="content-area">
      <AreaTop />
      <Box m="20px" className={theme === LIGHT_THEME ? "" : "dark-mode"}>
        <Box display="flex" justifyContent="space-between">
          {/* CALENDAR SIDEBAR */}
          <Box
            flex="1 1 20%"
            // backgroundColor={"#1F2A40"}
            p="15px"
            borderRadius="4px"
            backgroundColor={theme === LIGHT_THEME ? "#f2f0f0" : "#1F2A40"} // Set background color based on theme
            color={theme === LIGHT_THEME ? "#000000" : "#ffffff"} // Set text color based on theme
          >
            <Typography variant="h5">Events</Typography>
            <List>
              {currentEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: "#4cceac",
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {/* {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })} */}
                        {event.start.toDateString()}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* CALENDAR */}
          <Box
            flex="1 1 100%"
            ml="15px"
            color={theme === LIGHT_THEME ? "#000000" : "#ffffff"}
          >
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              eventsSet={(events) => setCurrentEvents(events)}
              initialEvents={[
                {
                  id: "12315",
                  title: "All-day event",
                  date: "2022-09-14",
                },
                {
                  id: "5123",
                  title: "Timed event",
                  date: "2022-09-28",
                },
              ]}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Calendar;
