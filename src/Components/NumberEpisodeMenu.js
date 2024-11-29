import { supabase } from "../supabaseClient";
import { useState } from "react";

export default function NumberEpisodeMenu({
  currentEpisode,
  episodeCount,
  user,
  showId, // Pass the show ID as a prop
}) {
  const [inputValue, setInputValue] = useState(currentEpisode); // Track the current input
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const updateCurrentEpisode = async (newEpisode) => {
    try {
      const { error } = await supabase
        .from("tracked_shows")
        .update({ current_episode: newEpisode })
        .eq("show_id", showId)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error updating current episode", error);
        setError("Failed to update current episode");
      } else {
        setSuccess(true);
        console.log("Episode updated successfully");
      }
    } catch (err) {
      console.error(err);
      setError("An error has occurred when updating current episode");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Allow only numeric input and ensure it doesn't exceed episodeCount
    if (/^\d*$/.test(value) && Number(value) <= episodeCount) {
      setInputValue(value);
    }
  };

  const handleBlur = () => {
    // Update backend when the user leaves the input field
    if (inputValue !== currentEpisode) {
      updateCurrentEpisode(Number(inputValue)); // Ensure the value is numeric
    }
  };

  const handleKeyPress = (e) => {
    // Update backend on Enter key press
    if (e.key === "Enter" && inputValue !== currentEpisode) {
      updateCurrentEpisode(Number(inputValue)); // Ensure the value is numeric
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        className="w-12 text-center border border-gray-300 rounded-md p-1 focus:outline-none focus:ring focus:ring-blue-300"
        placeholder={currentEpisode.toString()}
      />
      <span>/ {episodeCount}</span>
      {error && <span className="text-red-500 text-sm">{error}</span>}
      {success && <span className="text-green-500 text-sm">Updated!</span>}
    </div>
  );
}
