import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { authApi } from "../api/authApi";
import { Movie } from "./HomePage";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface Showtime {
  _id: string;
  movieId: string;
  startTime: Date;
  totalSeats: number;
  seatsBooked: number;
}

export interface Booking {
  userId: string;
  numSeats: number;
  showtimeId: string;
  totalPrice: number;
}

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState<Movie>();
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | " ">(" ");
  const [selectedShowtimeDetails, setSelectedShowtimeDetails] =
    useState<Showtime | null>(null);

  const fetchMovies = useCallback(async () => {
    try {
      const response = await authApi.get(`/movies/${movieId}`);

      setMovieDetail(response.data.Movies);
    } catch (error) {
      console.log("err", error);
    }
  }, [movieId]);

  useEffect(() => {
    fetchMovies();
  }, [movieId, fetchMovies]);

  if (!movieDetail) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  const fetchShowtimes = async () => {
    try {
      const response = await authApi.get(`/showtimes/${movieId}`);

      setShowtimes(response.data.showtimes);
    } catch (error) {
      console.error("Error fetching showtimes", error);
    }
  };
  const handleShowtimeSelection = (event: SelectChangeEvent) => {
    const showtimeId = event.target.value as string;
    setSelectedShowtime(showtimeId);
    const showtimeDetails = showtimes.find(
      (showtime) => showtime._id === showtimeId
    );
    if (showtimeDetails) {
      setSelectedShowtimeDetails(showtimeDetails);
    } else {
      setSelectedShowtimeDetails(null);
    }
  };

  const handleBooking = async () => {
    try {
      const response = await authApi.post("/bookings");
      console.log(response.data);
    } catch (error) {
      console.error("booking error", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Card className="w-3/4 max-w-6xl shadow-lg border border-gray-200 hover:shadow-2xl flex relative">
        <div className="w-1/2">
          <CardMedia
            component="img"
            image={movieDetail.posterURL}
            className="object-cover h-full w-full"
          />
        </div>

        <CardContent className="w-1/2 flex flex-col justify-center">
          <div className="text-center p-4">
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="text-4xl font-extrabold text-gray-800"
            >
              {movieDetail.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              className="text-2xl font-bold text-gray-600"
            >
              Genre: {movieDetail.genre.join(", ")}
            </Typography>
            <Typography
              variant="body2"
              className="text-2xl font-bold text-gray-600 my-2"
            >
              Description: {movieDetail.description}
            </Typography>
            <Typography
              variant="body2"
              className="text-2xl font-bold text-gray-600"
            >
              Release: {new Date(movieDetail.releaseDate).toLocaleDateString()}
            </Typography>
            <Typography
              variant="body2"
              className="text-2xl font-bold text-gray-600 mb-4"
            >
              Duration: {movieDetail.duration} minutes
            </Typography>

            <Button
              variant="contained"
              onClick={fetchShowtimes}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Book Ticket
            </Button>
          </div>
          {showtimes.length > 0 && (
            <div>
              <FormControl fullWidth>
                <InputLabel>Select Showtime</InputLabel>
                <Select
                  value={selectedShowtime}
                  onChange={handleShowtimeSelection}
                >
                  {showtimes.map((showtime) => (
                    <MenuItem key={showtime._id} value={showtime._id}>
                      {new Date(showtime.startTime).toLocaleDateString()} -
                      Seats: {showtime.totalSeats - showtime.seatsBooked}{" "}
                      available
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {selectedShowtimeDetails && (
                <div>
                  <Typography>
                    Total Seats:{selectedShowtimeDetails.totalSeats}
                  </Typography>
                  <Typography>
                    Seats Booked:{selectedShowtimeDetails.seatsBooked}
                  </Typography>

                  <Button size="large" onClick={handleBooking}>
                    Confirm Booking
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MovieDetailPage;
