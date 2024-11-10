import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import MovieSearch from "./Components/MovieSearch";
import NewMovieSearch from "./Components/NewMovieSearch";
import "./index.css";
import "./App.css";

function App() {
  const [user, setUser] = useState(null); // State for user login

  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser}>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/search" element={<NewMovieSearch />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
