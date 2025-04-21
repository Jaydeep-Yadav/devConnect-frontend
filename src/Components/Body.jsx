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
    const userData = useSelector((store) => store.user);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            if (userData) return;
            const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
            dispatch(addUser(res.data));
        } catch (err) {
            if (err.status === 401) {
                navigate("/login");
            }
            console.log(err)
        }
    }

    useEffect(() => {
        fetchUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Navbar />

            {/* Components of children routes are rendered here */}
            <div className="pt-13">
                <Outlet />
            </div>

            <Footer />
        </>
    )
}

export default Body