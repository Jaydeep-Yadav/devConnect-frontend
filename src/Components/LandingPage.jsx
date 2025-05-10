import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="bg-base-200 min-h-screen flex flex-col justify-center items-center p-10">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-bold text-primary">Welcome to DevConnect</h1>
                <p className="text-lg text-secondary">Connect with developers, share your projects, and grow your network.</p>
                <div className="flex justify-center gap-4">
                    <button className="btn-primary" ><Link to="/login"> Get Started </Link> </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;