import { SET_MOVIES, SET_PAGE } from "../reducers/movie.reducer";
import { movieService } from "../../services/movie.service";
import { store } from "../store";

export async function loadMovies(page, category) {
  try {
    const movies = await movieService.fetchMovies(page, category);
    store.dispatch({ type: SET_MOVIES, movies });
  } catch (err) {
    console.log("Had issues loading the movies", err);
    throw err;
  }
}

export function setPage(page) {
  try {
    store.dispatch({ type: SET_PAGE, page });
  } catch (err) {
    console.log("Had issues loading the next page", err);
    throw err;
  }
}

export async function loadMyFavorite(page) {
  try {
    const data = await movieService.getMyFavorite(page);
    const movies = data.results;
    console.log(data);
    store.dispatch({ type: SET_MOVIES, movies });

    return data;
  } catch (err) {
    console.log("Had issues loading the movies", err);
    throw err;
  }
}

export async function addFavorite(id) {
  try {
    await movieService.saveFavorite(id);
  } catch (err) {
    console.log("Had issues savind favorite", err);
    throw err;
  }
}
