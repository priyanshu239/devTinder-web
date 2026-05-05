import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [actionLoading, setActionLoading] = useState({});
  const [toast, setToast] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleReview = async (status, requestId) => {
    setActionLoading((prev) => ({ ...prev, [requestId]: true }));
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
      showToast(
        status === "accepted" ? "🎉 Connection accepted!" : "Request rejected",
        status === "accepted" ? "success" : "error"
      );
    } catch (err) {
      showToast("Action failed. Please try again.", "error");
    } finally {
      setActionLoading((prev) => ({ ...prev, [requestId]: false }));
    }
  };

  if (!requests) {
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

  if (requests.length === 0) {
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
          <span className="empty-state-icon">📬</span>
          <h3>No pending requests</h3>
          <p>
            When other developers express interest in you, they&apos;ll appear
            here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-container">
      <div className="page-header animate-in">
        <h1 className="gradient-text">Connection Requests</h1>
        <p>
          {requests.length} pending request
          {requests.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {requests.map((req, idx) => {
          const sender = req.fromUserId;
          const fallback = `https://api.dicebear.com/7.x/avataaars/svg?seed=${sender.firstName}${sender.lastName}`;
          const isLoading = actionLoading[req._id];

          return (
            <div
              key={req._id}
              className="person-card animate-in"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {/* Avatar */}
              <div className="avatar-ring">
                <img
                  src={sender.photoUrl || fallback}
                  alt={sender.firstName}
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
                    {sender.firstName} {sender.lastName}
                  </h3>
                  {sender.age && (
                    <span style={{ color: "#64748b", fontSize: "0.8rem" }}>
                      · {sender.age}
                    </span>
                  )}
                </div>

                {sender.about && (
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
                    {sender.about}
                  </p>
                )}

                {sender.skills && sender.skills.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.3rem",
                      marginTop: "0.4rem",
                    }}
                  >
                    {sender.skills.slice(0, 3).map((s, i) => (
                      <span key={i} className="skill-badge">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexShrink: 0,
                }}
              >
                <button
                  className="btn-reject"
                  onClick={() => handleReview("rejected", req._id)}
                  disabled={isLoading}
                >
                  {isLoading ? "..." : "✕"}
                </button>
                <button
                  className="btn-accept"
                  onClick={() => handleReview("accepted", req._id)}
                  disabled={isLoading}
                >
                  {isLoading ? "..." : "✓ Accept"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {toast && (
        <div className={toast.type === "success" ? "toast-success" : "toast-error"}>
          {toast.msg}
        </div>
      )}
    </div>
  );
};

export default Requests;
