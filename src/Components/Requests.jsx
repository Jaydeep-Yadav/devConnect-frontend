import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestSlice'
// import { Link } from 'react-router-dom'

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(store => store.requests);
    const [toast, setToast] = useState("");
    const [showToast, setShowtoast] = useState("");

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
            dispatch(addRequest(res?.data?.data))
        } catch (err) {
            console.log(err);
        }
    }

    const reviewRequest = async (status, requestId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + requestId, {}, { withCredentials: true });
            dispatch(removeRequest(requestId));
            setToast(res.data.message);
            setShowtoast(true);

            setTimeout(() => {
                setShowtoast(false);
            }, 3000);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchRequests()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!requests) return;

    if (requests.length === 0) return (
        <>
            <h1 className='text-center my-10 text-bold text-white text-xl'> No Requests Found</h1>

            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>{toast}</span>
                    </div>
                </div>
            )}
        </>
    );



    return (<>
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Requests</h1>
            {requests.map((request) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } =
                    request.fromUserId;

                return (
                    <>
                        <div
                            key={_id}
                            className="flex justify-center items-center m-4 p-4 rounded-lg bg-base-300"
                        >
                            <div>
                                <img
                                    alt="photo"
                                    className="w-20 h-20 rounded-full"
                                    src={photoUrl}
                                />
                            </div>

                            <div className="text-left mx-4">
                                <h2 className="font-bold text-xl">
                                    {firstName + " " + lastName}
                                </h2>
                                {age && gender && <p>{age + ", " + gender}</p>}
                                <p>{about}</p>
                            </div>

                            <div>
                                <button
                                    className="btn btn-primary mx-2"
                                    onClick={() => reviewRequest("rejected", request._id)}
                                >
                                    Reject
                                </button>
                                <button
                                    className="btn btn-secondary mx-2"
                                    onClick={() => reviewRequest("accepted", request._id)}
                                >
                                    Accept
                                </button>
                            </div>
                        </div>

                        {/* Toast message */}
                        {showToast && (
                            <div className="toast toast-top toast-center">
                                <div className="alert alert-success">
                                    <span>{toast}</span>
                                </div>
                            </div>
                        )}
                    </>
                );
            })}
        </div>
    </>
    )
}

export default Requests