import { Link } from "react-router-dom";

import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          FuturePod
        </Link>
      </div>
    </nav>
  );
}
