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
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginService } from "../services/loginService";
import { useAuth } from "../contexts/AuthContext";

/* eslint-disable @typescript-eslint/no-explicit-any */

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await loginService(
        credentials.email,
        credentials.password
      );
      localStorage.setItem("token", JSON.stringify(response.token));
      localStorage.setItem("email", JSON.stringify(credentials.email));
      login(response.token);

      toast.success("Signup successfull", {});
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong", {});
      console.log("Login error:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
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
              <Typography variant="h5" component="h1"></Typography>
              <Box>
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  autoFocus
                  autoComplete="email"
                  label="Email Address"
                  variant="outlined"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                />

                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        sx={{ cursor: "pointer" }}
                        position="end"
                        onClick={toggleShowPassword}
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
