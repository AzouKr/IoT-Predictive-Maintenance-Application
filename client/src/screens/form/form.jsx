import { AreaTop } from "../../components";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
// import { Select, MenuItem } from "@mui/material";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { Select, MenuItem, InputLabel } from "@mui/material";
import React, { useContext, useState } from "react";
import { createUser } from "../../Hooks/Users";
import { useNavigate } from "react-router-dom";

const FormUser = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("");
  const [city, setcity] = useState("");
  const [age, setage] = useState(0);
  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    const data = {
      name: name,
      password: password,
      email: email,
      phone: phone,
      role: role,
      age: age,
      city: city,
    };
    await createUser(data)
      .then((response) => {
        if (response.bool) {
          setTimeout(() => {
            navigate("/team");
          }, 2000);
        } else {
          console.log(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="content-area">
      <AreaTop />
      <Box m="20px" className={theme === LIGHT_THEME ? "" : "dark-mode"}>
        <Formik onSubmit={handleFormSubmit} validationSchema={checkoutSchema}>
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
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Name"
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
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  value={name}
                  name="name"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
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
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  value={email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Phone Number"
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
                  onChange={(e) => {
                    setphone(e.target.value);
                  }}
                  value={phone}
                  name="phone"
                  error={!!touched.contact && !!errors.contact}
                  helperText={touched.contact && errors.contact}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Age"
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
                  onChange={(e) => {
                    setage(e.target.value);
                  }}
                  value={age}
                  name="age"
                  error={!!touched.address1 && !!errors.address1}
                  helperText={touched.address1 && errors.address1}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password" // Change type to "password"
                  label="Password" // Change label to "Password"
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
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text" // Change type to "password"
                  label="City" // Change label to "Password"
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
                  onChange={(e) => {
                    setcity(e.target.value);
                  }}
                  value={city}
                  name="city"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
                <div>
                  <InputLabel
                    id="role-label"
                    sx={{
                      color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
                    }}
                  >
                    Role
                  </InputLabel>
                  <Select
                    fullWidth
                    variant="filled"
                    labelId="role-label"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setrole(e.target.value);
                    }}
                    value={role}
                    name="role"
                    error={!!touched.role && !!errors.role}
                    sx={{
                      color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
                      gridColumn: "span 4",
                    }}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="technicien">Technicien</MenuItem>
                    <MenuItem value="analyste">Analyst</MenuItem>
                  </Select>
                </div>
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  onClick={handleFormSubmit}
                  type="submit"
                  color="secondary"
                  variant="contained"
                >
                  Create New User
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
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});

export default FormUser;
