import React from 'react'
import { FaRegCopyright } from "react-icons/fa6";

function Footer() {
  return (
    <div className=" bg-[#C2E7D9] text-center py-4">
        <p>Authentication & Authorization Tutorial</p>
        <div className='flex gap-2 items-center text-center justify-center'>
            <FaRegCopyright />
            <p>Copyright-Yuvraj Singh Rajput</p>
        </div>
    </div>
  )
}

export default Footer;