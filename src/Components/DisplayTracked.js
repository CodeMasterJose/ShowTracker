import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import UntrackShow from "./UntrackShow";
import DropdownMenu from "./DropDownMenu";

function DisplayTracked({ user }) {
  // State variables to manage data and errors
  const [results, setResults] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  const ratingMenuItems = [
    { label: "Empty" },
    { label: "In Progress" },
    { label: "Done" },
    { label: "Planning to Watch" },
    { labe: "Drop" },
  ];

  const numToStatus = (e) => {
    if (e === 0) {
      return "Empty";
    } else if (e === 1) {
      return "In Progress";
    } else if (e === 2) {
      return "Done";
    } else if (e === 3) {
      return "Planning to Watch";
    } else if (e === 4) {
      return "Dropped";
    } else {
      return "Planning to Watch";
    }
  };

  const updatePersonalStatus = async (showId, newStatus) => {
    try {
      const { error } = await supabase
        .from("tracked_shows")
        .update({ personal_review: newStatus })
        .eq("show_id", showId)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error updating personal status", error);
        setError("Failed to update personal status");
      } else {
        setSuccess(true);
        setResults((prevResults) =>
          prevResults.map((item) =>
            item.show.id === showId
              ? { ...item, personal_review: newStatus }
              : item
          )
        );
      }
    } catch (err) {
      console.error("Unexpected error when updating review", err);
      setError("An unexpected error occured when updating Review");
    }
  };

  const fetchShowTracked = async () => {
    if (!user) {
      setError("Please log in to track shows.");
      setResults([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true); // Start loading when the request is made
      const { data, error } = await supabase
        .from("tracked_shows")
        .select("show:show_id(*), personal_review, current_episode")
        .eq("user_id", user.id); // Filtering by logged-in user

      if (error) {
        // Handle any error that Supabase returns
        console.error("Supabase error:", error); // Log full error object for debugging
        setError(error.message); // Set error message
      } else {
        setSuccess(true);

        //Sort the results
        const sortOrder = [
          "In Progress",
          "Planning to Watch",
          "Done",
          "Dropped",
        ];
        const sortedData = data.sort(
          (a, b) =>
            sortOrder.indexOf(numToStatus(a.personal_review)) -
            sortOrder.indexOf(numToStatus(b.personal_review))
        );

        setResults(sortedData); // Set results if data is fetched
        console.log(sortedData);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error("Error:", err); // Log unexpected errors for debugging
    } finally {
      setLoading(false); // Stop loading when request is done
    }
  };

  useEffect(() => {
    // Only fetch if user is defined
    if (user) {
      fetchShowTracked();
    } else {
      setLoading(false); // Stop loading if no user
    }
  }, [user]); // Refetch whenever the user changes

  const handleUntrackSuccess = () => {
    fetchShowTracked(); // Refetch tracked shows after untracking
  };

  return (
    <div>
      {loading && !error && <p>Loading tracked shows...</p>}{" "}
      {/* Show loading message */}
      <ul>
        {results.length > 0 ? (
          results.map((item) => {
            const posterUrl = `https://image.tmdb.org/t/p/w500${item.show.poster_path}`;

            return (
              <li key={item.show.id} className="grid p-4">
                <h3 className="">{item.show.name}</h3>
                <div className="flex space-x-5">
                  <img
                    src={posterUrl}
                    className="w-24 h-auto"
                    alt={item.show.name}
                  />
                  <p className="">{item.show.overview}</p>
                  <DropdownMenu
                    buttonText={numToStatus(item.personal_review)}
                    items={ratingMenuItems.map((rating, index) => ({
                      ...rating,
                      onClick: () => updatePersonalStatus(item.show.id, index),
                    }))}
                  />
                  {/* Conditional button that displays episode number if "in
                  progress" */}
                  {item.personal_review === 1 && (
                    <DropdownMenu
                      buttonText={`${item.current_episode || 1}`}
                      items={Array.from(
                        { length: item.show.number_of_episodes },
                        (_, index) => ({
                          label: `${index + 1}`, // Display episode number starting from 1
                          // onClick: () =>
                          //   updateCurrentEpisode(item.show.id, index + 1), // Update episode when clicked
                        })
                      )}
                      menuClassName="max-h-48 overflow-y-auto"
                    />
                  )}

                  <UntrackShow
                    showId={item.show.id}
                    onSuccess={handleUntrackSuccess}
                  />
                </div>
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
