import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { authApi } from "../api/authApi";
import { Movie, Showtime } from "../types/types.d";
import { toast } from "sonner";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const MovieDetailPage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { user } = useAuth();
  const userId = user?._id;
  const [movieDetail, setMovieDetail] = useState<Movie>();
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [selectedSeats, setSelectedSeats] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [confirmBookingShowtimeId, setConfirmBookingShowtimeId] =
    useState(null);

  useEffect(() => {
    const fetchMovieAndShowtimes = async () => {
      try {
        const movieResponse = await authApi.get(`/movies/${movieId}`);
        setMovieDetail(movieResponse.data.Movies);

        const showtimesResponse = await authApi.get(`/showtimes/${movieId}`);
        setShowtimes(showtimesResponse.data.showtimes);
      } catch (error) {
        toast.info("Showtime is not available");
      }
    };

    fetchMovieAndShowtimes();
  }, [movieId]);

  const incrementSeats = (showtimeId: string, maxSeats: number) => {
    setSelectedSeats((prevSeats) => ({
      ...prevSeats,
      [showtimeId]: Math.min((prevSeats[showtimeId] || 0) + 1, maxSeats),
    }));
  };

  const decrementSeats = (showtimeId) => {
    setSelectedSeats((prevSeats) => ({
      ...prevSeats,
      [showtimeId]: Math.max((prevSeats[showtimeId] || 0) - 1, 0),
    }));
  };

  const handleClickOpen = (showtimeId: string) => {
    setConfirmBookingShowtimeId(showtimeId);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    // Whenever selectedSeats or showtimes change, recalculate the total price
    const total = Object.entries(selectedSeats).reduce(
      (acc, [showtimeId, numSeats]) => {
        const showtime = showtimes.find((st) => st._id === showtimeId);
        const pricePerSeat = showtime?.pricePerSeat ?? 0;
        return acc + numSeats * pricePerSeat;
      },
      0
    );
    setTotalPrice(total);
  }, [selectedSeats, showtimes]);

  const handleConfirmBooking = async () => {
    if (!confirmBookingShowtimeId || !selectedSeats[confirmBookingShowtimeId]) {
      toast.error("Please select a showtime and number of seats");
      return;
    }

    const numSeats = selectedSeats[confirmBookingShowtimeId];
    const selectedShowtimeData = showtimes.find(
      (showtime) => showtime._id === confirmBookingShowtimeId
    );
    const pricePerSeat = selectedShowtimeData
      ? selectedShowtimeData.pricePerSeat
      : 0;
    const calculatedTotalPrice = numSeats * pricePerSeat;

    try {
      const response = await authApi.post("/bookings", {
        userId,
        showtimeId: confirmBookingShowtimeId,
        numSeats,
        totalPrice: calculatedTotalPrice,
      });
      toast.success("Booking successful");
      const bookingId = response.data.booking._id;
      navigate(`/bookings/${bookingId}`);
    } catch (error) {
      console.error("Error creating booking", error);
      toast.error("Booking Error");
    } finally {
      handleClose();
    }
  };

  if (!movieDetail) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  if (!showtimes) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Card className="flex flex-col md:flex-row w-full max-w-6xl mx-auto my-4 shadow-lg border border-gray-200 hover:shadow-2xl">
        <div className="md:w-1/2 flex-shrink-0">
          <CardMedia
            component="img"
            image={movieDetail.posterURL}
            className="object-cover h-full w-full"
          />
        </div>
        <CardContent className="w-1/2 flex flex-col justify-start overflow-auto">
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
              variant="subtitle1"
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
            <Box className="flex flex-wrap gap-2 justify-start">
              {showtimes.length > 0 ? (
                showtimes.map((showtime) => (
                  <Card key={showtime._id} className="p-3 flex-none md:w-1/1">
                    <Typography variant="body1">
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
                      Remaining Seats:{" "}
                      {showtime.totalSeats - showtime.seatsBooked}{" "}
                    </Typography>
                    <Typography>
                      Seats Booked: {showtime.seatsBooked}
                    </Typography>
                    <Typography>Seat Price: {showtime.pricePerSeat}</Typography>


                    <div className="flex items-center">
                      <IconButton
                        onClick={() => decrementSeats(showtime._id)}
                        disabled={selectedSeats[showtime._id] <= 1}
                      >
                        <Remove />
                      </IconButton>
                      <input
                        type="number"
                        min="1"
                        max={showtime.totalSeats - showtime.seatsBooked}
                        value={selectedSeats[showtime._id] || 0}
                        onChange={(e) =>
                          setSelectedSeats({
                            ...selectedSeats,
                            [showtime._id]: Math.min(
                              parseInt(e.target.value),
                              showtime.totalSeats - showtime.seatsBooked
                            ),
                          })
                        }
                        className="mx-2"
                      />
                      <IconButton
                        onClick={() =>
                          incrementSeats(
                            showtime._id,
                            showtime.totalSeats - showtime.seatsBooked
                          )
                        }
                        disabled={
                          selectedSeats[showtime._id] >=
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
                      onClick={() => handleClickOpen(showtime._id)}
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
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Confirm Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to confirm this booking?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmBooking} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MovieDetailPage;
