import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import toast from "react-hot-toast";
// eslint-disable-next-line
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EditProfile = ({ user }) => {
  // const _id = user._id;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [isLoading, setLoading] = useState(false);
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState(user.skills);


  const dispatch = useDispatch();

  const handleAddSkill = () => {
    if (skill.trim() && !skills.includes(skill.trim())) {
      setSkills([...skills, skill.trim()]);
    }
    setSkill("");
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const editProfileHandler = async () => {

    setLoading(true);

    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("about", about);
    formData.append("skills", JSON.stringify(skills));

    // Only append the photoUrl if a file is selected
    if (photoUrl) {
      // The key `photoUrl` must match `upload.single('photoUrl')` in the backend
      formData.append("photoUrl", photoUrl);
    }

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      );

      dispatch(addUser(res?.data?.data));
      toast.success(res?.data?.message)

    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">

                  <div className="label">
                    <span className="label-text">Last Name:</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age:</span>
                  </div>

                  <input
                    type="number"
                    value={age}
                    max={100}
                    min={18}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender:</span>
                  </div>

                  <select className="select" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">--Please Select--</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>


                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About:</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Upload Profile Image</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhotoUrl(e.target.files[0])}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Skills:</span>
                  </div>
                  <br />
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    placeholder="Enter a skill"
                    className="border p-2 rounded-lg flex-grow"
                    onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                  />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='mx-3 my-3 py-2 px-4 bg-gradient-to-r from-blue-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                    onClick={handleAddSkill}
                  >
                    Add
                  </motion.button>

                  {skills.map((skill, index) => (

                    <motion.div
                      key={index}
                      className="inline-flex items-center bg-blue-600 text-white-600 px-3 py-1 my-2 mx-1 rounded-full text-sm gap-1 cursor-pointer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      {skill}
                      <button
                        className="text-red-900 ml-2"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        ✕
                      </button>
                    </motion.div>

                  ))}
                </label>

              </div>

              <div className="w-full flex">
                <div className="w-1/2 card-actions justify-center m-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                    onClick={editProfileHandler}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Profile"}
                  </motion.button>
                </div>

                <div className="w-1/2 card-actions justify-center m-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                    disabled={isLoading}
                  >
                    <Link to="/change-password">Change Password</Link>
                  </motion.button>
                </div>
              </div>

            </div>
          </div>
        </div>

        <UserCard
          user={user}
          profile={"self"}
        />

      </div>
    </>
  );
};
export default EditProfile;