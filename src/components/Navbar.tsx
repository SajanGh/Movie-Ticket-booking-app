import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  isLoggedIn: boolean;
}
const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<User>(JSON.parse(token));
      setUser({ ...decoded, isLoggedIn: true });
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null!);
    navigate("/login");
  };

  return (
    <AppBar position="static" className="bg-blue-600">
      <Toolbar>
        <Typography variant="h6" noWrap component="div" className="flex-grow">
          <Link to="/">Cinema </Link>
        </Typography>
        <Button color="inherit">
          <Link to="/home">Movies</Link>
        </Button>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <div className="flex items-center ml-auto">
          {user && user.isLoggedIn ? (
            <div>
              <Typography variant="subtitle1" className="mr-2">
                {user.firstName} {user.lastName}
              </Typography>
              <Button color="inherit" variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button color="inherit">
                <Link to="/login">Login</Link>
              </Button>
              <Button color="inherit">
                <Link to="/signup">Signup</Link>
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
