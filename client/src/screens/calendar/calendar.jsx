import { AreaTop } from "../../components";
import { LIGHT_THEME } from "../../constants/themeConstants";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { ThemeContext } from "../../context/ThemeContext";
import React, { useContext, useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { addEvent, deleteEvents, fetchEvents } from "../../Hooks/Events";

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);

  const fetchData = async () => {
    const data = await fetchEvents({
      user: secureLocalStorage.getItem("email"),
    });
    setCurrentEvents(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext

  const handleDateClick = async (selected) => {
    const title = prompt("Please enter a new title for your event");
    if (title) {
      const data = {
        title: title,
        user: secureLocalStorage.getItem("email"),
        date: selected.startStr,
      };
      addEvent(data)
        .then((res) => {
          fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      const data = {
        id: selected.event._def.publicId,
      };
      deleteEvents(data)
        .then((res) => {
          fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
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
            <List className="max-h-[68vh] overflow-auto">
              {currentEvents !== undefined
                ? currentEvents.map((event) => (
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
                        secondary={<Typography>{event.date}</Typography>}
                      />
                    </ListItem>
                  ))
                : null}
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
              events={currentEvents}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Calendar;
