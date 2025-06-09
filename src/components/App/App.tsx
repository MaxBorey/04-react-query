import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../api/tmdb";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import ReactPaginate from 'react-paginate';

import { useQuery, keepPreviousData } from "@tanstack/react-query";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['movies', query, currentPage],
    queryFn: () => fetchMovies({ query, page: currentPage }),
    enabled: !!query, 
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.total_pages || 0;
  const movies = data?.results || [];

  const updateQuery = (searchQuery: string) => {
    setQuery(searchQuery);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
  };

  const handleMovieSelect = (movie: Movie) => setSelectedMovie(movie);
  const handleCloseModal = () => setSelectedMovie(null);

  
  const hasShownNoResultsToast = useRef(false);
  useEffect(() => {
    if (!isLoading && data && data.results.length === 0 && query && !hasShownNoResultsToast.current) {
      toast("No movies found for your request.");
      hasShownNoResultsToast.current = true;
    }
    if (data && data.results.length > 0) {
      hasShownNoResultsToast.current = false;
    }
  }, [isLoading, data, query]);

  useEffect(() => {
    if (error) {
      toast.error(String(error));
    }
  }, [error]);

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={updateQuery} />
      
      {totalPages > 1 && !isLoading && !error && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => handlePageChange(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {isLoading && <Loader />}
      {!isLoading && error && <ErrorMessage />}
      {!isLoading && !error && (
        <MovieGrid movies={movies} onSelect={handleMovieSelect} />
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
