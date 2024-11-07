import React, { useEffect, useState } from "react";
import TrackShow from "./TrackShow";

function MovieModal({ movie, onClose }) {
  const [showTracking, setShowTracking] = useState(false);

  useEffect(() => {
    const handleEscapeKeyPress = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscapeKeyPress);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, [onClose]);

  if (!movie) return null; // Do not render anything if no movie is selected

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const handleSaveShow = () => {
    setShowTracking(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] p-6 bg-white rounded-lg shadow-lg overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center">
          <a
            href={movie.backdrop_path}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={posterUrl}
              className="w-48 h-auto"
              alt={`${movie.name} poster`}
            />
          </a>
        </div>
        <h2>{movie.name}</h2>
        <p>
          <strong>Overview:</strong> {movie.overview}
        </p>
        <p>
          <strong>Vote Average:</strong> {movie.vote_average}
        </p>
        <p>
          <strong>Vote Count:</strong> {movie.vote_count}
        </p>
        <p>
          <strong>Adult:</strong> {movie.adult ? "Yes" : "No"}
        </p>
        <p>
          <strong>Popularity:</strong> {movie.popularity}
        </p>
        <button onClick={onClose}>Close</button>
        {/* <button
          onClick={handleSaveShow}
          className="bg-green-500 text-white py-2 px-4 rounded-lg"
        >
          Save Show
        </button>
        {showTracking && <TrackShow showId={movie.id} />} */}
        <TrackShow showId={movie.id} />
      </div>
    </div>
  );
}

export default MovieModal;
