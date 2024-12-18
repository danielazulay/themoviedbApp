import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  loadMovies,
  setPage,
} from "../store/actions/movie.actions";
import { MovieList } from "../cmps/MovieList";
import { useParams } from "react-router-dom";

export function MovieIndex() {
  const { category } = useParams();

  const movies = useSelector((storeState) => storeState.movieModule.movies);
  const page = useSelector((storeState) => storeState.movieModule.page);

  useEffect(() => {
    loadMovies(page, category);
  }, [page, category]);

  useEffect(() => {
    setPage(1);
  }, [category]);

  function handlesetPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  if (!movies || movies.length === 0) return <div>Loading...</div>;

  return (
    <section className="movie-index">
      <button
        className={`button-next ${1 === page ? "hidden" : ""}`}
        onClick={handlePrevPage}
      >
        prev
      </button>

      {<MovieList movies={movies} />}

      <button className="button-next" onClick={handlesetPage}>
        next
      </button>
    </section>
  );
}
