export const SET_MOVIES = "SET_MOVIES";
export const SET_PAGE = "SET_PAGE";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const SET_CATEGORY = "SET_CATEGORY";

const initialState = {
  movies: [],
  page: 1,
  category: "popular",
};
export function movieReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_MOVIES:
      return { ...state, movies: action.movies };
    case SET_PAGE:
      return { ...state, page: action.page };
    case ADD_FAVORITE:
      return { ...state, Favorite: [...state.Favorite, action.movie] };
    case SET_CATEGORY:
      return { ...state, category: action.category };

    default:
      return state;
  }
}
