import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return user ? (
    <EditProfile user={user} />
  ) : (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#64748b",
      }}
    >
      Loading profile…
    </div>
  );
};

export default Profile;