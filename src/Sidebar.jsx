import React from 'react'
import { LuHome } from "react-icons/lu";
import "./index.css"
import { LuHardDrive } from "react-icons/lu";
import { MdOutlineMonitor } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { PiWarningOctagon } from "react-icons/pi";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiCloud } from "react-icons/ci";
function Sidebar() {
  return (
    <>
     <button className='shadow-xl rounded-xl text-xl p-3 ml-4 mt-2'><span>+</span> <span>New</span> </button>
    <div className='main w-[250px] flex flex-col justify-center gap-3 text-l px-3 mt-4 font-sans font-medium  '>
      
       <div className='sub-1 flex flex-col '>
                 <div className='flex items-center gap-2 bg-[#DBEAFE] rounded-full px-2 py-2'>
                 <LuHome />
                 <span>Home</span>
                 </div>
                 <div className='flex items-center gap-2 px-2 py-2  hover:bg-[#E2E8F0] rounded-full'>
                 <LuHardDrive />
                 <span>My Drive</span>
                 </div>
                 <div className='flex items-center gap-2 px-2 py-2 hover:bg-[#E2E8F0] rounded-full'>
               
                 <MdOutlineMonitor />
                 <span>Computers</span>
                 </div>
                 

       </div>


       <div className='sub-2 flex flex-col  '>
                 <div className='flex items-center gap-2 px-2 py-2 hover:bg-[#E2E8F0] rounded-full'>
                 <MdOutlinePeopleAlt />
                 <span>Share with me</span>
                 </div>
                 <div className='flex items-center gap-2 px-2 py-2 hover:bg-[#E2E8F0] rounded-full'>
                 <FaRegClock />
                 <span>Recent</span>
                 </div>
                 <div className='flex items-center gap-2 px-2 py-2 hover:bg-[#E2E8F0] rounded-full'>
                 <FaRegStar />
                 <span>Starred</span>
                 </div>
                 

       </div>
               

       <div className='sub-3 flex flex-col '>
                 <div className='flex items-center gap-2 px-2 py-2 hover:bg-[#E2E8F0] rounded-full'>
                 <PiWarningOctagon />
                 <span>Spam</span>
                 </div>
                 <div className='flex items-center gap-2 px-2 py-2 hover:bg-[#E2E8F0] rounded-full'>
                 <FaRegTrashAlt />
                 <span>Trash</span>
                 </div>
                 <div className='flex items-center gap-2 px-2 py-2 hover:bg-[#E2E8F0] rounded-full'>
                 <CiCloud />
                 <span>Storage</span>
                 </div>
                 

       </div>
          <div className='mt-2'>
          <div className='bg-[#C9CDD2]  w-[85%] rounded-full'> 
          <div className=' rounded-full  bg-[#2196F3] p-1 w-[10%]'></div>
          </div>
          <p>20 Bytes of 100MB</p>
          
          </div>




       
        
        
    
    
    </div></>
  )
}

export default Sidebar