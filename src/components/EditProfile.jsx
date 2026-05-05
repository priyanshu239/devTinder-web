import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "male");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [skills, setSkills] = useState((user.skills || []).join(", "));
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const [saving, setSaving] = useState(false);

  const dispatch = useDispatch();

  const previewUser = {
    ...user,
    firstName,
    lastName,
    age: age ? Number(age) : undefined,
    gender,
    about,
    photoUrl,
    skills: skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  };

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age: age ? Number(age) : undefined,
          gender,
          about,
          photoUrl,
          skills: skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setToast(true);
      setTimeout(() => setToast(false), 2500);
    } catch (err) {
      setError(err?.response?.data || "Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: "2rem 1rem 6rem" }}>
      <div className="page-header">
        <h1 className="gradient-text">Edit Profile</h1>
        <p>Update your developer profile to find better matches</p>
      </div>

      <div className="edit-profile-layout">
        {/* Form */}
        <div
          className="glass-strong"
          style={{ borderRadius: 24, padding: "1.75rem" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div>
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div>
                <label className="form-label">Age</label>
                <input
                  type="number"
                  className="form-input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                  min="18"
                  max="100"
                />
              </div>
              <div>
                <label className="form-label">Gender</label>
                <select
                  className="form-input"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  style={{ cursor: "pointer" }}
                >
                  <option value="male">♂️ Male</option>
                  <option value="female">♀️ Female</option>
                  <option value="other">⚧️ Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="form-label">Photo URL</label>
              <input
                type="url"
                className="form-input"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://example.com/photo.jpg"
              />
              {photoUrl && (
                <img
                  src={photoUrl}
                  alt="preview"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginTop: "0.5rem",
                    border: "2px solid rgba(99,102,241,0.5)",
                  }}
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}
            </div>

            <div>
              <label className="form-label">About Me</label>
              <textarea
                className="form-input"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell other developers about yourself..."
                rows={3}
                style={{ resize: "vertical" }}
              />
            </div>

            <div>
              <label className="form-label">
                Skills{" "}
                <span style={{ color: "#64748b", fontWeight: 400 }}>
                  (comma-separated)
                </span>
              </label>
              <input
                type="text"
                className="form-input"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, Node.js, Python, MongoDB..."
              />
            </div>

            {error && (
              <div
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: 10,
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
              onClick={handleSave}
              disabled={saving}
              style={{ marginTop: "0.5rem", opacity: saving ? 0.7 : 1 }}
            >
              {saving ? "Saving..." : "💾 Save Profile"}
            </button>
          </div>
        </div>

        {/* Live Preview */}
        <div>
          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              fontSize: "0.8rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "0.75rem",
            }}
          >
            Live Preview
          </p>
          <UserCard user={previewUser} showActions={false} />
        </div>
      </div>

      {toast && (
        <div className="toast-success">✅ Profile saved successfully!</div>
      )}
    </div>
  );
};

export default EditProfile;