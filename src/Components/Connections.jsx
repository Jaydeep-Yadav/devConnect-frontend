import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store => store.connections);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnections(res?.data?.data))

        } catch (err) {
            toast.error(err?.response?.data)
        }
    }

    useEffect(() => {
        fetchConnections()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!connections) return;

    if (connections.length === 0) return <h1 className='text-center my-10 text-bold text-white text-xl'> No Connections to Chat</h1>;

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Connections</h1>
            {connections.map((connection) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } =
                    connection;

                return (
                    <div
                        key={_id}
                        className="flex justify-evenly m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
                    >
                        <div>
                            <img
                                alt="photo"
                                className="w-20 h-20 rounded-full object-cover"
                                src={photoUrl}
                            />
                        </div>

                        <div className='flex flex-col justify-center'>
                            <h2 className="font-bold text-xl">
                                {firstName + " " + lastName}
                            </h2>
                            {age && <p>{age}</p>}
                            {gender && <p>{gender}</p>}
                            <p>{about}</p>
                        </div>

                        <div className='flex items-center'>
                        <Link to={"/chat/" + _id}>
                            <button className="btn btn-primary">Chat</button>
                        </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Connections