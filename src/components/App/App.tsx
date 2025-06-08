import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../api/tmdb";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (searchQuery: string, page = 1) => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchMovies({ query: searchQuery, page });
      setMovies(result.results);
      setTotalPages(result.total_pages);
      setCurrentPage(page);
      if (result.results.length === 0) {
        toast("No movies found for your request.");
      }
    } catch (err) {
      const message = String(err);
      setError(message);
      toast.error(message);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    handleSearch(query, newPage);
  };

  const updateQuery = (searchQuery: string) => {
    setQuery(searchQuery);
    handleSearch(searchQuery, 1);
  };

  const handleMovieSelect = (movie: Movie) => setSelectedMovie(movie);
  const handleCloseModal = () => setSelectedMovie(null);

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={updateQuery} />
      {isLoading && <Loader />}
      {!isLoading && error && <ErrorMessage />}
      {!isLoading && !error && (
        <MovieGrid movies={movies} onSelect={handleMovieSelect} />
      )}
      {totalPages > 1 && !isLoading && !error && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            Prev
          </button>
          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.paginationButton}
          >
            Next
          </button>
        </div>
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: { background: "#f40", color: "#fff" },
          error: { style: { background: "#f40", color: "#fff" } },
          success: { style: { background: "#2c7", color: "#fff" } },
        }}
      />
    </div>
  );
}
