import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularIndeterminate from './CircularIndeterminate';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("auth");
        setTimeout(() => {
            navigate('/login');
        }, 3000);
    }, []);

    return (
        <>
            <div className="h-screen grid justify-center items-center text-center gap-3">
                <CircularIndeterminate />
                <p>Logout Successful! You will be automatically redirected to the login page in 3 seconds...</p>
            </div>
        </>
    );
}

export default Logout;
