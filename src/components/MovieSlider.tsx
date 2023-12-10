import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

import theaterImage from "../assets/theater.png";
const MovieSlider = () => {
  return (
    <Box
      className="relative w-full h-screen "
      style={{
        backgroundImage: `url(${theaterImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflowY: "hidden",
      }}
    >
      <Box
        className="absolute inset-0 overflow-y:hidden"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          p={4}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: "white",
              mb: 2,
              textAlign: "center",
            }}
          >
            Movie Tickets Booking
          </Typography>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "gold",
                color: "black",
                fontWeight: "bold",
              }}
            >
              See Available Movies
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieSlider;
