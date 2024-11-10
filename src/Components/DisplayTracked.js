import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

function DisplayTracked({ user }) {
  // accepting user as a prop
  const [results, setResults] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowTracked = async () => {
      if (!user) {
        setError("Please log in to track shows.");
        setResults([]);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("tracked_shows")
          .select("show:show_id(*)")
          .eq("user_id", user.id); // filtering by logged-in user

        if (error) {
          setError(error.message);
        } else {
          setSuccess(true);
          setResults(data);
          console.log("Successfully fetched", data);
        }
      } catch (err) {
        setError("An unexpected error occurred.");
        console.log("Error ", err);
      }
    };

    fetchShowTracked();
  }, [user]); // refetch whenever the user changes

  return (
    <div>
      <p>Hello World</p>
      <ul>
        {results.map((item) => (
          <li key={item.show.id}>
            <h3>{item.show.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayTracked;
