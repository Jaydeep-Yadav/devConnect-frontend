import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar.jsx"
import Footer from "./Footer.jsx"
import { useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../utils/constants.js"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice.js"

const Body = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = useSelector((store) => store.user);

    const fetchUser = async () => {
        try {
            if(userData) return;

            const user = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true,
            });

            dispatch(addUser(user.data));
        } catch (err) {

            if (err.status === 401) {
                navigate("/");
            }
            console.error(err);
        }
    };

    useEffect(() => {
            fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Navbar />

            <div className="pt-13">
                <Outlet />
            </div>

            <Footer />
        </>
    )
}

export default Body;