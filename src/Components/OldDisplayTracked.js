import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

function DisplayTracked() {
  const [results, setResults] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowTracked = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Please log in to track shows.");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("tracked_shows")
          .select("show:show_id(*)");
        if (error) {
          setError(error.message);
        } else {
          setSuccess(true);
          setResults(data);
          console.log("Successfully fetched", data);
        }
      } catch (err) {
        setError("An unexpected error occurred.");
        console.log("Error ");
      }
    };

    fetchShowTracked();
  }, []);

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
