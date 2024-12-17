import {
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import { movieReducer } from "./reducers/movie.reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  movieModule: movieReducer,
});

export const store = createStore(rootReducer, composeEnhancers());

window.gStore = store;
