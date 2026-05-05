import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";
import { removeConnections } from "../utils/connectionSlice";
import { removeRequests } from "../utils/requestSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnections());
      dispatch(removeRequests());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar-custom">
      {/* Logo */}
      <Link to="/" className="logo-text" style={{ textDecoration: "none" }}>
        ⚡ DevTinder
      </Link>

      {/* Center Nav Links (when logged in) */}
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <Link
            to="/"
            className={`nav-link ${isActive("/") ? "active" : ""}`}
            style={{ textDecoration: "none" }}
          >
            <span>🔥</span> Feed
          </Link>
          <Link
            to="/connections"
            className={`nav-link ${isActive("/connections") ? "active" : ""}`}
            style={{ textDecoration: "none" }}
          >
            <span>🤝</span> Connections
          </Link>
          <Link
            to="/requests"
            className={`nav-link ${isActive("/requests") ? "active" : ""}`}
            style={{ textDecoration: "none" }}
          >
            <span>📬</span> Requests
          </Link>
        </div>
      )}

      {/* Right: Avatar + Dropdown */}
      {user ? (
        <div style={{ position: "relative" }} ref={dropRef}>
          <button
            onClick={() => setDropOpen((v) => !v)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "40px",
              padding: "0.3rem 0.75rem 0.3rem 0.3rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              color: "#e2e8f0",
            }}
          >
            <img
              src={user.photoUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user.firstName}
              alt="avatar"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid rgba(99,102,241,0.5)",
              }}
            />
            <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
              {user.firstName}
            </span>
            <span style={{ fontSize: "0.7rem", color: "#64748b" }}>▼</span>
          </button>

          {dropOpen && (
            <>
              <div
                style={{ position: "fixed", inset: 0, zIndex: 998 }}
                onClick={() => setDropOpen(false)}
              />
              <div className="dropdown-menu">
                <Link
                  to="/profile"
                  className="dropdown-item"
                  onClick={() => setDropOpen(false)}
                  style={{ textDecoration: "none" }}
                >
                  <span>👤</span> My Profile
                </Link>
                <Link
                  to="/connections"
                  className="dropdown-item"
                  onClick={() => setDropOpen(false)}
                  style={{ textDecoration: "none" }}
                >
                  <span>🤝</span> Connections
                </Link>
                <Link
                  to="/requests"
                  className="dropdown-item"
                  onClick={() => setDropOpen(false)}
                  style={{ textDecoration: "none" }}
                >
                  <span>📬</span> Requests
                </Link>
                <div
                  style={{
                    height: 1,
                    background: "rgba(255,255,255,0.07)",
                    margin: "0.4rem 0",
                  }}
                />
                <button
                  className="dropdown-item"
                  onClick={() => { setDropOpen(false); handleLogout(); }}
                  style={{ width: "100%", border: "none", background: "none", textAlign: "left" }}
                >
                  <span>🚪</span> Logout
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="btn-primary-custom"
          style={{ width: "auto", padding: "0.5rem 1.25rem", textDecoration: "none" }}
        >
          Sign In
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
