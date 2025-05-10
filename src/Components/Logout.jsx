import axios from "axios"
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
            dispatch(removeUser());
            return navigate("/")
        } catch (error) {
            console.error("Logout error:", error);
            // Error logic maybe redirect to error page
        }
    };

    // Immediately invoke the logout function when the route is accessed
    handleLogout();

    // No UI needed for this route
    return null 
};

export default Logout;