// eslint-disable-next-line
import { motion } from "framer-motion";
import FloatingShape from "./FloatingShape";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
    return <>
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
                    <h2 className='text-5xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text'>
                        404 - Not Found
                    </h2>
                </div>

                <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                    <Link to={"/login"} className='text-sm text-blue-400 hover:underline flex items-center'>
                        <ArrowLeft className='h-4 w-4 mr-2' /> Back to Home
                    </Link>
                </div>

            </motion.div>
        </div>
    </>
};

export default NotFound;
