import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import { BASE_URL } from '../utils/constants';
import toast from 'react-hot-toast';
// eslint-disable-next-line
import { motion } from "framer-motion";
import { useState } from 'react';
import { Loader } from 'lucide-react';

const UserCard = ({ user, profile }) => {
    const [isLoading, setLoading] = useState(false);

    const dispatch = useDispatch()

    const handleSendRequest = async (status, userId) => {
        try {
            setLoading(true);
            const res = await axios.post(
                BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                { withCredentials: true }
            );

            dispatch(removeUserFromFeed(userId));

            toast.success(res?.data?.message);
        } catch (err) {
            toast.error(err?.response?.data);
        } finally {
            setLoading(false);
        }
    };



    if (!user) {
        return <div>
            <h1> Feed is empty</h1>{""}
            <p>Bring Friends to join Dev-Connect</p>
        </div>;
    }

    const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = user;


    return (
        <>
            <div className="card bg-base-300 w-96 shadow-xl">
                <figure>
                    <img src={photoUrl} alt="photo" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>

                    {/* Age and Gender on the same line */}
                    <div className="flex gap-4">
                        {age && <div className="text-base text-white-700">Age: {age}</div>}
                        {gender && <div className="text-base text-white-700">Gender: {gender}</div>}
                    </div>

                    {/* Skills Container */}
                    <div className="flex flex-wrap gap-2">
                        {skills.length > 0 ? (
                            skills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    className="inline-flex items-center bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm gap-1 cursor-pointer"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                >
                                    {skill}
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-gray-500">No skills added yet.</p>
                        )}
                    </div>

                    {about && <div className="text-base text-white-700">{about}</div>}

                    {(profile !== "self") && <div className="card-actions justify-center my-2">

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                            onClick={() => handleSendRequest("interested", _id)}
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader /> : "Interested"}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='w-full py-3 px-4 bg-gradient-to-r from-red-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                            onClick={() => handleSendRequest("ignored", _id)}
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader /> : "Ignore"}
                        </motion.button>

                    </div>}

                </div>
            </div>

        </>

    );

}

export default UserCard