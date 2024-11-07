import { useState } from "react";
import { supabase } from "../supabaseClient";

function TrackShow({ showId }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleTrackShow = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Please log in to track shows.");
      return;
    }

    try {
      //check if show is already tracked by the user
      const { data, error } = await supabase
        .from("tracked_shows")
        .insert([{ user_id: user.id, show_id: showId }])
        .select();

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        console.log("Show successfully tracked:", data);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.log("Error tracking show", err);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Show successfully tracked!</p>}
      <button
        onClick={handleTrackShow}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        Track Show
      </button>
    </div>
  );
}
export default TrackShow;
