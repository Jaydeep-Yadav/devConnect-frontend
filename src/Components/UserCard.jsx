import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import { BASE_URL } from '../utils/constants';

const UserCard = ({ user }) => {
    const dispatch = useDispatch()
    const [toast, setToast] = useState("");
    const [showToast, setShowtoast] = useState("");

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(
                BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                { withCredentials: true }
            );
            
            dispatch(removeUserFromFeed(userId));

            setToast(res.data.message);
            setShowtoast(true);

            setTimeout(() => {
                setShowtoast(false);
            }, 3000);

        } catch (err) {
            console.log(err);
        }
    };



    if (!user) return <h1> Feed is empty</h1>;

    const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

    return (
        <>
            <div className="card bg-base-300 w-96 shadow-xl">
                <figure>
                    <img src={photoUrl} alt="photo" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    <p>{about}</p>
                    <div className="card-actions justify-center my-4">
                        <button
                            className="btn btn-primary"
                            onClick={() => handleSendRequest("ignored", _id)}
                        >
                            Ignore
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => handleSendRequest("interested", _id)}
                        >
                            Interested
                        </button>
                    </div>
                </div>
            </div>

            {/* Show Toast message */}
            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>{toast}</span>
                    </div>
                </div>
            )}
        </>

    );

}

export default UserCard