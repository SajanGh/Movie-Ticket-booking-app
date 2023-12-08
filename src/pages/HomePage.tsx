import { Box, CardMedia, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { authApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export interface Movie {
  _id: string;
  title: string;
  description: string;
  genre: [string];
  duration: number;
  releaseDate: Date;
  posterURL: string;
}

export interface MovieResponse {
  message: string;
  Movies: Movie[];
}

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const fetchMovies = async () => {
    try {
      const response = await authApi.get<MovieResponse>("/movies");
      if (Array.isArray(response.data.Movies)) {
        setMovies(response.data.Movies);
      } else {
        console.log("Error in the response");
      }
    } catch (error) {
      console.log("Error fetching", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const navigateToMovie = (movieId: string) => {
    navigate(`/home/${movieId}`);
  };

  return (
    <div className="mt-10 bg-red-200 flex justify-center items-center w-full">
      <Grid container spacing={2} className="my-10" justifyContent="center">
        <Grid item xs={10}>
          <Grid container spacing={2} justifyContent="center">
            {movies.map((value) => (
              <Grid
                item
                key={value._id}
                xs={12}
                sm={6}
                md={3}
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => navigateToMovie(value._id)}
              >
                <Box
                  sx={{
                    width: 250,
                    height: 350,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={value.posterURL}
                    sx={{ height: "80%", objectFit: "cover" }}
                  />
                  <Typography variant="h5" sx={{ mt: 1, textAlign: "center" }}>
                    {value.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default HomePage;
