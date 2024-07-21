import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CircularIndeterminate from './CircularIndeterminate';

function Dashboard() {
  const navigate = useNavigate();
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [stats, setStats] = useState({
    username: '',
    email: '',
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  const [loader, setLoader] = useState(false);

  const handleUserStatistics = async () => {
    let axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    try {
      setLoader(true);
      const response = await axios.get('/profile', axiosConfig);
      setStats({
        username: response.data.username,
        email: response.data.email,
        totalTasks: response.data.totalTasks,
        completedTasks: response.data.completedTasks,
        pendingTasks: response.data.totalTasks - response.data.completedTasks,
      });
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    handleUserStatistics();
    if(token === ""){
      navigate("/login");
      toast.warn("Please login first to access dashboard");
    }
  }, [token]);

  return (
    <>
      <div className="h-screen flex flex-col items-center">
        {loader ? (
          <CircularIndeterminate />
        ) : (
          <>
            <div className='text-center bg-blue-500 text-white p-5 rounded-2xl mt-28'>
              <h1 className="text-2xl font-semibold">{stats.username.toUpperCase()}'s Profile</h1>
              <p className='mt-2'>Email: {stats.email}</p>
            </div>
            <div className="flex-col gap-9 mt-4">
              <div className='text-center bg-orange-400 p-2 rounded-xl'>
                <h2 className="text-xl">Total Tasks</h2>
                <p className="text-lg">{stats.totalTasks}</p>
              </div>
              <div className='text-center bg-orange-400 p-2 rounded-xl mt-4'>
                <h2 className="text-xl">Completed Tasks</h2>
                <p className="text-lg">{stats.completedTasks}</p>
              </div>
              <div className='text-center bg-orange-400 p-2 rounded-xl mt-4'>
                <h2 className="text-xl">Pending Tasks</h2>
                <p className="text-lg">{stats.pendingTasks}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;

