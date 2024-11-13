import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

function DisplayTracked({ user }) {
  // State variables to manage data and errors
  const [results, setResults] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchShowTracked = async () => {
      if (!user) {
        setError("Please log in to track shows.");
        setResults([]);
        setLoading(false); // Stop loading if user is not logged in
        return;
      }

      try {
        setLoading(true); // Start loading when the request is made
        const { data, error } = await supabase
          .from("tracked_shows")
          .select("show:show_id(*)")
          .eq("user_id", user.id); // Filtering by logged-in user

        if (error) {
          // Handle any error that Supabase returns
          console.error("Supabase error:", error); // Log full error object for debugging
          setError(error.message); // Set error message
        } else {
          setSuccess(true);
          setResults(data); // Set results if data is fetched
        }
      } catch (err) {
        setError("An unexpected error occurred.");
        console.error("Error:", err); // Log unexpected errors for debugging
      } finally {
        setLoading(false); // Stop loading when request is done
      }
    };

    // Only fetch if user is defined
    if (user) {
      fetchShowTracked();
    } else {
      setLoading(false); // Stop loading if no user
    }
  }, [user]); // Refetch whenever the user changes

  return (
    <div>
      {loading && !error && <p>Loading tracked shows...</p>}{" "}
      {/* Show loading message */}
      <ul>
        {results.length > 0 ? (
          results.map((item) => {
            const posterUrl = `https://image.tmdb.org/t/p/w500${item.show.poster_path}`;

            return (
              <li key={item.show.id} className="p-4">
                <img
                  src={posterUrl}
                  className="w-20 h-auto"
                  alt={item.show.name}
                />
                <h3>{item.show.name}</h3>
                <p>{item.show.overview}</p>
              </li>
            );
          })
        ) : (
          <p>No tracked shows found.</p> // Show message when no shows are found
        )}
      </ul>
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Display any error */}
      {!user && !loading && (
        <p className="text-yellow-500">Please log in to track shows.</p>
      )}{" "}
    </div>
  );
}

export default DisplayTracked;
