import { useState } from "react";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "./Input.jsx";
// eslint-disable-next-line
import { motion } from "framer-motion";
import FloatingShape from "./FloatingShape.jsx";

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice.js';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants.js"
import toast from "react-hot-toast";

const LoginPage = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axios.post(
                BASE_URL + "/login",
                {
                    emailId,
                    password,
                },
                { withCredentials: true }
            );

            dispatch(addUser(res.data));

            return navigate("/feed");
        } catch (err) {
            toast.error(err?.response?.data?.message);

            if (err?.response?.status == '401') {
                return navigate("/verify");
            }
        } finally {
            setLoading(false);
        }
    };

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
                className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
            >
                <div className='p-8'>
                    <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text'>
                        Welcome Back
                    </h2>

                    <form onSubmit={handleLogin}>
                        <Input
                            icon={Mail}
                            type='email'
                            placeholder='Email Address'
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                        />

                        <Input
                            icon={Lock}
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className='flex items-center mb-6'>
                            <Link to='/forgot-password' className='text-sm text-white-400 hover:underline'>
                                Forgot password?
                            </Link>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='w-full py-3 px-4 bg-gradient-to-r bg-gray-900 text-white font-bold rounded-lg shadow-lg hover:from-blue-400 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Login"}
                        </motion.button>
                    </form>
                </div>
                <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                    <p className='text-sm text-gray-400'>
                        Don't have an account?{" "}
                        <Link to='/signup' className='text-blue-400 hover:underline'>
                            Sign up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};
export default LoginPage;
