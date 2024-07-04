import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CircularIndeterminate from './CircularIndeterminate';
import toast from 'react-hot-toast';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loader, setLoader] = useState(false);
    const [task, setTask] = useState('');

    const fetchAllTasks = async () => {
        try {
            setLoader(true);
            const response = await axios.get('/');
            setTasks(response.data.tasks);
        } catch (err) {
            toast.error(err.response.data.error);
        } finally {
            setLoader(false);
        }
    };

    const createNewTask = async () => {
        if (!task.trim()) {
            toast.error('Task cannot be empty');
            return;
        }
        try {
            setLoader(true);
            const response = await axios.post('/', { task });
            setTasks([...tasks, response.data.task]);
            setTask('');
            toast.success('Task successfully added');
        } catch (err) {
            toast.error(err.response.data.error);
        } finally {
            setLoader(false);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            setLoader(true);
            await axios.delete(`/${taskId}`);
            setTasks(tasks.filter(task => task._id !== taskId));
            toast.success('Task completed');
        } catch (err) {
            toast.error(err.response.data.error);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    return (
        <>
            <div className='h-screen flex flex-col pt-10 items-center p-4'>
                <div className="flex justify-center items-center gap-4 shadow-2xl shadow-black p-6 rounded-xl mb-6 bg-white">
                    <input
                        type="text"
                        required
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className='w-72 bg-slate-200 py-2 px-3 text-xl font-semibold rounded-lg'
                        placeholder='Write Your Task Here...'
                    />
                    <button
                        onClick={createNewTask}
                        className='bg-green-500 px-5 rounded-lg py-2 text-white font-semibold flex items-center justify-center'
                    >
                        {loader ? <CircularIndeterminate /> : 'Add+'}
                    </button>
                </div>
                <div className="w-full max-w-md">
                    {tasks.length === 0 ? (
                        <p className="text-center text-gray-500">No tasks available</p>
                    ) : (
                        <ul className="space-y-3">
                            {tasks.map(task => (
                                <li key={task._id} className="bg-slate-100 p-4 rounded-lg flex justify-between items-center shadow-md">
                                    <span className="text-lg font-medium">{task.task}</span>
                                    <button
                                        onClick={() => deleteTask(task._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}

export default Tasks;
