import { useState } from "react";
// eslint-disable-next-line
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import FloatingShape from "./FloatingShape";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setLoading] = useState(false)


    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${BASE_URL}/change-password`, { password }, { withCredentials: true })

            if (res?.response?.status == 400) {
                toast.error(res?.response?.data?.message)
            } else if (res?.status == 200) {
                toast.success(res?.data?.message);
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }

        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
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
                className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
            >
                <div className='p-8'>
                    <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text'>
                        Change Password
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <Input
                            icon={Lock}
                            type='password'
                            placeholder='New Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Input
                            icon={Lock}
                            type='password'
                            placeholder='Confirm New Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <PasswordStrengthMeter password={password} />

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='w-full py-3 px-4 my-2 bg-gradient-to-r from-blue-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? "Resetting..." : "Set New Password"}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};
export default ResetPasswordPage;
