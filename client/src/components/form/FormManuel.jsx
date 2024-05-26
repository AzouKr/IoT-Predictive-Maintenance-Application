// form.jsx

import React, { useContext } from 'react';
import { Box, Button, TextField, Select, MenuItem, InputLabel , FormControl ,Radio,RadioGroup ,FormLabel,FormControlLabel} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";

const FormManuel = () => {
  const { theme } = useContext(ThemeContext); 
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
    // Perform form submission logic here
  };

  return (
    <div className="content-area">
      <Box m="20px" className={theme === LIGHT_THEME ? '' : 'dark-mode'}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
               // display="flex"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                  <div>
                  <InputLabel id="role-label" sx={{ color: theme === LIGHT_THEME ? "#000000" : "#ffffff" }}>
                    Role
                  </InputLabel>
                  <Select
                    fullWidth
                    variant="filled"
                    labelId="role-label"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.role}
                    name="role"
                    error={!!touched.role && !!errors.role}
                    sx={{ color: theme === LIGHT_THEME ? "#000000" : "#ffffff", gridColumn: "span 4" }}
                  >
                    <MenuItem value="technicien">Technicien</MenuItem>
                    <MenuItem value="analyst">Analyst</MenuItem>
                  </Select>
                </div>


                  <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel value="binary" control={<Radio />} label="Binary" />
                          <FormControlLabel value="multiclass" control={<Radio />} label="MultiClass" />
                        </RadioGroup>
                      </FormControl>











                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="First Name"
                  InputLabelProps={{
                    sx: {
                      color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
                    },
                  }}
                  InputProps={{
                    sx: {
                      color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
                    },
                  }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
             





              </Box>



              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Create
                </Button>
              </Box>


            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

// Validation schema and initial values
const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  contact: yup.string().matches(phoneRegExp, "Phone number is not valid").required("Contact number is required"),
  address1: yup.string().required("Address 1 is required"),
  // Define validation rules for other form fields here
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  // Initialize other form fields here
};

export default FormManuel;
