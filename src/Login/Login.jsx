import React, { useState } from "react";
import "../transitionStyles.css";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  Grid,
  InputAdornment,
  Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";


import { login } from "../Services/service";

function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async () => {
    navigate("/signup");
  };

  const handleLogin = async () => {
    try {
      const response = await login(credentials);
      const { access_token, role, user } = response.data;
      

      if (access_token) {
        localStorage.setItem("jwtToken", access_token);
        localStorage.setItem("username", user);
        localStorage.setItem("role", role); // Storing role in local storage

        role === "admin" ? navigate("/admin") : navigate("/");

      } else {
    
      }
    } catch (error) {
      if (error.response) {
      }


    }
  };

  return (
    <Container component="main" maxWidth="xl">
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        className="container-grid"
      >
        <Grid item xs={12} sm={8} md={5}>
          <Paper elevation={3} className="login-paper">
            <Typography component="h1" variant="h5" className="login-title">
              BookStore Sign-In
            </Typography>
            <form noValidate className="form-container">
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Email"
                name="username"
                autoComplete="username"
                autoFocus
                value={credentials.username}
                onChange={handleChange}
                data-testid="usernameInput"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={handleChange}
                data-testid="passwordInput"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className="login-button"
                onClick={handleLogin}
                data-testid="loginButton"
              >
                Sign-In
              </Button>

              <Typography variant="body2" className="terms-text ">
                By continuing, you agree to BookStore's{" "}
                <a href="#">Conditions of Use</a> and{" "}
                <a href="#">Privacy Notice</a>.
              </Typography>

              <Divider />

              <Button
                fullWidth
                variant="text"
                className="create-account-button"
                onClick={handleSignUp}
                data-testid="signUpButton"
              >
                Create your Book Store account
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
