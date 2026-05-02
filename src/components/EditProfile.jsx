import { useState } from "react";


const EditProfile = ({user}) => {
      const [firstName, setFirstName] = useState(user.firstName);
      const [lastName, setLastName] = useState(user.lastName);
      const [age, setAge] = useState(user.age);
      const [gender, setGender] = useState(user.gender);
      const [about, setAbout] = useState(user.about);
      const [photoUrl, setPhotoUrl] = useState(user.photoUrl);

      const [error, setError] = useState("");
    return (
         <div className="flex justify-center py-20 ">
      <div className="card bg-base-300 w-96 shadow-sm max-h-xs">
        <div className="card-body">
          <h2 className="card-title justify-center ">Edit Profile</h2>
          <div className="flex flex-col gap-4">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                type="number"
                className="input input-bordered w-full max-w-xs"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Gender</span>
            </div>
                    <select
                        className="select select-bordered w-full max-w-xs"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">About</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Photo Url</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary">
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}

export default EditProfile;