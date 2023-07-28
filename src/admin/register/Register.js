import React  from 'react';
import { TextField, Button, Box, Typography, Grid, Paper } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../_services/register/registerUser.service';
import { Link,  useNavigate } from 'react-router-dom';
const RegisterForm = () => {
let navigate=useNavigate();
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };
  const paperStyle = {
    padding: 20,
    width: 300,
    margin: '20px auto',
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const onSubmit = (values) => {
    registerUser(values).then(function (response) {
        if(response.status===200){
          navigate("/login")
        }
        if(response.data.error){
          alert(response.data.error)
        }
    
    }).catch((error) => {
    
      console.log("Something went wrong")
    })
  };
  return (
    <Grid container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh" }}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Typography variant="h6">Register</Typography>
        </Grid>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Box my={2}>
                <Field
                  as={TextField}
                  name="username"
                  label="Username*"
                  variant="outlined"
                  fullWidth
                  helperText={<ErrorMessage name="username" />}
                />
              </Box>
              <Box my={2}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email*"
                  variant="outlined"
                  fullWidth
                  helperText={<ErrorMessage name="email" />}
                />
              </Box>
              <Box my={2}>
                <Field
                  as={TextField}
                  name="password"
                  label="Password*"
                  type="password"
                  variant="outlined"
                  fullWidth
                  helperText={<ErrorMessage name="password" />}
                />
              </Box>
              <Button 
              type="submit" variant="contained" 
              fullWidth
              style={{ margin: '5px 0' }}
              color="primary" disabled={isSubmitting}>
                Register
              </Button>
            </Form>
          )}
        </Formik>
        <Grid sx={{ mt: 2 }} align="center">
          <Typography variant="caption" display="block" >Already have an account ? <Link to="/login">Login</Link></Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default RegisterForm;