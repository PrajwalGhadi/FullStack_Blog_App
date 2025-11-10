import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdOutlineEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { CiHeart } from "react-icons/ci";

const PostDashboard = ({ user, blogs }) => {
  const navigate = useNavigate();
  console.log(user, blogs);
  return (
    <>
      <section className="lg:px-25 px-5 flex flex-col gap-2 w-full">
        <div className="w-full py-5 flex lg:flex-row flex-col justify-between gap-4">
          <div className="w-full flex flex-col">
            <h1 className="font-bold heading-smallheader">Manage Your Posts</h1>
            <p className="font-normal paragraph-body text-gray-500">
              Oversee, edit and control your creative content
            </p>
          </div>

          <div className="btn full lg:w-[15%] lg:mt-5 flex items-center justify-center">
            <button
              onClick={() => {
                navigate("/createBlog");
              }}
              className="bg-[#ff7b00] w-fit p-3 rounded-lg lg:rounded-xl text-white font-medium lg:text-xl text-md flex justify-center items-center gap-2"
            >
              Create New Post
            </button>
          </div>
        </div>
        <div className="py-5 flex justify-between items-center gap-5 w-full lg:flex-row flex-col">
          <form className="w-full relative shadow-lg rounded-xl">
            <IoSearchOutline className="absolute text-2xl lg:top-4 top-3 left-2 text-gray-600" />
            <input
              type="text"
              placeholder="Search by title..."
              className="border border-gray-400 w-full lg:py-3 py-2 lg:px-12 px-10 rounded-xl text-lg focus:outline-[#ff7b00] bg-white"
            />
          </form>

          <div className="flex gap-5 justify-start lg:w-[40%] ">
            {/* Publish or Draft Selection */}
            <select className="w-fit border-2 border-gray-300 px-4 py-3 rounded-xl bg-white shadow-sm focus:border-[#ff7b00] focus:ring-2 focus:ring-[#ff7b00] transition-all">
              <option value="select">Select</option>
              <option value="publish">Publish</option>
              <option value="draft">Draft</option>
            </select>

            {/* Category Selection */}
            <select className="w-fit border border-gray-300 px-4 py-3 rounded-xl bg-white shadow-sm focus:border-[#ff7b00] focus:ring-2 focus:ring-[#ff7b00] transition-all">
              <option value="all" className="border border-gray-400">
                All Topics
              </option>
              <option value="technology">Technology</option>
              <option value="design">Design</option>
              <option value="lifestyle">LifeStyle</option>
              <option value="productivity">Productivity</option>
            </select>

            {/* Menu Selection */}
            <div className="w-fit border-2 border-gray-300 px-4 py-3 rounded-xl bg-white shadow-sm focus:border-[#ff7b00] focus:ring-2 focus:ring-[#ff7b00] transition-al">
              <HiOutlineMenuAlt2 />
            </div>
          </div>
        </div>

        {/* Table  to show posts */}
        <div className="w-full lg:shadow-lg lg:rounded-2xl rounded-lg flex flex-col gap-4">
          <div className="lg:flex justify-between py-3 px-10 border-gray-400 text-lg font-semibold gap-4 bg-amber-400 rounded-xl hidden">
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
            blogs?.map((blog, index) => {
              return (
                <>
                  <div className={`lg:flex justify-between py-3 px-10 ${index === blogs.length - 1 ? '' : 'lg:border-b'}  border-gray-400 text-md font-bold gap-4 hidden`}>
                    <h1 className="w-full">
                      {blog?.title.length > 20
                        ? blog?.title?.substring(0, 20)
                        : blog?.title}
                    </h1>
                    <h1 className="w-full capitalize font-normal text-gray-600">
                      {blog?.category}
                    </h1>
                    <h1 className="w-full text-green-500 font-normal">
                      Published
                    </h1>
                    <h1 className="w-full font-medium">{Date.now(blog?.createdAt)}</h1>
                    <h1 className="w-full font-normal">Views</h1>
                    <h1 className="w-full font-normal">{blog?.likes.length}</h1>
                    <h1 className="w-[30%] flex justify-center items-center text-blue-500">
                      <MdOutlineEdit className="text-2xl" />
                    </h1>
                    <h1 className="w-[30%] flex justify-center items-center text-amber-600">
                      <IoEyeOutline className="text-2xl" />
                    </h1>
                    <h1 className="w-[30%] flex justify-center items-center">
                      <MdDeleteOutline className="text-2xl text-red-500" />
                    </h1>
                  </div>

                  <div className="flex justify-between py-2 px-2 border rounded-xl border-gray-400 text-md font-bold gap-2 lg:hidden flex-col">
                    <div className="flex justify-between gap-6 py-2">
                      <h1 className="w-full text-wrap">
                        {blog?.title.length > 50
                          ? blog?.title?.substring(0, 50)
                          : blog?.title}
                      </h1>
                      <h1 className="w-full capitalize font-medium text-gray-600 lg:flex hidden">
                        {blog?.category}
                      </h1>
                      <h1 className="w-[30%] text-green-500 font-semibold">
                        Published
                      </h1>
                    </div>

                    <div className="flex justify-between items-center gap-2 border-t border-gray-400 py-2">
                      <h1 className="w-full hidden">{Date.now(blog?.createdAt)}</h1>
                      <h1 className="w-full flex gap-2 items-center text-md"><IoEyeOutline /> Views</h1>
                      <h1 className="w-full flex gap-2 items-center text-md"><CiHeart /> {blog?.likes.length}</h1>
                      <h1 className="w-[30%] flex justify-center items-center gap-1 p-1 border border-gray-400 rounded-md text-md">
                        <MdOutlineEdit className="text-xl" /> Edit
                      </h1>
                      <h1 className="w-[30%] flex justify-center items-center gap-1 border border-gray-400 p-1 rounded-md text-md">
                        <IoEyeOutline className="text-xl" /> View
                      </h1>
                      <h1 className="w-[30%] flex justify-center items-center gap-1 text-red-500 border p-1 rounded-md text-md">
                        <MdDeleteOutline className="text-xl text-red-500" /> Delete
                      </h1>
                    </div>
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
