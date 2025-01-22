import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import UntrackShow from "./UntrackShow";
import DropdownMenu from "./DropDownMenu";
import NumberEpisodeMenu from "./NumberEpisodeMenu";

function DisplayTracked({ user }) {
  // State variables to manage data and errors
  const [results, setResults] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [selectedStat, setSelectedStat] = useState("All");

  const ratingMenuItems = [
    { label: "-" },
    { label: "In Progress" },
    { label: "Done" },
    { label: "Planning to Watch" },
    { labe: "Drop" },
  ];

  const numToStatus = (e) => {
    if (e === 0) {
      return "-";
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
          <div className="overflow-x-auto">
            <div className="px-8 py-2 space-x-4 ">
              <button
                onClick={() => setSelectedStat("All")}
                className={`bg-slate-400 rounded-lg py-1 px-2 mt-2 ${
                  selectedStat === "All" ? "outline outline-slate-600" : ""
                } `}
              >
                All Shows
              </button>
              <button
                onClick={() => setSelectedStat("In Progress")}
                className={`bg-slate-400 rounded-lg py-1 px-2 mt-2 ${
                  selectedStat === "In Progress"
                    ? "outline outline-slate-600"
                    : ""
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setSelectedStat("Planning to Watch")}
                className={`bg-slate-400 rounded-lg py-1 px-2 mt-2 ${
                  selectedStat === "Planning to Watch"
                    ? "outline outline-slate-600"
                    : ""
                }`}
              >
                Planning to Watch
              </button>
              <button
                onClick={() => setSelectedStat("Done")}
                className={`bg-slate-400 rounded-lg py-1 px-2 mt-2 ${
                  selectedStat === "Done" ? "outline outline-slate-600" : ""
                }`}
              >
                Done
              </button>
            </div>
            <table className="table-auto border-collapse border border-gray-300 w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Poster</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Overview</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {results
                  .filter((item) => {
                    // Show all items if "All" is selected
                    if (selectedStat === "All") return true;

                    // Filter items by the selected status
                    return numToStatus(item.personal_review) === selectedStat;
                  })
                  .map((item) => {
                    const posterUrl = `https://image.tmdb.org/t/p/w500${item.show.poster_path}`;

                    return (
                      <tr key={item.show.id}>
                        {/* Poster */}
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <img
                            src={posterUrl}
                            className=" h-auto mx-auto"
                            alt={item.show.name}
                          />
                        </td>
                        {/* Name */}
                        <td className="border border-gray-300 px-4 py-2 text-left">
                          {item.show.name}
                        </td>
                        {/* Overview */}
                        <td className="border border-gray-300 px-4 py-2 text-left">
                          {item.show.overview}
                        </td>
                        {/* Status Dropdown */}
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <DropdownMenu
                            buttonText={numToStatus(item.personal_review)}
                            items={ratingMenuItems.map((rating, index) => ({
                              ...rating,
                              onClick: () =>
                                updatePersonalStatus(item.show.id, index),
                            }))}
                          />
                          {item.personal_review === 1 && (
                            <NumberEpisodeMenu
                              currentEpisode={item.current_episode}
                              episodeCount={item.show.number_of_episodes}
                              user={user}
                              showId={item.show.id}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No results found.</p>
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
