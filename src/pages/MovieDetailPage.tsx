import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { authApi } from "../api/authApi";
import { Movie, Showtime } from "../types/types.d";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { Add, Remove } from "@mui/icons-material";

const MovieDetailPage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { user } = useAuth();
  const userId = user?._id;
  const [movieDetail, setMovieDetail] = useState<Movie>();
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [selectedSeats, setSelectedSeasts] = useState<number>(0);
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const incrementSeats = (maxSeats) => {
    setSelectedSeasts((seats) => (seats < maxSeats ? seats + 1 : seats));
  };
  const decrementSeats = () => {
    setSelectedSeasts((seats) => (seats > 1 ? seats - 1 : seats));
  };

  useEffect(() => {
    const fetchMovieAndShowtimes = async () => {
      try {
        const movieResponse = await authApi.get(`/movies/${movieId}`);
        setMovieDetail(movieResponse.data.Movies);

        const showtimesResponse = await authApi.get(`/showtimes/${movieId}`);
        setShowtimes(showtimesResponse.data.showtimes);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchMovieAndShowtimes();
  }, [movieId]);

  if (!movieDetail) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  const handleSeatSelection = (numSeats: number, pricePerSeat: number) => {
    setSelectedSeasts(numSeats);
    setTotalPrice(numSeats * pricePerSeat);
  };

  const handleBooking = async () => {
    const selectedShowtimeData = showtimes.find(
      (showtime) => showtime._id === selectedShowtime
    );

    if (!selectedShowtime || selectedSeats <= 0) {
      toast.error("Please select a shwotime and number of seats");
      return;
    }
    const pricePerSeat = selectedShowtimeData.pricePerSeat;
    const calculatedTotalPrice = selectedSeats * pricePerSeat;

    try {
      const response = await authApi.post("/bookings", {
        userId,
        showtimeId: selectedShowtime,
        numSeats: selectedSeats,
        totalPrice: calculatedTotalPrice,
      });
      if (response.status === 201) {
        toast.success("Booking successfull");
      }
      navigate("/success");
    } catch (error) {
      console.error("Error creating booking ", error);
      toast.error("Booking Error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full pt-4">
      <Card className="w-3/4 max-w-6xl shadow-lg border border-gray-200 hover:shadow-2xl flex relative">
        <div className="md:w-1/2">
          <CardMedia
            component="img"
            image={movieDetail.posterURL}
            className="object-cover h-full w-full"
          />
        </div>

        <CardContent className="w-1/2 flex flex-col justify-start">
          <div className="text-center p-4">
            <Typography
              gutterBottom
              variant="h2"
              className="text-4xl font-extrabold text-gray-800"
            >
              {movieDetail.title}
            </Typography>
            <Typography
              variant="h4"
              color="text.secondary"
              className="text-2xl font-bold text-gray-600"
            >
              Genre: {movieDetail.genre.join(", ")}
            </Typography>
            <Typography
              variant="subtitle8"
              className="text-2xl font-bold text-gray-600 my-2"
            >
              Description: {movieDetail.description}
            </Typography>
            <Typography
              variant="body1"
              className="text-2xl font-bold text-gray-600"
            >
              Release: {new Date(movieDetail.releaseDate).toLocaleDateString()}
            </Typography>
            <Typography
              variant="body1"
              className="text-2xl font-bold text-gray-600 mb-4"
            >
              Duration: {movieDetail.duration} minutes
            </Typography>
          </div>

          <Box className="w-full p-4">
            <Typography variant="h6" className="mb-3">
              Available Showtimes
            </Typography>
            <Box className="flex flex-wrap gap-2 justify-start ">
              {showtimes.length > 0 ? (
                showtimes.map((showtime) => (
                  <Card key={showtime._id} className="p-3 flex-none w-1/3">
                    <Typography variant="h5">
                      {new Date(showtime.startTime).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </Typography>
                    <Typography>
                      Reamaining Seats:
                      {showtime.totalSeats - showtime.seatsBooked}{" "}
                    </Typography>
                    {/* <Typography>
                      Total Seats: {showtime.totalSeats}
                    </Typography> */}
                    <Typography>
                      Seats Booked: {showtime.seatsBooked}
                    </Typography>
                    <Typography>TotalPrice :{showtime.pricePerSeat}</Typography>

                    <div className="flex items-center">
                      <IconButton
                        onClick={() => decrementSeats()}
                        disabled={selectedSeats <= 1}
                      >
                        <Remove />
                      </IconButton>
                      <input
                        type="number"
                        min="1"
                        max={showtime.totalSeats - showtime.seatsBooked}
                        value={selectedSeats}
                        onChange={(e) =>
                          handleSeatSelection(
                            parseInt(e.target.value),
                            showtime.pricePerSeat
                          )
                        }
                        className="mx-2"
                      />
                      <IconButton
                        onClick={() =>
                          incrementSeats(
                            showtime.totalSeats - showtime.seatsBooked
                          )
                        }
                        disabled={
                          selectedSeats >=
                          showtime.totalSeats - showtime.seatsBooked
                        }
                      >
                        <Add />
                      </IconButton>
                    </div>

                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setSelectedShowtime(showtime._id);
                        handleBooking(showtime._id);
                      }}
                    >
                      Confirm Booking
                    </Button>
                  </Card>
                ))
              ) : (
                <Typography>No showtimes available for this movie.</Typography>
              )}
            </Box>
          </Box>
          {/* ! */}
        </CardContent>
      </Card>
    </div>
  );
};

export default MovieDetailPage;
