export interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
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
  
  export interface MovieGridProps {
    movies: Movie[];
    onSelect: (movie: Movie) => void;
  }
  
  export interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
  }
  
  export interface SearchBarProps {
    onSubmit: (query: string) => void;
  }