import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: "3px solid rgba(99,102,241,0.3)",
            borderTopColor: "#6366f1",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); }}`}</style>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="empty-state animate-in">
          <span className="empty-state-icon">🤝</span>
          <h3>No connections yet</h3>
          <p>
            Start swiping in the feed to connect with developers you like.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container">
      <div className="page-header animate-in">
        <h1 className="gradient-text">My Connections</h1>
        <p>
          {connections.length} developer
          {connections.length !== 1 ? "s" : ""} in your network
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {connections.map((conn, idx) => {
          const fallback = `https://api.dicebear.com/7.x/avataaars/svg?seed=${conn.firstName}${conn.lastName}`;
          return (
            <div
              key={conn._id || idx}
              className="person-card animate-in"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {/* Avatar */}
              <div className="avatar-ring">
                <img
                  src={conn.photoUrl || fallback}
                  alt={conn.firstName}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  onError={(e) => (e.target.src = fallback)}
                />
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: "#e2e8f0",
                    }}
                  >
                    {conn.firstName} {conn.lastName}
                  </h3>
                  {conn.age && (
                    <span style={{ color: "#64748b", fontSize: "0.8rem" }}>
                      · {conn.age}
                    </span>
                  )}
                </div>

                {conn.about && (
                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.82rem",
                      lineHeight: 1.4,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {conn.about}
                  </p>
                )}

                {conn.skills && conn.skills.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.3rem",
                      marginTop: "0.4rem",
                    }}
                  >
                    {conn.skills.slice(0, 4).map((s, i) => (
                      <span key={i} className="skill-badge">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Message button */}
              <button
                className="btn-secondary-custom"
                style={{ flexShrink: 0, fontSize: "0.8rem" }}
              >
                💬 Message
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
