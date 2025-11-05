import React from "react";
import { MdOutlineEdit, MdOutlinePostAdd } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

const UserDashboard = ({ user, blogs }) => {
  console.log(user);
  return (
    <section className="px-25 flex flex-col gap-10">
      <div className="py-5 flex justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-4xl">
            Welcome Back! {user?.map((user) => user?.username)} 👋
          </h1>
          <p className="font-semibold text-2xl text-gray-500">
            Here's a snapshot of your blogging activity.
          </p>
        </div>

        <div className="btn w-[25%] flex gap-10 mt-4">
          <button
            onClick={() => {
              navigate("/createBlog");
            }}
            className="bg-[#ff7b00] w-full p-2 lg:p-4  rounded-lg lg:rounded-xl text-white font-medium text-lg lg:text-2xl"
          >
            Create New Post
          </button>

          <button
            onClick={() => {
              navigate("/createBlog");
            }}
            className="w-full p-2 lg:p-4 rounded-lg lg:rounded-xl font-medium text-lg lg:text-2xl border border-[#ff7b00]"
          >
            Manage Post
          </button>
        </div>
      </div>

      <div className="  flex justify-between gap-10 px-25">
        <div className="w-[20%] h-[22vh] shadow-xl rounded-4xl p-8 flex flex-col gap-5">
          <div className="flex gap-10 justify-between items-start">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-gray-500">Total Posts</h1>
              <h1 className="text-5xl font-bold">{blogs && blogs.length}</h1>
            </div>
            <MdOutlinePostAdd className="font-bold text-4xl text-[#ff7b00]" />
          </div>
          <div className="flex justify-between items-center mt-auto">
            <div className="flex justify-center items-center gap-3">
              <GoDotFill className="text-green-500" />
              <div>
                <h1 className="text-xl">{blogs && blogs.length}</h1>
                <p className="text-gray-500 text-xl">Published</p>
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center gap-3">
                <GoDotFill className="text-yellow-500" />
                <div>
                  <h1 className="text-xl">{blogs && blogs.length}</h1>
                  <p className="text-gray-500 text-xl">Draft</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[20%] h-[22vh] shadow-xl rounded-4xl p-8 flex flex-col gap-5">
          <div className="flex gap-10 justify-between items-start">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-gray-500">Total Views</h1>
              <h1 className="text-5xl font-bold">{blogs && blogs.length}</h1>
            </div>
            <IoEyeOutline className="font-bold text-4xl text-[#ff7b00]" />
          </div>
          <div className="flex justify-between items-center mt-auto">
            <p className="text-green-500 text-xl">+12% from last month</p>
          </div>
        </div>

        <div className="w-[20%] h-[22vh] shadow-xl rounded-4xl p-8 flex flex-col gap-5">
          <div className="flex gap-10 justify-between items-start">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-gray-500">Total Likes</h1>
              <h1 className="text-5xl font-bold">{blogs && blogs.length}</h1>
            </div>
            <AiOutlineLike className="font-bold text-4xl text-[#ff7b00]" />
          </div>
          <div className="flex justify-between items-center mt-auto">
            <p className="text-green-500 text-xl">+12% from last month</p>
          </div>
        </div>

        <div className="w-[20%] h-[22vh] shadow-xl rounded-4xl p-8 flex flex-col gap-5">
          <div className="flex gap-10 justify-between items-start">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-gray-500">Comments</h1>
              <h1 className="text-5xl font-bold">{blogs && blogs.length}</h1>
            </div>
            <FaRegCommentAlt className="font-bold text-4xl text-[#ff7b00]" />
          </div>
          <div className="flex justify-between items-center mt-auto">
            <p className="text-gray-500 text-xl">32 new comments waiting </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-4xl">Recent Blogs</h1>

        <div className="w-full border border-gray-400 shadow-lg rounded-2xl">
          <div className="flex justify-between py-5 px-10 border-b border-gray-400 text-xl font-bold gap-4 bg-amber-400 rounded-2xl">
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
                  <div className="flex justify-between py-5 px-10 border-b border-gray-400 text-xl font-bold gap-4">
                    <h1 className="w-full">
                      {blog?.title.length > 20
                        ? blog?.title?.substring(0, 20)
                        : blog?.title}
                    </h1>
                    <h1 className="w-full capitalize font-medium text-gray-600">
                      {blog?.category}
                    </h1>
                    <h1 className="w-full text-green-500 font-semibold">
                      Published
                    </h1>
                    <h1 className="w-full">{Date.now(blog?.createdAt)}</h1>
                    <h1 className="w-[30%] flex justify-center items-center ">
                      <MdOutlineEdit className="text-2xl" />
                    </h1>
                    <h1 className="w-[30%] flex justify-center items-center">
                      <IoEyeOutline className="text-2xl" />
                    </h1>
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
