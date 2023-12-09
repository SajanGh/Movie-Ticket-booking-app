import { authApi } from "../api/authApi";
import { Movie, MovieResponse } from "../types/types.d";

export const movieService = {
  async fetchMovies(): Promise<Movie[]> {
    try {
      const response = await authApi.get<MovieResponse>("/movies");
      if (Array.isArray(response.data.Movies)) {
        return response.data.Movies;
      } else {
        console.log("Error in the response");
        return [];
      }
    } catch (error) {
      console.error("Error fetching movies", error);
      return [];
    }
  },
};
