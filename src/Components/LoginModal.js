import React, { useState } from "react";
import { supabase } from "../supabaseClient";

function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        console.log("Login successful:", data);
        onClose(); // Close the modal on success
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
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
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

export default LoginModal;
