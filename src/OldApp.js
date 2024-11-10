import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import MovieSearch from "./Components/MovieSearch";
import NewMovieSearch from "./Components/NewMovieSearch";
import Header from "./Components/Header";
import Signup from "./Components/Signup";
import "./index.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<NewMovieSearch />} />;
          <Route path="/signup" element={<Signup />} />;
        </Routes>
      </Header>
    </BrowserRouter>
  );
}
export default App;
