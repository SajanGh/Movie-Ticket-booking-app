import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerSchema } from "../validation/signup.validation";
import { FormData } from "../validation/signup.validation";

import { authApi } from "../api/authApi";

import { useNavigate } from "react-router-dom";
import { TypeOf } from "zod";
import { GenericResponse } from "../types/types.d";
import { toast } from "sonner";

export type RegisterInput = TypeOf<typeof registerSchema>;
const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toggleShowPassword = () => setShowPassword((prevState) => !prevState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const registerUser = async (data: RegisterInput) => {
    try {
      const response = await authApi.post<GenericResponse>("/signup", data);

      if (response.data.message) {
        toast.success("Signup successfull", {});
      }
      navigate("/home");
    } catch (err) {
      toast.error("Something went wrong", {});
    }
  };

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    registerUser(values);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Container maxWidth="xs">
        <Box>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Typography variant="h4" component="h1">
              Signup
            </Typography>

            <TextField
              required
              fullWidth
              margin="normal"
              autoComplete="FirstName"
              label="FirstName"
              variant="outlined"
              {...register("firstName")}
            />
            {errors.firstName && <span>{errors.firstName.message}</span>}

            <TextField
              required
              fullWidth
              margin="normal"
              autoComplete="LastName"
              label="LastName"
              variant="outlined"
              {...register("lastName")}
            />
            {errors.lastName && <span>{errors.lastName.message}</span>}
            <TextField
              required
              fullWidth
              margin="normal"
              autoFocus
              autoComplete="Username"
              label="Username"
              variant="outlined"
              {...register("username")}
            />
            {errors.username && <span>{errors.username.message}</span>}
            <TextField
              required
              fullWidth
              margin="normal"
              autoComplete="email"
              label="Email Adress"
              variant="outlined"
              {...register("email")}
            />
            {errors.email && <span>{errors.email.message}</span>}

            <TextField
              required
              fullWidth
              margin="normal"
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              {...register("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    sx={{ cursor: "pointer" }}
                    position="end"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && <span>{errors.password.message}</span>}
            <TextField
              required
              fullWidth
              margin="normal"
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Confirm Password"
              {...register("confirmPassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    sx={{ cursor: "pointer" }}
                    position="end"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </InputAdornment>
                ),
              }}
            />
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Accept Terms and Conditions"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              {" Signup"}
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Signup;
