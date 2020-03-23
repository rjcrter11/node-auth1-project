import React from "react";
import { withFormik, Form, Field, useField } from "formik";
import { withRouter, NavLink } from "react-router-dom";
import { TextField, Button, makeStyles } from "@material-ui/core";
import * as Yup from "yup";
import axios from "axios";

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
    backgroundColor: "dodgerblue",
    color: "white",
    marginTop: "4%",
    width: "40%"
  }
}));

const Registration = () => {
  const classes = useStyles();
  return (
    <div className="login-container">
      <h2>Register</h2>
      <Form>
        <div className={classes.input}>
          <MyTextField name="username" type="text" />
          {/* {touched.username && errors.username && (
          <p className="errors"> {errors.username} </p>
        )} */}
        </div>
        <div className={classes.input}>
          <PassWordField name="password" type="password" />
          {/* {touched.password && errors.password && (
          <p className="erros"> {errors.password} </p>
        )} */}
        </div>
        <Button className={classes.button} type="submit">
          SUBMIT
        </Button>
        <div className="login-box">
          <h6>Already registered?</h6>
          <NavLink to="login">Login</NavLink>
        </div>
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
      username: Yup.string().required("a username is required"),
      password: Yup.string().required("a password is required")
    }),
    handleSubmit(values, { props }) {
      axios
        .post("http://localhost:5000/api/auth/register", values)
        .then((res) => {
          console.log("success", res);
          props.history.push("/users");
        })
        .catch((err) => console.log(err));
    }
  })(Registration)
);
export default FormikForm;
