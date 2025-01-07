import React, { useContext } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ThemeContext } from './context/ThemeContext'
function Home({handleReset,edit,setEdit}) {
    const {theme,changeTheme}=useContext(ThemeContext)
  const fun=()=>{
    if(edit)
    handleReset(1);
  }

  return (
    <div className=' h-[10vh] w-[100vw]'>
      <nav className=" w-full h-[15%] bg-slate-300 px-4 flex justify-between items-center z-30 fixed top-0 left-0 md:px-4">
             <div>
             </div>
            <ul className='md:flex hidden'>

             <li className='hover:text-blue-800 cursor-pointer mx-20 font-semibold text-md font-serif text-xl'><Link to="/Data"><h1>Home</h1></Link></li>
             <div className='relative'>
             </div>
             <li className='hover:text-blue-800 cursor-pointer mx-20 font-semibold text-md font-serif text-xl'>
                <Link to='/Blog'> <h1 onClick={fun}>Blog</h1></Link>
             </li>
             <li className='hover:text-blue-800 cursor-pointer mx-20 font-semibold text-md'><Link to="/preview"><h1></h1></Link></li>

<div
  onClick={changeTheme}
  className={`relative w-[60px] h-[30px] flex items-center cursor-pointer ${
    theme === "light" ? "bg-gray-400" : "bg-black"
  } rounded-full transition-colors duration-300`}
>
  <div
    className={`absolute w-[24px] h-[24px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
      theme === "light" ? "translate-x-[4px]" : "translate-x-[32px]"
    }`}
  ></div>
</div>

            </ul>
            <div className='hidden md:block cursor-pointer  rounded-md h-12 w-20  px-3 py-3 font-bold hover:bg-blue-800 text-white text-md'></div>
            <div className="md:hidden">
           </div>
         </nav>

        

    </div>
  )
}

export default Home








