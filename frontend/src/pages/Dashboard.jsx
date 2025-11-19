import { useContext, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import PostDashboard from "./Dashboards/PostDashboard";
import UserDashboard from "./Dashboards/UserDashboard";
import SettingDashboard from "./Dashboards/SettingDashboard";
import {formatCreatedAt} from '../components/DateConverter'
import UserProfile from "./UserProfile";

const Dashboard = () => {
  // useContext functions
  const { getUserBlog, userLogout } = useContext(AuthContext);

  // React Router-Dom hooks
  const location = useLocation();
  const navigate = useNavigate();
  const param = useParams();

  // local Component State
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState(null);

  console.log(param)

  async function getData() {
    const result = await getUserBlog();
    console.log('Result', result);

    if (!result.success) return navigate("/auth/login");

    if (result.success) {
      setUser(result.user);
      setBlogs(result.blogs);
    }
  }

  async function logout() {
    try {
      const response = await userLogout();

      if (response.success) {
        navigate('/auth/login')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getData();
  }, [param]);

  function isActive(path = "/dashboard/dashboard") {
    return location.pathname === path;
  }

  return (
    <>
      <section className="w-full lg:h-[85vh] h-[87.25vh] flex flex-col lg:flex-row gap-5 overflow-auto no-scrollbar">
        <aside className="lg:w-[15%] lg:h-full border-r border-gray-400 flex flex-col lg:px-5 gap-5 ">
          <div className="profile lg:flex gap-2 mt-4 justify-between items-center p-2 rounded-xl shadow-xl bg-[#facd7bde] hidden">
            <div className="border border-gray-400 w-16 h-12 rounded-full flex justify-center items-center hover:border-[#ff7b00]">
              {user ? user.map(user => {
                return (
                  <img key={user._id} src={`${user.profilePicture}`} className="w-full h-full aspect-auto rounded-full"/>
                )
              }) : <FaRegUser className="text-xl lg:text-xl text-gray-800" />}
              
            </div>

            <div className="flex flex-col w-full">
              <h1 className="font-semibold paragraph-body">{user && user?.map(user => {user?.firstName && user?.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : "Anonymous"})}</h1>
              <p className="text-sm text-gray-600 italic">
                {user?.map(user => formatCreatedAt(user?.createdAt))}
              </p>
            </div>
          </div>

          <div className="lg:p-5 py-2 px-4 shadow-lg lg:rounded-xl w-full flex lg:relative fixed overflow-scroll no-scrollbar bg-[#F3F4F6] z-5">
            <div className="w-full flex flex-row justify-between lg:flex-col gap-2">
              {/* Each category has unique path */}
              <Link
                to={"/dashboard"}
                className={`lg:w-[85%] w-fit  flex justify-start items-center gap-2 text-sm p-2 rounded-lg ${
                  isActive("/dashboard")
                    ? "bg-[#ff7b00] text-white font-medium"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <MdOutlineDashboard className="text-xl"/> Dashboard
              </Link>
              <Link
                to={"/dashboard/myPosts"}
                className={`lg:w-[85%] w-fit flex justify-start items-center gap-2 text-sm p-2 rounded-lg ${
                  isActive("/dashboard/myPosts")
                    ? "bg-[#ff7b00] text-white font-medium"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <MdOutlinePostAdd className="text-xl"/> <span>My</span> posts
              </Link>
              <Link
                to={"/dashboard/analytics"}
                className={`lg:w-[85%] w-fit flex justify-start items-center gap-2 text-sm p-2 rounded-lg ${
                  isActive("/dashboard/analytics")
                    ? "bg-[#ff7b00] text-white font-medium"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <SiGoogleanalytics className="text-xl"/> Analytics
              </Link>
              <Link
                to={"/dashboard/comments"}
                className={`lg:w-[85%] w-fit flex justify-start items-center gap-2 text-sm p-2 rounded-lg ${
                  isActive("/dashboard/comments")
                    ? "bg-[#ff7b00] text-white font-medium"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <FaRegCommentAlt className="text-xl"/> Comments
              </Link>
              <Link
                to={"/dashboard/settings"}
                className={`lg:w-[85%] w-fit flex justify-start items-center gap-2 text-sm p-2 rounded-lg ${
                  isActive("/dashboard/settings")
                    ? "bg-[#ff7b00] text-white font-medium"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <MdOutlineSettings className="text-xl"/> Settings
              </Link>
            </div>
          </div>

          <div className="mt-auto lg:flex flex-col gap-4 py-5 hidden">
            <div className="btn w-full mt-auto">
              <button
                onClick={() => {
                  navigate("/createBlog");
                }}
                className="bg-[#ff7b00] w-full p-3 rounded-lg text-white font-medium paragraph-body flex justify-center items-center gap-2"
              >
                Create New Post
              </button>
            </div>

            <div className="btn w-full mt-auto">
              <button
                onClick={() => {
                  logout()  
                }}
                className="w-full p-3 rounded-lg font-medium paragraph-body flex justify-center items-center gap-2 hover:border hover:border-[#ff7b00]"
              >
                <MdLogout /> Log Out
              </button>
            </div>
          </div>
        </aside>
        <div className="w-full py-5 lg:mt-0 lg:py-0">
          {location?.pathname === '/dashboard' ? <UserDashboard user={user} blogs={blogs} /> : location.pathname === "/dashboard/myPosts" ? (
            <PostDashboard user={user} blogs={blogs} />
          ) : location?.pathname === '/dashboard/settings' ? <SettingDashboard user={user} blogs={blogs}/>: location.pathname === "/dashboard/userProfile" ? <UserProfile user={user} blogs={blogs} /> : null}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
