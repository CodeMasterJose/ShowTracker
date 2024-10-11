import React, { useState } from "react";
import MovieModal from "./MovieModal";
import { supabase } from "../supabaseClient";

function NewMovieSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async () => {
    if (!query) {
      setError("Please enter a search query");
      return;
    }

    const sanitizedQuery = query.replace(/[^a-zA-Z\s]/g, " ");

    try {
      // Use Supabase to perform full-text search
      // console.log("trying");
      const formattedQuery = sanitizedQuery.replace(/\s+/g, " & "); // Prepare query for tsquery format
      // const { data, error } = await supabase
      //   .from("shows") // Ensure this matches your actual table name
      //   .select("*")
      //   .textSearch("search_vector", formattedQuery, { type: "plain" })
      //   .limit(10);

      // console.log(formattedQuery);
      // console.log("Data returned:", data);
      // console.log("Error returned:", error);

      // const { data, error } = await supabase
      //   .from("shows")
      //   .select()
      //   .textSearch("name", `'big'`);

      // const { data, error } = await supabase
      //   .from("shows")
      //   .select("*")
      //   .textSearch("name", "big"); // Assuming 'big' is the term you're searching for

      const { data, error } = await supabase
        .from("shows")
        .select("*")
        .textSearch("search_vector", formattedQuery)
        .limit(15);

      console.log("Supabase Response:", { data, error });

      if (error) {
        throw new Error("Failed to fetch from Supabase");
      }

      if (data.length === 0) {
        setError("No results found");
        setResults([]);
      } else {
        setError(null);
        setResults(data);
        console.log(data);
      }
    } catch (err) {
      setError("An error occurred while fetching the results");
    }
  };
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="">
      <h1 className="">Search for Shows SUPA</h1>
      <div className="flex w-full mb-4">
        <input
          className="relative w-full  cols-start-1 cols-end-2 "
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie name or part of overview"
          onKeyUp={handleKeyPress}
        />
        <button className="cols-start-3 cols-end-3" onClick={handleSearch}>
          Search
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {results.map((movie) => (
          <li
            key={movie.id}
            className="p-4 mb-2 bg-gray-100 rounded-lg hover:bg-gray-200 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
            onClick={() => handleMovieClick(movie)}
          >
            <h3>{movie.name}</h3>
            <p>{movie.overview}</p>
          </li>
        ))}
      </ul>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default NewMovieSearch;
