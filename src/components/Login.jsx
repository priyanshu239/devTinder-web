import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: 440 }}>
        {/* Hero text */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>⚡</div>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: "0.5rem",
            }}
            className="gradient-text"
          >
            {isLogin ? "Welcome back" : "Join DevTinder"}
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
            {isLogin
              ? "Connect with developers who match your vibe"
              : "Find your perfect dev teammate"}
          </p>
        </div>

        <div className="auth-card animate-in">
          {/* Tab Toggle */}
          <div className="tab-toggle">
            <button
              className={`tab-btn ${isLogin ? "active" : ""}`}
              onClick={() => { setIsLogin(true); setError(""); }}
            >
              Sign In
            </button>
            <button
              className={`tab-btn ${!isLogin ? "active" : ""}`}
              onClick={() => { setIsLogin(false); setError(""); }}
            >
              Sign Up
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {!isLogin && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Priyanshu"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Kumar"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (isLogin ? handleLogin() : handleSignup())}
              />
            </div>

            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (isLogin ? handleLogin() : handleSignup())}
              />
            </div>

            {error && (
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  borderRadius: "10px",
                  padding: "0.6rem 0.9rem",
                  color: "#f87171",
                  fontSize: "0.85rem",
                }}
              >
                ⚠️ {error}
              </div>
            )}

            <button
              className="btn-primary-custom"
              onClick={isLogin ? handleLogin : handleSignup}
              disabled={loading}
              style={{ marginTop: "0.5rem", opacity: loading ? 0.7 : 1 }}
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Sign In →"
                : "Create Account →"}
            </button>
          </div>

          <p
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
              color: "#64748b",
              fontSize: "0.85rem",
            }}
          >
            {isLogin ? "New to DevTinder? " : "Already have an account? "}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(""); }}
              style={{
                background: "none",
                border: "none",
                color: "#a5b4fc",
                fontWeight: 600,
                cursor: "pointer",
                padding: 0,
              }}
            >
              {isLogin ? "Sign up →" : "Sign in →"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
