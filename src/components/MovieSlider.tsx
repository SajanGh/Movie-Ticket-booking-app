import { useEffect, useState } from "react";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation
import { movieService } from "../services/movieService";
import { Movie } from "../types/types.d";

const MovieSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = await movieService.fetchMovies();
      setMovies(fetchedMovies);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  if (!movies) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  const handleClick = (direction: string) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : movies.length - 1);
    } else {
      setSlideIndex(slideIndex < movies.length - 1 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Box className="relative flex items-center">
      <IconButton
        className="absolute left-0 z-10"
        onClick={() => handleClick("left")}
      >
        <ArrowBackIosNewOutlinedIcon />
      </IconButton>

      <Box
        className={`flex transition-transform duration-500 ease-in-out`}
        style={{ transform: `translateX(${-100 * slideIndex}%)` }}
      >
        {movies.map((item) => (
          <Box
            key={item._id}
            className="flex-none w-full h-full flex items-center justify-center bg-cover bg-center "
            style={{ backgroundImage: `url(${item.posterURL})` }}
          >
            <Box className="p-10 bg-gray-700 bg-opacity-50">
              <Typography variant="h5">{item.title}</Typography>
              <Typography variant="body1">{item.description}</Typography>
              <Link to="/home">
                <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  See More Movies
                </button>
              </Link>
            </Box>
          </Box>
        ))}
      </Box>

      <IconButton
        className="absolute right-0 z-10"
        onClick={() => handleClick("right")}
      >
        <ArrowForwardIosOutlinedIcon />
      </IconButton>
    </Box>
  );
};

export default MovieSlider;
