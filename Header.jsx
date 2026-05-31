
import { Link } from "react-router-dom";

function Header() {
  const name = localStorage.getItem("username");

  return (
    <header className="header">
      <h2>🏨 Hotel Revenue Management Dashboard</h2>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>

      <div>
        {name && <span>Welcome, {name}</span>}
      </div>
    </header>
  );
}

export default Header;