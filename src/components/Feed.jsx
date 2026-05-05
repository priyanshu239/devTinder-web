import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const getFeed = async () => {
    if (feed) return;
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleIgnore = async (userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/ignored/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
      showToast("Passed 👋", "error");
    } catch (err) {
      // Already requested or error — still remove from view
      dispatch(removeUserFromFeed(userId));
    }
  };

  const handleInterested = async (userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/interested/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
      showToast("Interest sent! 💜", "success");
    } catch (err) {
      dispatch(removeUserFromFeed(userId));
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            border: "3px solid rgba(99,102,241,0.3)",
            borderTopColor: "#6366f1",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <p style={{ color: "#64748b", fontWeight: 500 }}>Finding developers…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); }}`}</style>
      </div>
    );
  }

  if (!feed || feed.length === 0) {
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
          <span className="empty-state-icon">🎉</span>
          <h3>You&apos;ve seen everyone!</h3>
          <p>Check back later for new developers to connect with.</p>
          <button
            className="btn-primary-custom"
            style={{ width: "auto", padding: "0.7rem 2rem", marginTop: "1.5rem" }}
            onClick={() => dispatch(addFeed(null))}
          >
            Refresh Feed
          </button>
        </div>
      </div>
    );
  }

  const currentUser = feed[0];

  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem 5rem",
        gap: "1.5rem",
      }}
    >
      {/* Stack counter */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "#64748b",
          fontSize: "0.875rem",
          fontWeight: 500,
        }}
      >
        <span>👥</span>
        <span>{feed.length} developer{feed.length !== 1 ? "s" : ""} left to explore</span>
      </div>

      {/* Card stack visual */}
      <div style={{ position: "relative" }}>
        {/* Back card ghost (if >1 user) */}
        {feed.length > 1 && (
          <div
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              right: -8,
              bottom: -8,
              background: "rgba(17,24,39,0.6)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 24,
              zIndex: 0,
            }}
          />
        )}

        {/* Active card */}
        <div style={{ position: "relative", zIndex: 1 }} className="animate-in">
          <UserCard
            user={currentUser}
            onIgnore={() => handleIgnore(currentUser._id)}
            onInterested={() => handleInterested(currentUser._id)}
          />
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={toast.type === "success" ? "toast-success" : "toast-error"}>
          {toast.msg}
        </div>
      )}
    </div>
  );
};

export default Feed;