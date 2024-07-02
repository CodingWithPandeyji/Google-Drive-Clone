import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { LuSlidersHorizontal } from "react-icons/lu";
import { BsQuestionCircle } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

function Header() {
  return (
    <>
<div className='flex items-center justify-between p-2 px-5'>
  <div className='flex items-center '>
    <div className='flex items-center'>
        <img className='w-[40px]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3RaendkWxwbnlsA8UyDPmcDbqIMQETxKYpw&s" alt="" />
        <span className='text-gray text-2xl font-medium ml-2 '>Disk</span>
    </div>
    <div className='flex items-center bg-slate-200 w-[700px] p-3 rounded-full ml-[8rem] text-xl'>
    <IoSearchOutline />
    <input  className='bg-[transparent] text-black flex-1 border-none outline-none ml-4' type="text" placeholder='Search in Disk' />
    <LuSlidersHorizontal />

    </div>
    </div>
    <div className='flex items-center gap-3 text-2xl'>
    <BsQuestionCircle />
    <IoSettingsOutline />
    <CgProfile />
    </div>

    </div>
    
    
    </>
  )
}

export default Header
