import { Outlet } from "react-router-dom"
import Navbar from "./Navbar.jsx"
import { useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../utils/constants.js"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice.js"
// eslint-disable-next-line
import { motion } from "framer-motion";
import FloatingShape from "./FloatingShape.jsx"
import toast from "react-hot-toast"

const Body = () => {

    const dispatch = useDispatch();


    const userData = useSelector((store) => store.user);

    const fetchUser = async () => {
        try {
            if (userData) return;

            const user = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true,
            });

            dispatch(addUser(user.data));
        } catch (err) {
            toast.error(err?.response?.data)

        }
    };

    useEffect(() => {
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Navbar />
            <div
                className='min-h-screen bg-gradient-to-br from-gray-900 bg-base-300 flex items-center justify-center relative overflow-hidden'
            >
                <FloatingShape color='bg-blue-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
                <FloatingShape color='bg-green-500' size='w-48 h-48' top='70%' left='80%' delay={2} />
                <FloatingShape color='bg-white-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
                <main className="flex-1 overflow-y-auto block pt-13">
                    <Outlet />
                </main>
            </div>

        </>
    )
}

export default Body;