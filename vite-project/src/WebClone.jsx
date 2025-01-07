import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import CopyrightIcon from '@mui/icons-material/Copyright';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function WebClone() {
  const [showOption,setShowOption]=useState(false);
  
    const crossIcon=()=>{
      setShowOption(false)
    }
    const sidebar=()=>{
      setShowOption(!showOption);
    }
  return (
    <>

    <div className='h-screen w-screen  overflow-x-hidden  bg-slate-800'>

    {/* navbar start */}
        <nav className=" w-full h-[15%] bg-slate-300 px-4 flex justify-between items-center z-30 fixed top-0 left-0 md:px-4">
             
            <div>
                <img className='h-[105px] text-black w-[190px] bg-cover' src="/logo3.png" alt="" />
            </div>

           <ul className='md:flex hidden'>
            <li className='hover:text-blue-800 cursor-pointer mx-20 font-semibold text-md'>Home</li>
            <div className='relative'>
            <input type='text' placeholder='Search' className='rounded-md shadow-2xl border border-gray-300 focus:outline-none pl-10 hover:border-indigo-500 '/>
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <li className='hover:text-blue-800 cursor-pointer mx-20 font-semibold text-md'>Notification</li>
            <li className='hover:text-blue-800 cursor-pointer mx-20 font-semibold text-md'>Contact Us</li>
           </ul>
           <div className=' hidden md:block cursor-pointer  rounded-md h-12 w-20 bg-blue-700 px-3 py-3 font-bold hover:bg-blue-800 text-white text-md'>Login</div>
           <div class="md:hidden">
          </div>
        </nav>
        {/* navbar end */}
        
         <header className='w-full h-[80%]'>
         {!showOption && (

         <MenuIcon sx={{ fontSize: 40}}  className='fixed z-50 top-25  text-white  text-3xl' onClick={sidebar}/>
         )}
         {showOption && (
        <div className=" absolute  top-30  left-0 bg-blue-100 w-[15%] h-[60%]  shadow-lg p-2">
          <ClearIcon onClick={crossIcon} className='ml-[170px] hover:text-blue-500'/>
          <p className='text-3xl text-pretty border-b-2 border-slate-500 '>Menu Bar</p>
          <div className="p-2 hover:bg-gray-300 cursor-pointer mt-6"><AccountCircleIcon/> Profile </div>
          <div className="p-2 hover:bg-gray-300 cursor-pointer"><SettingsIcon/> Setting </div>
          <div className="p-2 hover:bg-gray-300 cursor-pointer"> <ErrorOutlineIcon/> Feedback </div>
        </div>

      )}
      
    <div className=" max-h-full max-w-full  flex mt-[110px]  bg-cover ml-[50px] bg-fixed bg-no-repeat bg-center' ">
    <img src="/bgimg.png" alt="Background" className=" w-full h-[550px]  object-cover" />
   <div >
    <p className=' ml-3 mt-32 text-white font-semibold '> <span className=' text-5xl font-mono'>Bright Future with<span className='text-3xl font-mono mx-4 text-blue-500'><i>Study abroad</i></span></span>
    </p>
    <div className='flex justify-center'>
    <button className=' bg-blue-900 border hover:bg-slate-800 hover:text-white duration-300 border-white w-[140px] font-semibold block  h-12 rounded-sm text-white mx-[50px] mt-[100px]'>
      <DownloadIcon/>Download</button>
      <button className=' bg-black  border hover:bg-blue-800 hover:text-black duration-300 border-white w-[140px] font-semibold h-12 rounded-sm text-white mx-[50px] mt-[100px]'>
      Click Here</button>
      </div>
      {/* <p className='text-red-200 w-[300px]  text-2xl mt-20  mx-6'>𝒍𝒆𝒕𝒔 𝒗𝒊𝒔𝒊𝒕 𝒐𝒖𝒓 𝒘𝒆𝒃𝒔𝒊𝒕𝒆 <ArrowDownwardIcon/></p> */}

   </div>
    </div>
   
          </header>

{/*   footer start */}
           <footer className='bg-slate-900  w-full top-0 bottom-0  h-[37%] '>
    <div className='flex text-white justify-between mx-6 '>
        <div>
            <ul>
                <p className='font-serif mt-[20px] text-2xl border-b-2'>Get to Know us</p>
                <ol className='mt-3'>career</ol>
                <ol className='mt-3'>About us</ol>
                <ol className='mt-3'>Our Services</ol>
            </ul>
        </div>
           <div>
            <ul>
                <p className='font-serif mt-[20px] text-2xl border-b-2'>Make Money with us</p>
                <ol className='mt-3'>complex software solution</ol>
                <ol className='mt-3'>large scalable solution</ol>
                <ol className='mt-3'>light weight solution</ol>

            </ul>
           </div>
           <div>
            <ul>
                <p className='font-serif mt-[20px] text-2xl border-b-2'>Technology Used</p>
                <ol className='mt-3'>
                    Spring Boot</ol>
                <ol className='mt-3'>Node js</ol>
                <ol className='mt-3'>Angular js</ol>
                <ol className='mt-3'>Next js</ol>

            </ul>
           </div>
           <div>
            <ul>
                <p className=' font-serif mt-[20px] text-2xl border-b-2 '>Our Community</p>
                <ol className='mt-3'><LinkedInIcon/>  Linkedin</ol>
                <ol className='mt-3'><InstagramIcon/> Instagram</ol>
                <ol className='mt-3'> <FacebookIcon/> Facebook</ol>
                <ol className='mt-3'> <WhatsAppIcon/> Whatsapp</ol>
                <ol className='mt-3'> <AddIcCallIcon/>+01 234 563</ol>

            </ul>
           </div>
    </div>
    <p className=' text-white mx-[600px] mb-48'><CopyrightIcon/> 2024 Copyright:www.google.com</p>


</footer> 

          </div>
    </>
  )
}

export default WebClone
