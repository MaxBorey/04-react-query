import type { Movie } from "./../types/movie";

export interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

export interface FetchMoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }
  
export interface FetchMoviesParams {
    query: string;
    page?: number;
}

export interface SearchBarProps {
    onSubmit: (query: string) => void;
}
  
export interface MovieGridProps {
    movies: Movie[];
    onSelect: (movie: Movie) => void;
  }