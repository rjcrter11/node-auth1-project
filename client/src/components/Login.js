import React from "react";
import { withRouter } from "react-router-dom";
import { withFormik, Field, Form, useField } from "formik";
import { Button, TextField, makeStyles } from "@material-ui/core";
import * as Yup from "yup";
import Axios from "axios";

const MyTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      required
      placeholder={placeholder}
      error={!!errorText}
      {...field}
      label="Username"
      helperText={errorText}
      variant="outlined"
      size="small"
    />
  );
};
const PassWordField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      required
      label="Password"
      variant="outlined"
      type="password"
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
      size="small"
    />
  );
};

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: "20px",
    width: "100%"
  },
  button: {
    backgroundColor: "rgb(139, 62, 194)",
    color: "white",
    marginTop: "4%",
    width: "100%",
    letterSpacing: ".1rem"
  }
}));

const Login = () => {
  const classes = useStyles();
  return (
    <div className="login-container">
      <h3>Login</h3>
      <Form className="form">
        <div className={classes.input}>
          <MyTextField className={classes.input} name="username" type="text" />
          {/* {touched.username && errors.username && (
            <p className="errors"> {errors.username} </p>
          )} */}
        </div>
        <div className={classes.input}>
          <PassWordField
            className={classes.input}
            name="password"
            type="password"
          />
          {/* {touched.password && errors.password && (
            <p className="errors"> {errors.password} </p>
          )} */}
        </div>
        <Button className={classes.button} type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

const FormikForm = withRouter(
  withFormik({
    mapPropsToValues({ username, password }) {
      return {
        username: username || "",
        password: password || ""
      };
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("username required"),
      password: Yup.string().required("password required")
    }),
    handleSubmit(values, { props }) {
      Axios.post("http://localhost:5000/api/auth/login", values)
        .then((res) => {
          console.log("login successful", res);
          props.history.push("/");
        })
        .catch((err) => console.log(err));
    }
  })(Login)
);
export default FormikForm;
