export const movieService = {
  fetchMovies,
  getById,
  saveFavorite,
};

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDE4NzU3MTAxNDg3NTcyYjg5ZjM3MjU5MTIwNDA4ZiIsIm5iZiI6MTczMzg1MDM2Ny44NjUsInN1YiI6IjY3NTg3NGZmZTUyODQwMGNhYWMxYzRiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F3CRApb7qP2k8JW7fFuTLQxItbKuy2XbjskumYbn6j8",
  },
};

async function fetchMovies(page, category) {
  const url =
    category === "favorite"
      ? `https://api.themoviedb.org/3/account/21680977/favorite/movies?language=en-US&page=${page}&sort_by=created_at.asc`
      : `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`;

  const res = await fetch(url, options);
  try {
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    const movies = data.results;

    const response = category === "favorite" ? data : movies;

    return response;
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
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDE4NzU3MTAxNDg3NTcyYjg5ZjM3MjU5MTIwNDA4ZiIsIm5iZiI6MTczMzg1MDM2Ny44NjUsInN1YiI6IjY3NTg3NGZmZTUyODQwMGNhYWMxYzRiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F3CRApb7qP2k8JW7fFuTLQxItbKuy2XbjskumYbn6j8",
    },
    body: JSON.stringify({ media_type: "movie", media_id: id, favorite: true }),
  };

  const url = "https://api.themoviedb.org/3/account/21680977/favorite";

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
  console.log(id);
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
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
