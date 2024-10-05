import React, { useState } from "react";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query) {
      setError("Please enter a search query");
      return;
    }

    const sanitizedQuery = query.replace(/[^a-zA-Z\s]/g, " ");

    try {
      const response = await fetch(
        `http://192.168.5.234:5500/api/shows/search?query=${encodeURIComponent(
          sanitizedQuery
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();

      if (response.status === 404) {
        setError("No results found");
        setResults([]);
      } else {
        setError(null);
        setResults(data);
      }
    } catch (err) {
      setError("An error occurred while fetching the results");
    }
  };

  return (
    <div>
      <h1>Search for Movies</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter movie name or part of overview"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {results.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.name}</h3>
            <p>{movie.overview}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSearch;
