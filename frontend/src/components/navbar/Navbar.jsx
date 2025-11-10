import { FaPen } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ children }) => {
  const location = useLocation();

  // function to check isActive
  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <>
      <nav className="w-full border-b border-gray-400 px-5 lg:px-10 py-2 flex justify-between font-[Lato]">
        <div className="logo text-xl lg:text-2xl flex justify-center items-center gap-2">
          <FaPen className="text-[#ff7b00]" />
          <span className="font-bold">Blogify</span>
        </div>

        <div className="lg:flex justify-center items-center gap-4 rounded-full px-3 hidden">
          <Link
            to={"/"}
            className={`text-lg lg:text-lg px-4 py-1 transition-all duration-200 ${
              isActive("/")
                ? "border-b-2 border-[#ff7b00] font-medium"
                : " text-gray-600"
            }`}
          >
            {" "}
            Home{" "}
          </Link>
          <Link
            to={"/createBlog"}
            className={`text-lg lg:text-lg px-4 py-1 transition-all duration-200 ${
              isActive("/createBlog")
                ? "border-b-2 border-[#ff7b00] font-medium"
                :  "text-gray-600"
            }`}
          >
            {" "}
            Create Blogs{" "}
          </Link>
          <Link
            to={"/dashboard"}
            className={`text-lg lg:text-lg px-4 py-1 transition-all duration-200 ${
              isActive("/dashboard")
                ? "border-b-2 border-[#ff7b00] font-medium"
                : "text-gray-600"
            }`}
          >
            {" "}
            Dashboard{" "}
          </Link>
        </div>
        
        {/* Mobile View */}
        <div className="flex justify-center items-center gap-4 bg-[#F3F4F6] border-t border-gray-300 p-2 fixed bottom-0 left-0 w-full lg:hidden">
          <Link
            to={"/"}
            className={`text-lg lg:text-xl px-4 lg:px-6 py-2 lg:rounded-full rounded-xl transition-all duration-200 ${
              isActive("/")
                ? "bg-[#ff7b00] text-white font-medium"
                : "hover:bg-white text-gray-600"
            }`}
          >
            {" "}
            Home{" "}
          </Link>
          <Link
            to={"/createBlog"}
            className={`text-lg lg:text-xl px-4 lg:px-6 py-2 lg:rounded-full rounded-xl transition-all duration-200 ${
              isActive("/createBlog")
                ? "bg-[#ff7b00] text-white font-medium"
                : "hover:bg-white text-gray-600"
            }`}
          >
            {" "}
            Create Blogs{" "}
          </Link>
          <Link
            to={"/dashboard"}
            className={`text-lg lg:text-xl px-4 lg:px-6 py-2 lg:rounded-full rounded-xl transition-all duration-200 ${
              isActive("/dashboard")
                ? "bg-[#ff7b00] text-white font-medium"
                : "hover:bg-white text-gray-600"
            }`}
          >
            {" "}
            Dashboard{" "}
          </Link>
        </div>

        <div className="profile flex justify-between items-center gap-5 lg:gap-10">
          <div className="search">
            <form className="relative">
              <IoSearchOutline className="absolute text-2xl top-2 left-2 text-gray-600" />
              <input
                type="text"
                placeholder="Search articles..."
                className="border border-gray-400 w-55 lg:w-75 py-1 px-10 rounded-xl text-lg focus:outline-[#ff7b00]"
              />
            </form>
          </div>
          <div className="border border-gray-400 lg:w-12 lg:h-12 w-10 h-10 rounded-full flex justify-center items-center hover:border-[#ff7b00]">
            <FaRegUser className="text-xl lg:text-2xl text-gray-800" />
          </div>
        </div>
      </nav>

      <div>{children}</div>
    </>
  );
};

export default Navbar;
