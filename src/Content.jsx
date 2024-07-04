import React from 'react'
import { FaListUl } from "react-icons/fa";
import { MdInfoOutline } from "react-icons/md";
import { FaImages } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";
import "./index.css"
function Content() {
  return (
    <>
     <div className=' w-[85vw] pt-4 '>
        
        <div className='flex justify-between pr-5  border-b-2 border-whitesmoke'>
        <h1 className='text-xl '>Welcome to Drive</h1>
          <div className='flex gap-3 items-center'>
             <FaListUl />
              <MdInfoOutline />
          </div>
        </div>

        <div className='pt-[2rem]' >
          <h1 className='text-xl font-medium'>Recents</h1>
          <div className='border-2 border-whitesmoke w-[170px] h-[120px] text-center pt-4 mt-4 ml-3 '>
          <span className='inline-block text-6xl text-zinc-400  '><FaImages /></span>  
          <div className='border-t-2 border-whitesmoke pt-1'><p className='font-medium'>image.jpg</p></div>
          </div>
        </div>
        <div className='pt-10 '>
          <div className='flex items-center justify-between p-4  border-b-2 border-whitesmoke '>
          <div className='flex items-center text gap-1'><FaArrowDown /><span>Name</span></div>
          <p><b>File Size</b></p>
          <p><b>Last Modified</b></p>
          <p><b>Options</b></p>
          </div>
          <div  className='flex items-center justify-between p-4  border-b-2 border-whitesmoke '>
            <div className='flex items-center gap-1  '><FaImages /><span>about.jpg</span></div>
            <p >40.43KB</p>
            <p>Yesterday</p>
            <p className='cursor-pointer'><b><SlOptionsVertical /></b></p>
          </div>
          
        </div>
        
       
    </div>
    
    </>
   
  )
}

export default Content