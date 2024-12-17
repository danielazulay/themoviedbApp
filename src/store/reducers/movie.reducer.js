export const SET_MOVIES = "SET_MOVIES";
export const SET_PAGE = "SET_PAGE";
export const ADD_FAVORITE = "ADD_FAVORITE";

const initialState = {
    movies: [],
    page: 1,
};
export function movieReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_MOVIES:
            return { ...state, movies: action.movies };
        case SET_PAGE:
            return { ...state, page: action.page };
        case ADD_FAVORITE:
            return { ...state, Favorite: [...state.Favorite, action.movie] };
        default:
            return state;
    }
}
