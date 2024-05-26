import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { editUser, getUserById } from "../../Hooks/Users";
import { useTranslation } from "react-i18next";

const FormEdit = () => {
  const { id } = useParams();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const fetchData = async () => {
    await getUserById(id).then((response) => {
      const userData = response.data[0];
      setName(userData.name);
      setEmail(userData.email);
      setPassword(userData.password);
      setPhone(userData.phone);
      setAge(userData.age);
      setCity(userData.city);
      setRole(userData.role);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = async () => {
    const data = {
      id,
      name,
      password,
      email,
      phone,
      role,
      age,
      city,
    };
    await editUser(data)
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
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={{ name, email, phone, password, role, city, age }}
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
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label={t("label_form_name")}
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
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  name="name"
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label={t("label_form_email")}
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
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  name="email"
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label={t("label_form_phone")}
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
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  name="phone"
                  helperText={touched.phone && errors.phone}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label={t("label_form_age")}
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
                  onChange={(e) => setAge(e.target.value)}
                  value={age}
                  name="age"
                  helperText={touched.age && errors.age}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label={t("label_form_password")}
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
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  name="password"
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label={t("label_form_city")}
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
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  name="city"
                  helperText={touched.city && errors.city}
                  sx={{ gridColumn: "span 4" }}
                />
                <div>
                  <InputLabel
                    id="role-label"
                    sx={{
                      color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
                    }}
                  >
                    {t("label_form_role")}
                  </InputLabel>
                  <Select
                    fullWidth
                    variant="filled"
                    labelId="role-label"
                    onBlur={handleBlur}
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                    name="role"
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
                  {t("label_form_update")}
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
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  age: yup.number().required("required"),
  password: yup.string().required("required"),
  city: yup.string().required("required"),
  role: yup.string().required("required"),
});

export default FormEdit;
