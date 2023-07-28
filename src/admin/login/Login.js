import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import GoogleLoginButton from './GoogleLoginButton';
import { login } from '../../_services/auth.service';
import { setToken } from "../../_helper/secureToken"
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
const LoginForm = () => {
  const [errorMsg, setErrorMsg] = useState("")
  let navigate = useNavigate()
  const paperStyle = {
    padding: 20,
    width: 300,
    margin: '20px auto',
  };

  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });
  const onSubmit = (values) => {
    login(values).then(function (response) {
      if (response.status == 200) {
        if (response.headers) {
          setToken(response.data.token)
          navigate("/")
        }
      }
      else if (response.status === 401) {
        setErrorMsg('Unauthorized: Incorrect username or password.');
      } else if (response.status === 403) {
        setErrorMsg('Forbidden: You do not have access to this resource.');
      } else {
        setErrorMsg('Please enter valid email and password !');
      }
    }).catch(function (error) {

    });
    // console.log('Form values:', values);
    // actions.setSubmitting(false);
  };

  return (
    <Grid container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Typography variant="h6">Login</Typography>
        </Grid>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {(formik) => (
            <Form>
              <Field
                as={TextField}
                variant="outlined"
                label="Email*"
                name="email"
                style={{ marginTop: "20px" }}
                fullWidth
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                variant="outlined"
                label="Password*"
                name="password"
                type="password"
                style={{ marginTop: "20px" }}
                fullWidth
                helperText={<ErrorMessage name="password" />}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                disabled={formik.isSubmitting}
                style={{ margin: '20px 0' }}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Typography variant="caption" display="block" align='center'sx={{mb:2, color:"red"}}>{errorMsg}</Typography>
        <GoogleLoginButton />
        <Grid sx={{ mt: 2 }} align="center">
          <Typography variant="caption" display="block" >Don't have an account ? <Link to="/register">Sign up</Link></Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default LoginForm;

