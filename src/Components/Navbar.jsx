import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Navbar = () => {
    // subscribe to user slice from store
    const user = useSelector((state) => state.user);

    return (
        <div className="navbar bg-base-300 fixed top-0 w-full shadow flex items-center px-4 h-[64px] z-10">
            <div className="flex-1">
                <Link to={user? "/feed": "/"} className="btn btn-ghost text-xl">💻 Dev Connect</Link>
            </div>

            {user && <div className="flex gap-2">
                <div className="form-control">Welcome, {user.firstName}</div>
                <div className="dropdown dropdown-end mx-5 flex z-10">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="user avatar"
                                src={user.photoUrl} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-10">
                        <li> <Link to="/profile"> Profile </Link> </li>
                        <li> <Link to="/connections">Chat </Link> </li>
                        <li> <Link to="/requests"> Requests </Link> </li>
                        <li> <Link to="/logout"> Logout </Link> </li>
                    </ul>
                </div>
            </div>}
        </div>
    )
}

export default Navbar;