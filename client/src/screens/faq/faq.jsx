import { AreaTop } from "../../components";
import { Box, useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { io } from "socket.io-client";
import { backend_url_socket } from "../../Hooks";
import secureLocalStorage from "react-secure-storage";

const Faq = () => {
  const socket = io(backend_url_socket, {
    withCredentials: true,
    extraHeaders: {
      Authorization: `Bearer ${secureLocalStorage.getItem("authToken")}`,
      "Another-Header": "HeaderValue",
    },
  });
  socket.on("connect", () => {});
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext
  // Define variables for background color and text color based on the theme
  const backgroundColor = theme === LIGHT_THEME ? "#f2f0f0" : "#1F2A40";
  const textColor = theme === LIGHT_THEME ? "#000000" : "#ffffff";
  const iconColor = theme === LIGHT_THEME ? "#000000" : "#ffffff"; // Icon color based on theme
  const { t, i18n } = useTranslation();

  return (
    <div className="content-area">
      <AreaTop />
      <Box m="20px" className={theme === LIGHT_THEME ? "" : "dark-mode"}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: iconColor }} />}
            style={{ backgroundColor }}
          >
            <Typography color={"#066996"} variant="h5">
              {t("label_faq_title")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ backgroundColor }}>
            <Typography color={textColor}>{t("label_faq_desc")}</Typography>
          </AccordionDetails>
        </Accordion>
        <br />
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: iconColor }} />}
            style={{ backgroundColor }}
          >
            <Typography color={"#066996"} variant="h5">
              {t("label_faq2_title")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ backgroundColor }}>
            <Typography color={textColor}>{t("label_faq2_desc")}</Typography>
          </AccordionDetails>
        </Accordion>
        <br />
        <Accordion defaultExpanded style={{ backgroundColor }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: iconColor }} />}
          >
            <Typography color={"#066996"} variant="h5">
              {t("label_faq3_title")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ backgroundColor }}>
            <Typography color={textColor}>{t("label_faq3_desc")}</Typography>
          </AccordionDetails>
        </Accordion>
        <br />
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: iconColor }} />}
            style={{ backgroundColor }}
          >
            <Typography color={"#066996"} variant="h5">
              {t("label_faq4_title")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ backgroundColor }}>
            <Typography color={textColor}>{t("label_faq4_desc")}</Typography>
          </AccordionDetails>
        </Accordion>
        <br />
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: iconColor }} />}
            style={{ backgroundColor }}
          >
            <Typography color={"#066996"} variant="h5">
              {t("label_faq5_title")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ backgroundColor }}>
            <Typography color={textColor}>{t("label_faq5_desc")}</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
};

export default Faq;
