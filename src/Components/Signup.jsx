// eslint-disable-next-line
import { motion } from "framer-motion";
import Input from "./Input";
import { Lock, Mail, User,Loader } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import FloatingShape from "./FloatingShape";
import axios from 'axios';
import { BASE_URL } from "../utils/constants.js"
import toast from "react-hot-toast";

const SignUpPage = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await axios.post(
                BASE_URL + "/signup",
                { firstName, lastName, emailId, password },
                { withCredentials: true }
            );

            toast.success(res?.data?.message)
            return navigate("/verify");
        } catch (err) {
            toast.error(err?.response?.data?.message)
        }finally{
            setLoading(false)
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
                className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden'
            >
                <div className='p-8'>
                    <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text'>
                        Create Account
                    </h2>

                    <form onSubmit={handleSignUp}>
                        <Input
                            icon={User}
                            type='text'
                            placeholder='First Name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Input
                            icon={User}
                            type='text'
                            placeholder='Last Name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />

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
                        
                        <PasswordStrengthMeter password={password} />

                        <motion.button
                             className='w-full py-3 px-4 bg-gradient-to-r bg-gray-900 text-white font-bold rounded-lg shadow-lg hover:from-blue-400 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                        disabled={isLoading}
                        >
                            {isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : "Sign Up"}
                        </motion.button>
                    </form>
                </div>
                <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                    <p className='text-sm text-gray-400'>
                        Already have an account?{" "}
                        <Link to={"/login"} className='text-blue-400 hover:underline'>
                            Login
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};
export default SignUpPage;
