import { useState } from "react";

const SKILL_COLORS = {
  React: "#61dafb",
  "Node.js": "#3c873a",
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  MongoDB: "#4db33d",
  Express: "#999",
  "Next.js": "#fff",
  Vue: "#41b883",
  Angular: "#dd0031",
  Docker: "#2496ed",
  AWS: "#ff9900",
  GraphQL: "#e10098",
  default: "#6366f1",
};

const UserCard = ({ user, onIgnore, onInterested, showActions = true }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;
  const [swipeClass, setSwipeClass] = useState("");

  const handleIgnore = () => {
    setSwipeClass("swipe-left");
    setTimeout(() => onIgnore && onIgnore(), 400);
  };

  const handleInterested = () => {
    setSwipeClass("swipe-right");
    setTimeout(() => onInterested && onInterested(), 400);
  };

  const fallbackPhoto =
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`;

  return (
    <div className={`feed-card ${swipeClass}`}>
      {/* Profile Image */}
      <div style={{ position: "relative" }}>
        <img
          src={photoUrl || fallbackPhoto}
          alt={`${firstName}'s photo`}
          className="feed-card-image"
          onError={(e) => (e.target.src = fallbackPhoto)}
        />

        {/* Gender/Age badge */}
        {(age || gender) && (
          <div
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              padding: "0.3rem 0.75rem",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#e2e8f0",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            {gender === "male" ? "♂️" : gender === "female" ? "♀️" : "⚧️"}
            {age ? ` ${age}` : ""}
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="feed-card-overlay">
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              marginBottom: "0.25rem",
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            {firstName} {lastName}
          </h2>

          {about && (
            <p
              style={{
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.5,
                marginBottom: "0.75rem",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {about}
            </p>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.4rem",
                marginBottom: "0.5rem",
              }}
            >
              {skills.slice(0, 5).map((skill, i) => (
                <span
                  key={i}
                  className="skill-badge"
                  style={{
                    borderColor:
                      (SKILL_COLORS[skill] || SKILL_COLORS.default) + "55",
                    color: SKILL_COLORS[skill] || SKILL_COLORS.default,
                    background:
                      (SKILL_COLORS[skill] || SKILL_COLORS.default) + "15",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1.5rem",
            padding: "1.25rem",
            background: "rgba(10,15,30,0.5)",
          }}
        >
          <button
            className="btn-ignore"
            onClick={handleIgnore}
            title="Pass"
          >
            ✕
          </button>

          <button
            className="btn-super"
            onClick={() => {}} 
            title="Super Like"
            style={{ transform: "scale(0.85)" }}
          >
            ⭐
          </button>

          <button
            className="btn-interested"
            onClick={handleInterested}
            title="Interested"
          >
            ♥
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
