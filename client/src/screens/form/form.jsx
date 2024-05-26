import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { AreaTop } from "../../components";
import { createUser } from "../../Hooks/Users";

const FormUser = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const allFieldsHaveErrors = (errors, touched) => {
    const errorKeys = Object.keys(errors);
    const touchedKeys = Object.keys(touched);

    if (errorKeys.length === 0 || touchedKeys.length === 0) {
      return false;
    }

    return errorKeys.every((key) => touched[key]);
  };

  const handleFormSubmit = async (values, errors, touched) => {
    const {
      firstName,
      lastName,
      email,
      contact,
      address1,
      password,
      role,
      age,
      city,
    } = values;
    const data = {
      name: `${firstName} ${lastName}`,
      password,
      email,
      phone: contact,
      role,
      age,
      city,
    };
    if (!allFieldsHaveErrors(errors, touched)) {
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
    }
  };

  return (
    <div className="content-area">
      <AreaTop />
      <Box m="20px" className={theme === LIGHT_THEME ? "" : "dark-mode"}>
        <Formik initialValues={initialValues} validationSchema={checkoutSchema}>
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
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Last Name"
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
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
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
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
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
                  onChange={handleChange}
                  value={values.age}
                  name="age"
                  error={!!touched.age && !!errors.age}
                  helperText={touched.age && errors.age}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Contact Number"
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
                  value={values.contact}
                  name="contact"
                  error={!!touched.contact && !!errors.contact}
                  helperText={touched.contact && errors.contact}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address 1"
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
                  value={values.address1}
                  name="address1"
                  error={!!touched.address1 && !!errors.address1}
                  helperText={touched.address1 && errors.address1}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="City"
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
                  value={values.city}
                  name="city"
                  error={!!touched.city && !!errors.city}
                  helperText={touched.city && errors.city}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
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
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Confirm Password"
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
                  value={values.confirmPassword}
                  name="confirmPassword"
                  error={!!touched.confirmPassword && !!errors.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{ gridColumn: "span 2" }}
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
                    onChange={handleChange}
                    value={values.role}
                    name="role"
                    error={!!touched.role && !!errors.role}
                    sx={{
                      color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
                      gridColumn: "span 4",
                    }}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="technicien">Technicien</MenuItem>
                    <MenuItem value="analyst">Analyst</MenuItem>
                  </Select>
                </div>
              </Box>

              <Box display="flex" justifyContent="end" mt="20px">
                <Button
                  onClick={() => {
                    handleFormSubmit(values, errors, touched);
                  }}
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
  password: yup
    .string()
    .required("required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("required"),
  role: yup.string().required("required"),
  age: yup.number().required("required"),
  city: yup.string().required("required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  password: "",
  confirmPassword: "",
  role: "",
  age: "",
  city: "",
};

export default FormUser;
