export interface FormData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface GenericResponse {
  status: string;
  message: string;
}

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
export interface Showtime {
  _id: string;
  movieId: string;
  startTime: Date;
  totalSeats: number;
  seatsBooked: number;
  pricePerSeat: number;
}
