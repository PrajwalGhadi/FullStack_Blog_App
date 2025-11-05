import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdOutlineEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

const PostDashboard = ({ user, blogs }) => {
  const navigate = useNavigate();
  console.log(user, blogs);
  return (
    <>
      <section className="px-25 flex flex-col gap-4">
        <div className="py-5 flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-4xl">Manage Your Posts</h1>
            <p className="font-semibold text-2xl text-gray-500">
              Oversee, edit and control your creative content
            </p>
          </div>

          <div className="btn w-[15%] mt-5">
            <button
              onClick={() => {
                navigate("/createBlog");
              }}
              className="bg-[#ff7b00] w-full p-2 lg:p-4 rounded-lg lg:rounded-xl text-white font-medium text-lg lg:text-2xl"
            >
              Create New Post
            </button>
          </div>
        </div>
        <div className="py-5 flex justify-between items-center gap-10 w-full">
          <form className="w-[60%] relative shadow-lg rounded-2xl">
            <IoSearchOutline className="absolute text-2xl lg:text-3xl top-5 left-2 text-gray-600" />
            <input
              type="text"
              placeholder="Search by title..."
              className="border border-gray-400 w-55 lg:w-full py-1 px-12 lg:py-5 rounded-xl text-lg lg:text-xl focus:outline-[#ff7b00]"
            />
          </form>

          <div className="flex gap-5 justify-start w-[40%] ">
            {/* Publish or Draft Selection */}
            <select className="w-fit border-2 border-gray-300 p-4 rounded-xl bg-white shadow-sm focus:border-[#ff7b00] focus:ring-2 focus:ring-[#ff7b00] transition-al">
              <option value="select">Select</option>
              <option value="publish">Publish</option>
              <option value="draft">Draft</option>
            </select>

            {/* Category Selection */}
            <select className="w-fit border border-gray-300 p-4 rounded-xl bg-white shadow-sm focus:border-[#ff7b00] focus:ring-2 focus:ring-[#ff7b00] transition-all">
              <option value="all" className="border border-gray-400">
                All Topics
              </option>
              <option value="technology">Technology</option>
              <option value="design">Design</option>
              <option value="lifestyle">LifeStyle</option>
              <option value="productivity">Productivity</option>
            </select>

            {/* Menu Selection */}
            <div className="w-fit border-2 border-gray-300 p-4 rounded-xl bg-white shadow-sm focus:border-[#ff7b00] focus:ring-2 focus:ring-[#ff7b00] transition-al">
              <HiOutlineMenuAlt2 />
            </div>
          </div>
        </div>

        {/* Table  to show posts */}
        <div className="w-full border border-gray-400 shadow-lg rounded-2xl">
          <div className="flex justify-between py-5 px-10 border-b border-gray-400 text-xl font-bold gap-4 bg-amber-400 rounded-2xl">
            <h1 className="w-full">Title</h1>
            <h1 className="w-full">Category</h1>
            <h1 className="w-full">Status</h1>
            <h1 className="w-full">Date</h1>
            <h1 className="w-full">Views</h1>
            <h1 className="w-full">Likes</h1>
            <h1 className="w-[30%]">Edit</h1>
            <h1 className="w-[30%]">Preview</h1>
            <h1 className="w-[30%]">Delete</h1>
          </div>

          {blogs &&
            blogs?.map((blog) => {
              return (
                <>
                  <div className="flex justify-between py-5 px-10 border-b border-gray-400 text-xl font-bold gap-4">
                    <h1 className="w-full">{blog?.title.length > 20 ? blog?.title?.substring(0, 20): blog?.title}</h1>
                    <h1 className="w-full capitalize font-medium text-gray-600">{blog?.category}</h1>
                    <h1 className="w-full text-green-500 font-semibold">Published</h1>
                    <h1 className="w-full">{Date.now(blog?.createdAt)}</h1>
                    <h1 className="w-full">Views</h1>
                    <h1 className="w-full">Likes</h1>
                    <h1 className="w-[30%] flex justify-center items-center "><MdOutlineEdit className="text-2xl"/></h1>
                    <h1 className="w-[30%] flex justify-center items-center"><IoEyeOutline className="text-2xl"/></h1>
                    <h1 className="w-[30%] flex justify-center items-center"><MdDeleteOutline className="text-2xl text-red-500"/></h1>
                  </div>
                </>
              );
            })}
        </div>
        <div></div>
      </section>
    </>
  );
};

export default PostDashboard;
