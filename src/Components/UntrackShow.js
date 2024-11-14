import { useState } from "react";
import { supabase } from "../supabaseClient";

function UntrackShow({ showId, onSuccess }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUntrackShow = async () => {
    try {
      const { error } = await supabase
        .from("tracked_shows")
        .delete()
        .eq("show_id", showId);

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        console.log("Show successfully removed");
        onSuccess();
      }
    } catch (err) {
      setError("An unexpected error occured.");
      console.log("Error removing show", err);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Show successfully removed</p>}
      <button
        onClick={handleUntrackShow}
        className="bg-blue-500 text-white py-2 px-4"
      >
        Remove
      </button>
    </div>
  );
}

export default UntrackShow;
