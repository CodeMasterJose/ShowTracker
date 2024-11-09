import React, { useState } from "react";
import { supabase } from "../supabaseClient";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [isPasswordStrong, setIsPasswordStrong] = useState(true);

  const MIN_PASSWORD_LENGTH = 8; // Define a minimum password length

  // Validate the password strength
  const validatePassword = (password) => {
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`
      );
      console.log("Password not long enough");
      setIsPasswordStrong(false);
    } else {
      setError("");
      console.log("NO error");
      setIsPasswordStrong(true);
    }
  };

  const handleSignup = async () => {
    if (!isPasswordStrong) {
      return; // Prevent submission if password is weak
    }

    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error(error.message);
        setError(error.message);
      } else {
        setSuccess(true);
        console.log("User signed up successfully:", user);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <p>The sign up page</p>
      <input
        type="text"
        placeholder="Email: example@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Strong Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          validatePassword(e.target.value);
        }}
      />
      <button onClick={handleSignup} disabled={!isPasswordStrong}>
        Submit
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Sign up successful</p>}
    </div>
  );
}

export default Signup;
