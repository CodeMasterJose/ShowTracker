import React, { useState } from "react";
import { supabase } from "../supabaseClient";

function LoginModal({ onClose, setUser }) {
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
        onClose();
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div
        className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-xl text-center space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome to Show Tracker
        </h2>
        <p className="text-gray-600 mb-6">
          Please enter your credentials to continue
        </p>

        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Log In
        </button>

        <button
          onClick={onClose}
          className="w-full py-2 px-4 mt-2 text-gray-500 hover:text-gray-700 transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
