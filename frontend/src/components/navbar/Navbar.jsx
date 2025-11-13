import { useContext, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import UserProfile from "../../pages/UserProfile";

const Navbar = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [allBlogs, setAllBlogs] = useState(null);
  const [user, setUser] = useState(null);

  const [filterBlog, setFilterBlog] = useState(null);
  const [userProfile, setUserProfile] = useState(false);
  const { getAllPost, getLoggedInUser } = useContext(AuthContext);

  // This will help me to hide the profile options after clicked
  useEffect(() => {
    setUserProfile((userProfile) => (!userProfile ? false : false));
  }, [location.pathname]);

  //  Moved state update to useEffect
  useEffect(() => {
    if (allBlogs) {
      const filtered = allBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilterBlog(filtered);
    }
  }, [searchInput, allBlogs]); // ✅ Re-run when searchInput or allBlogs changes

  // function to check isActive
  function isActive(path) {
    return location.pathname === path;
  }

  useEffect(() => {
    async function getBlogs() {
      try {
        const result = await getAllPost();
        const response = await getLoggedInUser();
        if (result.success) {
          setAllBlogs(result.blogs);
        }

        if (response.success) {
          setUser(response.user);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    getBlogs();
  }, []);

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
                : "text-gray-600"
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

        <div className="profile flex justify-between items-center gap-5 lg:gap-10 relative">
          <div className="search relative">
            <form className="relative">
              <IoSearchOutline className="absolute text-2xl top-2 left-2 text-gray-600" />
              <input
                type="text"
                placeholder="Search articles..."
                className="border border-gray-400 w-55 lg:w-75 py-1 px-10 rounded-lg text-lg focus:outline-[#ff7b00] bg-gray-200"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
              />
            </form>

            {searchInput.length > 0 ? (
              <div className="absolute w-full py-2 max-h-75 z-2 bg-[#F3F4F6] px-2 overflow-auto flex flex-col gap-2 rounded-lg shadow-lg">
                {filterBlog &&
                  filterBlog.map((blog) => {
                    return (
                      <Link
                        key={blog.id}
                        to={`/singleBlog/${blog?._id}`}
                        onClick={() => {
                          setSearchInput("");
                        }}
                        className="w-full border border-gray-300 p-2 rounded-lg hover:bg-gray-200 block"
                      >
                        {blog?.title?.length > 50
                          ? blog?.title?.substring(0, 50)
                          : blog?.title}
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          {/* User Profile */}
          <div
            className="border border-gray-400 lg:w-12 lg:h-12 w-10 h-10 rounded-full flex justify-center items-center hover:border-[#ff7b00] active:scale-96"
            onClick={() => {
              setUserProfile(!userProfile);
            }}
          >
            {user ? (
              <img
                key={user._id}
                src={`${user.profilePicture}`}
                className="w-full h-full aspect-auto rounded-full"
              />
            ) : (
              <FaRegUser className="text-xl lg:text-xl text-gray-800" />
            )}
          </div>

          {userProfile ? (
            <div className="absolute w-[50%] top-14 right-0 z-1 flex flex-col items-end gap-2 shadow-lg py-4 px-2 rounded-lg bg-[#F3F4F6]">
              <Link
                to={"/dashboard/userProfile"}
                className="border border-gray-400 w-full rounded-md p-2 text-center hover:bg-[#ff7b00] hover:text-white active:scale-96"
              >
                Profile
              </Link>
              <Link className="border border-red-400 w-full rounded-md p-2 text-center hover:bg-red-700 hover:text-white active:scale-96">
                Logout
              </Link>
            </div>
          ) : null}
        </div>
      </nav>

      <div>{children}</div>
    </>
  );
};

export default Navbar;
