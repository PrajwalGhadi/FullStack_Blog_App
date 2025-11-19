import React from "react";
import { MdOutlineEdit, MdOutlinePostAdd } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import {formatCreatedAt} from '../../components/DateConverter'
import { useNavigate } from "react-router-dom";

const UserDashboard = ({ user, blogs }) => {

  const navigate = useNavigate()

  const totalLikes =
    blogs &&
    blogs.reduce((accumulator, blog) => {
      return accumulator + (blog?.likes?.length || 0);
    }, 0);

  return (
    <section className="lg:px-25 px-5 flex flex-col gap-5 overflow-auto no-scrollbar">
      <div className="py-5 flex lg:flex-row flex-col justify-between gap-4">
        <div className="flex flex-col w-full">
          <h1 className="font-bold heading-smallheader">
            Welcome Back! {user?.map((user) => user?.username)} 👋
          </h1>
          <p className="font-normal paragraph-body text-gray-500">
            Here's a snapshot of your blogging activity.
          </p>
        </div>

        <div className="btn w-full flex gap-5 lg:justify-end justify-center items-center">
          <button
            onClick={() => {
              navigate("/createBlog");
            }}
            className="bg-[#ff7b00] w-fit p-3 rounded-lg text-white font-medium paragraph-body flex justify-center items-center gap-2"
          >
            Create New Post
          </button>

          <button
            onClick={() => {
              navigate("/dashboard/myPosts");
            }}
            className="w-fit p-3 rounded-lg border border-amber-400 font-medium paragraph-body flex justify-center items-center gap-2"
          >
            Manage Post
          </button>
        </div>
      </div>

      <div className="w-full flex justify-between items-center lg:gap-10 gap-5 lg:px-25 flex-wrap">
        <div className="w-[47%] lg:w-[17%] min-h-[15vh] h-[17vh] shadow-xl rounded-2xl lg:p-4 p-2 flex flex-col lg:gap-5 ">
          <div className="flex gap-5 lg:gap-10 justify-between items-start">
            <div className="flex flex-col gap-2">
              <h1 className=" text-md lg:text-xl font-bold text-gray-500">
                Total Posts
              </h1>
              <h1 className=" text-xl lg:text-2xl font-bold">
                {blogs && blogs.length}
              </h1>
            </div>
            <MdOutlinePostAdd className=" font-bold text-xl lg:text-2xl text-[#ff7b00]" />
          </div>
          <div className="flex justify-between items-center mt-auto">
            <div className="flex justify-center items-center gap-2">
              <GoDotFill className="text-green-500" />
              <div>
                <h1 className="text-lg">{blogs && blogs.length}</h1>
                <p className="text-gray-500 text-sm">Published</p>
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center gap-2">
                <GoDotFill className="text-yellow-500" />
                <div>
                  <h1 className="text-lg">0</h1>
                  <p className="text-gray-500 text-sm">Draft</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[47%] lg:w-[17%] min-h-[15vh] h-[17vh] shadow-xl rounded-2xl lg:p-4 p-2 flex flex-col lg:gap-5 ">
          <div className="flex gap-5 lg:gap-10 justify-between items-start">
            <div className="flex flex-col gap-2">
              <h1 className="text-md lg:text-xl font-bold text-gray-500">
                Total Views
              </h1>
              <h1 className="text-xl lg:text-2xl font-bold">
                {blogs && blogs?.reduce((accumulator, blog)=> {
                  return accumulator + blog?.views
                }, 0)}
              </h1>
            </div>
            <IoEyeOutline className="font-bold text-xl lg:text-2xl text-[#ff7b00]" />
          </div>
          <div className="flex justify-between items-center mt-auto">
            <p className="text-green-500 text-sm">+12% from last month</p>
          </div>
        </div>

        <div className="w-[47%] lg:w-[17%] min-h-[15vh] h-[17vh] shadow-xl rounded-2xl lg:p-4 p-3 flex flex-col gap-5 ">
          <div className="flex gap-5 lg:gap-10 justify-between items-start">
            <div className="flex flex-col gap-2">
              <h1 className="text-md lg:text-xl font-bold text-gray-500">
                Total Likes
              </h1>
              <h1 className="text-xl lg:text-2xl font-bold">{totalLikes}</h1>
            </div>
            <AiOutlineLike className="font-bold text-lg lg:text-2xl text-[#ff7b00]" />
          </div>
          <div className="flex justify-between items-center mt-auto">
            <p className="text-green-500 text-sm">+12% from last month</p>
          </div>
        </div>

        <div className="w-[47%] lg:w-[17%] min-h-[15vh] h-[17vh] shadow-xl rounded-2xl lg:p-4 p-3 flex flex-col lg:gap-5 ">
          <div className="flex gap-5 lg:gap-10 justify-between items-start">
            <div className="flex flex-col gap-2">
              <h1 className="text-md lg:text-xl font-bold text-gray-500">
                Comments
              </h1>
              <h1 className="text-xl lg:text-2xl font-bold">
                0
              </h1>
            </div>
            <FaRegCommentAlt className="font-bold text-lg lg:text-xl text-[#ff7b00]" />
          </div>
          <div className="flex justify-between items-center mt-auto">
            <p className="text-gray-500 text-sm flex">32 new comments</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="font-bold heading-smallheader">Recent Blogs</h1>

        <div className="w-full rounded-2xl flex flex-col gap-5 lg:gap-0">
          <div className="lg:flex justify-between py-4 px-10 border-gray-300 text-lg font-semibold gap-2 bg-amber-400 rounded-xl hidden">
            <h1 className="w-full">Title</h1>
            <h1 className="w-full">Category</h1>
            <h1 className="w-full">Status</h1>
            <h1 className="w-full">Date</h1>
            <h1 className="w-[30%]">Edit</h1>
            <h1 className="w-[30%]">Preview</h1>
          </div>

          {blogs &&
            blogs?.map((blog) => {
              return (
                <>
                  <div className="lg:flex justify-between py-4 px-10 border-b border-gray-300 text-md font-bold gap-2 hidden rounded-2xl">
                    <h1 className="w-full font-semibold">
                      {blog?.title.length > 20
                        ? blog?.title?.substring(0, 20)
                        : blog?.title}
                    </h1>
                    <h1 className="w-full capitalize font-normal text-gray-900">
                      {blog?.category}
                    </h1>
                    <h1 className="w-full text-green-500 font-normal">
                      Published
                    </h1>
                    <h1 className="w-full font-medium">{formatCreatedAt(blog?.createdAt)}</h1>
                    <h1 className="w-[30%] flex justify-center items-center ">
                      <MdOutlineEdit className="text-2xl text-blue-500" />
                    </h1>
                    <h1 className="w-[30%] flex justify-center items-center">
                      <IoEyeOutline className="text-2xl text-amber-600" />
                    </h1>
                  </div>

                  <div className="flex justify-between py-2 px-2 border rounded-lg border-gray-300 text-md font-bold gap-2 lg:hidden flex-col">
                    <div className="flex justify-between items-center gap-2 py-2">
                      <h1 className="w-full text-wrap font-semibold">
                        {blog?.title.length > 50
                          ? blog?.title?.substring(0, 50)
                          : blog?.title}
                      </h1>
                      <h1 className="w-full capitalize font-medium text-gray-600 lg:flex hidden">
                        {blog?.category}
                      </h1>
                      <h1 className="w-[30%] text-green-500 font-normal">
                        Published
                      </h1>
                    </div>

                    <div className="flex justify-between items-center gap-2 border-t border-gray-300 py-2">
                      <h1 className="w-full text-gray-500 italic font-normal text-sm">
                        {formatCreatedAt  (blog?.createdAt)}
                      </h1>
                      <h1 className="w-[30%] flex justify-center items-center gap-1 p-1 border border-gray-400 rounded-md text-md text-blue-500 font-normal">
                        <MdOutlineEdit className="text-xl" /> Edit
                      </h1>
                      <h1 className="w-[30%] flex justify-center items-center gap-1 border border-gray-400 p-1 rounded-md text-md text-amber-600 font-normal">
                        <IoEyeOutline className="text-xl" /> View
                      </h1>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
