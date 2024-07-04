import React from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
        <div className="navbar flex bg-[#0D0221] text-white justify-between px-9 py-4 flex-wrap">
            <h1 className='text-xl font-bold'>LOGO</h1>
            <ul className='flex gap-8 items-center'>
                <li className='flex gap-1 items-center'>
                    <IoMdHome className='text-lg'/>
                    <Link to='/' className=''>Home</Link>
                </li>
                <li className='flex items-center'>
                    <Link to='/about'>About</Link>
                </li>
                <li className='flex items-center'>
                    <Link to='/contact'>Contact</Link>
                </li>
                <li className='flex items-center text-center'>
                    <Link to='/profile' className='flex flex-col items-center'>
                        <FaCircleUser className='text-2xl'/>
                        <p>Username</p>
                    </Link>
                </li>
            </ul>
        </div>
    </>
  )
}

export default Navbar
