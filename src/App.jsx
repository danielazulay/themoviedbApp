import { store } from "./store/store";
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from "react-router-dom";
import { Provider } from "react-redux";
import { MovieIndex } from "./pages/MovieIndex";
import { AppHeader } from "./cmps/AppHeader";
import { MovieDetails } from "./pages/MovieDetails";


export function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppHeader />
        <section className="main-app">
          <main className="container">
            <Routes>
              <Route path="/" element={<Navigate to="/popular" />} />
              <Route path="/:url" element={<MovieIndex />} />
              <Route path="/details/:movieId" element={<MovieDetails />} />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  );
}
