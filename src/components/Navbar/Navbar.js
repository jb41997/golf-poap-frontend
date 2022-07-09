import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [menuClick, setMenuClick] = useState(false);

  return (
    <div>
      <nav>
        <div className="logo--bars">
          <div>
            <Link to="/" onClick={() => setMenuClick(false)}>
              <h2>
                <span className="brand--wrap">
                  Club <span className="brand--accent">Divot</span>
                </span>
              </h2>
            </Link>
          </div>
          <div
            className="menu--icon"
            onClick={() => setMenuClick((prev) => !prev)}
          >
            {menuClick ? (
              <div className="times">
                <FaTimes size={24} />
              </div>
            ) : (
              <div className="bars">
                <FaBars size={24} />
              </div>
            )}
          </div>
        </div>
        <div
          id="nav-links-full"
          className={menuClick ? "nav--links" : "nav--links close"}
        >
          <Link to="/" onClick={() => setMenuClick(false)}>
            Home
          </Link>
          <Link to="/events" onClick={() => setMenuClick(false)}>
            Events
          </Link>
          <Link to="/Trophies" onClick={() => setMenuClick(false)}>
            Trophies
          </Link>
          <Link to="/about" onClick={() => setMenuClick(false)}>
            About
          </Link>
        </div>
      </nav>
      <div
        id="nav-links-small"
        className={menuClick ? "nav--links" : "nav--links close"}
      >
        <Link to="/" onClick={() => setMenuClick(false)}>
          Home
        </Link>
        <Link to="/events" onClick={() => setMenuClick(false)}>
          Events
        </Link>
        <Link to="/Trophies" onClick={() => setMenuClick(false)}>
          Trophies
        </Link>
        <Link to="/about" onClick={() => setMenuClick(false)}>
          About
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
