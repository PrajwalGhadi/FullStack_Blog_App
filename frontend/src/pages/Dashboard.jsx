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

const Dashboard = () => {
  const { getUserBlog } = useContext(AuthContext);
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const navigate = useNavigate();
  const param = useParams();

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

  useEffect(() => {
    getData();
  }, [param]);

  function isActive(path = "/dashboard/dashboard") {
    return location.pathname === path;
  }

  return (
    <>
      <section className="w-full h-[93.25vh] flex gap-5">
        <aside className="w-[15%] h-full border-r border-gray-400 flex flex-col px-5 gap-10">
          <div className="profile flex gap-4 mt-5 justify-between items-center py-4 px-3 rounded-4xl shadow-xl bg-[#facd7bde]">
            <div className="border border-gray-400 lg:w-15 lg:h-15 w-10 h-10 rounded-full flex justify-center items-center hover:border-[#ff7b00]">
              <FaRegUser className="text-xl lg:text-3xl text-gray-800" />
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-2xl">{user?.username}</h1>
              <p className="text-lg text-gray-600 italic">
                Published on Aug 28 1999
              </p>
            </div>
          </div>

          <div className="p-5 shadow-xl rounded-2xl">
            <div className="flex flex-col gap-2">
              {/* Each category has unique path */}
              <Link
                to={"/dashboard"}
                className={`w-[85%] flex justify-start items-center gap-2 text-xl p-2 rounded-r-full ${
                  isActive("/dashboard")
                    ? "bg-[#ff7b00] text-white font-medium"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <MdOutlineDashboard /> Dashboard
              </Link>
              <Link
                to={"/dashboard/myPosts"}
                className={`w-[85%] flex justify-start items-center gap-2 text-xl p-2 rounded-r-full ${
                  isActive("/dashboard/myPosts")
                    ? "bg-[#ff7b00] text-white font-medium"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <MdOutlinePostAdd /> My Posts
              </Link>
              <Link
                to={"/dashboard/analytics"}
                className={`w-[85%] flex justify-start items-center gap-2 text-xl p-2 rounded-r-full ${
                  isActive("/dashboard/analytics")
                    ? "bg-[#ff7b00] text-white font-medium"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <SiGoogleanalytics /> Analytics
              </Link>
              <Link
                to={"/dashboard/comments"}
                className={`w-[85%] flex justify-start items-center gap-2 text-xl p-2 rounded-r-full ${
                  isActive("/dashboard/comments")
                    ? "bg-[#ff7b00] text-white font-medium"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <FaRegCommentAlt /> Comments
              </Link>
              <Link
                to={"/dashboard/settings"}
                className={`w-[85%] flex justify-start items-center gap-2 text-xl p-2 rounded-r-full ${
                  isActive("/dashboard/settings")
                    ? "bg-[#ff7b00] text-white font-medium"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <MdOutlineSettings /> Settings
              </Link>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-4 py-5">
            <div className="btn w-full mt-auto">
              <button
                onClick={() => {
                  navigate("/createBlog");
                }}
                className="bg-[#ff7b00] w-full p-2 lg:p-3 rounded-lg lg:rounded-xl text-white font-medium text-lg lg:text-xl"
              >
                Create New Post
              </button>
            </div>

            <div className="btn w-full mt-auto">
              <button
                onClick={() => {
                  navigate("/logout");
                }}
                className="w-full p-2 lg:p-3 rounded-lg lg:rounded-xl font-medium text-lg lg:text-xl flex justify-center items-center gap-4 hover:border hover:border-[#ff7b00]"
              >
                <MdLogout /> Log Out
              </button>
            </div>
          </div>
        </aside>
        <div className="w-full">
          {location?.pathname === '/dashboard' ? <UserDashboard user={user} blogs={blogs} /> : location.pathname === "/dashboard/myPosts" ? (
            <PostDashboard user={user} blogs={blogs} />
          ) : location?.pathname === '/dashboard/settings' ? <SettingDashboard user={user} blogs={blogs}/>: null}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
