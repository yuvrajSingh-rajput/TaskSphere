import React, { useState, useEffect } from 'react';
import { MdEmail, MdOutlinePassword } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import CircularIndeterminate from './CircularIndeterminate';
import { useAuth } from '../contexts/Authcontext';

function Login() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState({ email: '', password: '' });

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        setLoader(true);
        await login(email, password);
        setLoader(false);
        setData({ email: '', password: '' });
    };

    useEffect(() => {
        if (isAuthenticated) {
            toast.success("You are already logged in");
            navigate('/');
        }
    }, [isAuthenticated]);

    return (
        <div className="flex justify-center w-full h-screen items-center">
            <div className="w-[27rem] h-[80%] bg-white text-center py-12 shadow-2xl rounded-xl">
                <h1 className='text-3xl font-bold'>Login</h1>
                <p className='mt-5 mb-4'>Enter Your Credential to Login</p>
                <form onSubmit={loginUser} className='grid gap-4'>
                    <div className="flex items-center justify-center mt-7">
                        <div className="border flex gap-3 items-center rounded-xl w-[75%] px-3 py-3 bg-[#f5e1f3]">
                            <MdEmail />
                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={data.email}
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                className='outline-none font-semibold bg-[#f5e1f3]'
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="border flex gap-3 items-center rounded-xl w-[75%] px-3 py-3 bg-[#f5e1f3]">
                            <MdOutlinePassword />
                            <input
                                required
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                className='outline-none font-semibold bg-[#f5e1f3]'
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center text-white">
                        <button disabled={loader} type="submit" className='bg-[#ae56dd] w-[75%] py-3 rounded-full font-semibold flex justify-center items-center'>
                            {loader ? <CircularIndeterminate /> : 'Login'}
                        </button>
                    </div>
                </form>
                <div className="flex text-center justify-center mt-5 gap-3">
                    <p>Don't have an account?</p>
                    <Link to='/signup' className='text-blue-500'>Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
