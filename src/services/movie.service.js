export const movieService = {
  fetchMovies,
  getById,
  saveFavorite,
};

const AUTH_KEY = import.meta.env.VITE_AUTHORIZATION_KEY;
const ACCOUNT_ID = import.meta.env.VITE_ACCOUNT_ID;
const BASE_URL = "https://api.themoviedb.org/3/";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: AUTH_KEY,
  },
};

async function fetchMovies(page, category) {
  const url =
    category === "favorite"
      ? `${BASE_URL}/account/${ACCOUNT_ID}/favorite/movies?language=en-US&page=${page}&sort_by=created_at.asc`
      : `${BASE_URL}/movie/${category}?language=en-US&page=${page}`;

  const res = await fetch(url, options);
  try {
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();


    return data;
  } catch (err) {
    console.log("failed to retreive the movies", err);
  }
}

async function saveFavorite(id) {
  const header = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization:AUTH_KEY
    },
    body: JSON.stringify({ media_type: "movie", media_id: id, favorite: true }),
  };

  const url = `${BASE_URL}/account/${ACCOUNT_ID}/favorite`;

  try {
    const res = await fetch(url, header);

    if (!res.ok) {
      throw new Error("Failed to post data");
    }

    const response = await res.json();

    return response;
  } catch (err) {
    console.log("failed to save as favorite", err);
  }
}

async function getById(id) {

  const url = `${BASE_URL}/movie/${id}?language=en-US`;
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const movie = await res.json();

    return movie;
  } catch (err) {
    console.log("failed to retreive the movie by id", err);
  }
}
