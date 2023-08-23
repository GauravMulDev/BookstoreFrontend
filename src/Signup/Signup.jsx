import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  Grid,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import {signup} from '../Services/service'
function Signup() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    mobileNo: ""
  });
  const allFieldsFilled = Object.values(credentials).every(
    field => field.trim() !== ""
  );

  const navigate = useNavigate();
  const handleChange = event => {
    const { name, value } = event.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };
  const handleSignup = async () => {
    try {
        const response = await signup(credentials);
       
        if (response.data) {
    
            navigate("/login");
            Swal.fire("Success!", "success");
        }
    } catch (error) {
        console.error("Error during registration:", error);
        if (error.response) {
            Swal.fire(
                "Error",
                error.response.data.message || "Error during registration.",
                "error"
            );
        }
    }
};

  return (
    <Container component="main" maxWidth="sm">
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Paper
            style={{
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #ddd"
            }}
          >
            <img
         
              width="100"
              style={{ marginBottom: "1rem" }}
            />
            <Typography component="h1" variant="h5">
              Create account
            </Typography>
            <form noValidate style={{ width: "100%", marginTop: "1rem" }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Your name"
                name="username"
                autoComplete="name"
                value={credentials.username}
                onChange={handleChange}
                data-testid="usernameInput"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                autoComplete="email"
                value={credentials.email}
                onChange={handleChange}
                data-testid="emailInput"
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpenRoundedIcon />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="mobileNo"
                label="Enter Mobile Number"
                id="mobileNo"
                value={credentials.mobileNo}
                onChange={handleChange}
                data-testid="mobileNumberInput"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={{
                  margin: "1rem 0",
          
                  border: "1px solid #a88734",
                  color: "white"
                }}
                disabled={!allFieldsFilled}
                onClick={handleSignup}
                data-testid="createaccountButton"
              >
                Create your BookStore account
              </Button>
              <Typography variant="body2" align="center">
                By creating an account, you agree to BookStore's{" "}
                <a href="#">Conditions of Use</a> and{" "}
                <a href="#">Privacy Notice</a>.
              </Typography>
              <Divider style={{ margin: "20px 0" }} />
              <Typography variant="body2" align="center">
                Already have an account?
              </Typography>
              <Button
                fullWidth
                variant="text"
                style={{ marginTop: "10px" }}
                onClick={() => navigate("/login")}
                data-testid="signButton"
              >
                Sign-In
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Signup;
