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
        <div className="logo text-xl lg:text-3xl flex justify-center items-center gap-2">
          <FaPen className="text-[#ff7b00]" />
          <span className="font-bold">Blogify</span>
        </div>

        {/* <div className="flex justify-center items-center gap-4 bg-gray-300 rounded-full px-3 hidden">
          <Link
            to={"/"}
            className={`text-lg lg:text-xl px-4 lg:px-6 py-2 rounded-full transition-all duration-200 ${
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
            className={`text-lg lg:text-xl px-4 lg:px-6 py-2 rounded-full transition-all duration-200 ${
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
            className={`text-lg lg:text-xl px-4 lg:px-6 py-2 rounded-full transition-all duration-200 ${
              isActive("/dashboard")
                ? "bg-[#ff7b00] text-white font-medium"
                : "hover:bg-white text-gray-600"
            }`}
          >
            {" "}
            Dashboard{" "}
          </Link>
        </div> */}

        <div className="flex justify-center items-center gap-4 bg-[#F3F4F6] border-t border-gray-300 lg:bg-gray-300 p-2 lg:px-3 lg:py-2 lg:w-117 lg:rounded-full lg:bottom-268 lg:left-210 fixed bottom-0 left-0 w-full">
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
              <IoSearchOutline className="absolute text-2xl lg:text-3xl top-2 left-2 text-gray-600" />
              <input
                type="text"
                placeholder="Search articles..."
                className="border border-gray-400 w-55 lg:w-75 py-1 px-10 lg:py-2 rounded-xl text-lg lg:text-xl focus:outline-[#ff7b00]"
              />
            </form>
          </div>
          <div className="border border-gray-400 lg:w-15 lg:h-15 w-10 h-10 rounded-full flex justify-center items-center hover:border-[#ff7b00]">
            <FaRegUser className="text-xl lg:text-3xl text-gray-800" />
          </div>
        </div>
      </nav>

      <div>{children}</div>
    </>
  );
};

export default Navbar;
