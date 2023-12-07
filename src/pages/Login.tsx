import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { Link } from "react-router-dom";

import { authApi } from "../api/authApi";

import { useNavigate } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await authApi.post("/login", {
        email: email,
        password: password,
      });

      const token = await response.data.data.accessToken;

      localStorage.setItem("token", JSON.stringify(token));

      localStorage.setItem("email", JSON.stringify(email));
      navigate("/home");
    } catch (err) {
      console.log("Login error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    setEmail("");
    setLoggedIn(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <Container maxWidth="xs">
        <Box>
          {loggedIn ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <div>
              <Typography variant="h5" component="h1">

              </Typography>

              <Box>
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  autoFocus
                  autoComplete="email"
                  label="Email Address"
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        sx={{ cursor: "pointer" }}
                        position="end"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember Me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
                <div>
                  <Grid container>
                    <Grid item xs={4}>
                      <Link to="#">
                        <Typography variant="body2">
                          Forgot Password?
                        </Typography>
                      </Link>
                    </Grid>
                    <Grid item xs={8}>
                      <Link to="">
                        <Typography variant="body2">
                          {"Don't have an account? Sign up"}
                        </Typography>
                      </Link>
                    </Grid>
                  </Grid>
                </div>
              </Box>
            </div>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Login;
