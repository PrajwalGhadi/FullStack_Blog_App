import { FaPen } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import {Link, useLocation} from 'react-router-dom'

const Navbar = ({children}) => {
    const location = useLocation()


    // function to check isActive
    function isActive(path) {
        return location.pathname === path
    }

  return (
    <>
        <nav className="w-full border-b border-gray-400 px-10 py-2 flex justify-between font-[Lato]">
            <div className="logo text-3xl flex justify-center items-center gap-2">
                <FaPen className="text-[#ff7b00]"/>
                <span className="font-bold">Blogify</span>
            </div>

            <div className="flex  justify-center items-center gap-4 bg-gray-300 rounded-full px-3">
                <Link to = {'/'} className={`text-lg lg:text-xl px-4 lg:px-6 py-2 rounded-full transition-all duration-200 ${
                        isActive('/') 
                            ? 'bg-[#ff7b00] text-white font-medium' 
                            : 'hover:bg-white text-gray-600'
                    }`}> Home </Link>
                <Link to = {'/createBlog'} className={`text-lg lg:text-xl px-4 lg:px-6 py-2 rounded-full transition-all duration-200 ${
                        isActive('/createBlog') 
                            ? 'bg-[#ff7b00] text-white font-medium' 
                            : 'hover:bg-white text-gray-600'
                    }`}> Create Blogs </Link>
                <Link to = {'/dashboard'} className={`text-lg lg:text-xl px-4 lg:px-6 py-2 rounded-full transition-all duration-200 ${
                        isActive('/dashboard') 
                            ? 'bg-[#ff7b00] text-white font-medium' 
                            : 'hover:bg-white text-gray-600'
                    }`}> Dashboard </Link>
            </div>

            <div className="profile flex justify-between items-center gap-10">
                <div className="search">
                    <form className="relative">
                        <IoSearchOutline className="absolute text-3xl top-2 left-2 text-gray-600"/><input type="text" placeholder="Search articles..." className="border border-gray-400 w-75 px-10 py-2 rounded-xl text-xl focus:outline-[#ff7b00]"/>
                    </form>
                </div>
                <div className="border border-gray-400 w-15 h-15 rounded-full flex justify-center items-center hover:border-[#ff7b00]"><FaRegUser className="text-3xl text-gray-800"/></div>
            </div>
        </nav>

        <div>{children}</div>
    </>
  )
}

export default Navbar