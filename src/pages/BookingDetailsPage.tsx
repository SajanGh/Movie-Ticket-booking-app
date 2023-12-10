import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authApi } from "../api/authApi";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

export interface BookingDetails {
  _id: string;
  userId: string;
  numSeats: number;
  showtimeId: {
    movieId: string;
    startTime: string;
    totalSeats: number;
    seatsBooked: number;
  };
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

const BookingDetailsPage = () => {
  const { bookingId } = useParams();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null
  );

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await authApi.get(`bookings/${bookingId}`);
        setBookingDetails(response.data.booking);
      } catch (error) {
        console.error("Error fetching booking details", error);
      } finally {
        setLoading(false);
      }
    };
    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);

  if (loading) {
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

  if (!bookingDetails) {
    return <Typography variant="h5">Booking not found</Typography>;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f7"
    >
      <Card sx={{ minWidth: 275, maxWidth: 500, m: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography
            sx={{ fontSize: 24, fontWeight: "bold", mb: 2, color: "#424242" }}
            gutterBottom
          >
            Booking Details
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Booking Id: {bookingDetails._id}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Number of Seats: {bookingDetails.numSeats}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Total Price: Rs.{bookingDetails.totalPrice}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Showtime:{" "}
            {new Date(bookingDetails.showtimeId.startTime).toLocaleString()}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="large"
            variant="contained"
            sx={{
              bgcolor: "#1976d2",
              "&:hover": { bgcolor: "#115293" },
              width: "100%",
            }}
          >
            Proceed to Pay
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default BookingDetailsPage;
