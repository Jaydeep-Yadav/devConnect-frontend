import { Link } from "react-router-dom";
// eslint-disable-next-line
import { motion } from "framer-motion";
import FloatingShape from "./FloatingShape";

const LandingPage = () => {
    return (

        <div
            className='min-h-screen bg-gradient-to-br from-gray-900 bg-base-300 flex items-center justify-center relative overflow-hidden'
        >
            <FloatingShape color='bg-blue-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
            <FloatingShape color='bg-green-500' size='w-48 h-48' top='70%' left='80%' delay={2} />
            <FloatingShape color='bg-white-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
            >
                <div className="bg-base-200 flex flex-col justify-center items-center p-10">
                    <div className="text-center space-y-4">

                        <h2 className='text-5xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text'>
                            Welcome to DevConnect
                        </h2>

                        <p className="text-lg text-shadow-indigo-50">Connect with developers, share your projects, and grow your network.</p>
                        <Link to={"/login"}>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className='w-full py-3 px-4 bg-gradient-to-r bg-gray-900 text-white font-bold rounded-lg shadow-lg hover:from-blue-400 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'

                            >
                                Get Started
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LandingPage;