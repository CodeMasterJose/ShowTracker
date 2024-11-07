import { supabase } from "../supabaseClient";
import React, { useState } from "react";

function SignoutModal({ onClose }) {
  const [error, setError] = useState(null);
  const HandleSignout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
      } else {
        console.log("Logout successful:");
        onClose();
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Login error:", err);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
        <div
          className="relative w-full max-w-2xl h-2/3 p-6 bg-white rounded-lg shadow-lg overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h1>Hello World</h1>
          <button
            onClick={HandleSignout}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
          >
            Submit
          </button>

          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default SignoutModal;
