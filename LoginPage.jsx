
import { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    localStorage.setItem("username", username);
    alert("Login Successful");
  };

  return (
    <div className="form">
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Enter Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;