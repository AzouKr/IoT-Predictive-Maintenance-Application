import { AreaTop } from "../../components";
import { Box, useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import React, { useContext } from 'react';


const Faq = () => {
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext
   // Define variables for background color and text color based on the theme
   const backgroundColor = theme === LIGHT_THEME ? "#f2f0f0" : "#1F2A40";
   const textColor = theme === LIGHT_THEME ? "#000000" : "#ffffff";
   const iconColor = theme === LIGHT_THEME ? "#000000" : "#ffffff"; // Icon color based on theme


  return (
    <div className="content-area">
      <AreaTop />
      <Box m="20px" className={theme === LIGHT_THEME ? '' : 'dark-mode'}>
      <Accordion defaultExpanded >
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: iconColor }}/>} style={{ backgroundColor }}>
          <Typography color={"#066996"} variant="h5">
          What kind of support and training do you provide for users?
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor }}>
          <Typography color={textColor} >
          We offer comprehensive support and training services to ensure that users can maximize the value of the 
          predictive maintenance software. This includes onboarding sessions, user manuals, 
          video tutorials, and ongoing technical support to address any questions or issues that may arise.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: iconColor }}/>} style={{ backgroundColor }}>
          <Typography color={"#066996"} variant="h5">
          Is the software scalable to accommodate growing maintenance needs?
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor }}>
          <Typography color={textColor}>
          Yes, our predictive maintenance software is highly scalable and can adapt to the evolving needs of your organization. Whether you have a small fleet of equipment or a large industrial operation, 
          the software can scale to handle increasing volumes of data and support additional users and assets.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <Accordion defaultExpanded style={{ backgroundColor }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: iconColor }}/>}>
          <Typography color={"#066996"} variant="h5">
          How does the software prioritize maintenance tasks?
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor }}>
          <Typography color={textColor}>
          The software prioritizes maintenance tasks based on the criticality of equipment, the severity of potential failures, and other factors such as operational constraints and resource availability. By employing advanced algorithms, it helps maintenance teams focus their efforts on tasks that
           have the greatest impact on equipment reliability and operational efficiency.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: iconColor }}/>} style={{ backgroundColor }}>
          <Typography color={"#066996"} variant="h5">
          How accurate are the predictions made by the software?
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor }}> 
          <Typography color={textColor}>
          The accuracy of predictions depends on several factors, including the quality and quantity 
          of data available, the algorithms used, and the maintenance team's expertise. Generally, predictive maintenance software can achieve high accuracy rates, especially
           when trained on comprehensive data sets and tuned for specific equipment types.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: iconColor }}/>} style={{ backgroundColor }}>
          <Typography color={"#066996"} variant="h5">
          How does predictive maintenance differ from other maintenance strategies?
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ backgroundColor }}>
          <Typography color={textColor}>
          Unlike reactive maintenance, which involves responding to equipment failures as they occur, and preventive 
          maintenance, which relies on scheduled maintenance tasks, predictive maintenance anticipates failures 
          based on real-time data analysis. It allows maintenance teams to intervene before breakdowns 
          happen, optimizing equipment performance and extending asset lifespan.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
    </div>
  );
};

export default Faq;