import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../contexts/Authcontext';
import CircularIndeterminate from './CircularIndeterminate';

function Signup() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState({ username: '', email: '', password: '' });

    const signupUser = async (e) => {
        e.preventDefault();
        const { username, email, password } = data;
        try {
            setLoader(true);
            const response = await axios.post('/signup', { username, email, password });
            setLoader(false);
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success('Signup Successful');
                await login(email, password); // Log in user automatically after signup
                navigate('/');
            }
        } catch (err) {
            setLoader(false);
            if (err.response && err.response.data && err.response.data.error) {
                toast.error(err.response.data.error);
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div className="flex justify-center w-full h-screen items-center">
            <div className="w-[27rem] h-[80%] bg-white text-center py-12 shadow-2xl rounded-xl">
                <h1 className='text-3xl font-bold'>Sign Up</h1>
                <p className='mt-5 mb-4'>Enter Your Details to Create an Account</p>
                <form onSubmit={signupUser} className='grid gap-4'>
                    <div className="flex items-center justify-center mt-7">
                        <div className="border flex gap-3 items-center rounded-xl w-[75%] px-3 py-3 bg-[#f5e1f3]">
                            <input
                                required
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                value={data.username}
                                onChange={(e) => setData({ ...data, username: e.target.value })}
                                className='outline-none font-semibold bg-[#f5e1f3]'
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="border flex gap-3 items-center rounded-xl w-[75%] px-3 py-3 bg-[#f5e1f3]">
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
                            {loader ? <CircularIndeterminate /> : 'Sign Up'}
                        </button>
                    </div>
                </form>
                <div className="flex text-center justify-center mt-5 gap-3">
                    <p>Already have an account?</p>
                    <Link to='/login' className='text-blue-500'>Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
