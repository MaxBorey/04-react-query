import axios from "axios";
import type {FetchMoviesResponse, FetchMoviesParams} from '../types/types'

export async function fetchMovies({
  query,
  page = 1,
}: FetchMoviesParams): Promise<FetchMoviesResponse> {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  const response = await axios.get<FetchMoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}