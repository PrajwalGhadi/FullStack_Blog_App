import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { FaRegUser } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { MdOutlineShare } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";

const SingleBlog = () => {
  const [singleBlog, setSingleBlog] = useState();
  const [allBlog, setAllBlog] = useState();
  const param = useParams();

  const { getSingleBlog, getAllPost } = useContext(AuthContext);

  async function getBlog() {
    const response = await getSingleBlog(param.id);
    const getAllBlog = await getAllPost();

    if (response.success && getAllBlog.success) {
      setSingleBlog(response.singleBlog);
      setAllBlog(getAllBlog.blogs?.filter(blog => blog?.category === response.singleBlog?.category && blog?._id !== response.singleBlog?._id));
    }
  }

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <>
      <section className="w-full h-[93.25vh] flex gap-5">
        <div className="blogContentContainer w-full px-20 py-10">
          <div className="blogContent w-full h-full py-5 px-40 flex flex-col gap-10 overflow-auto no-scrollbar shadow-xl">
            <div className="title w-full flex flex-col justify-center items-center flex-wrap gap-5">
              <h1 className="text-2xl font-bold capitalize text-[#ff7b00]">
                {singleBlog?.category}
              </h1>
              <h1 className="text-4xl font-bold">{singleBlog?.title}</h1>
              <div className="profile flex gap-5 mt-5 justify-between items-center py-4 px-6 rounded-4xl shadow-xl bg-[#facd7bde]">
                <div className="border border-gray-400 lg:w-15 lg:h-15 w-10 h-10 rounded-full flex justify-center items-center hover:border-[#ff7b00]">
                  <FaRegUser className="text-xl lg:text-3xl text-gray-800" />
                </div>

                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold text-2xl">
                    {singleBlog?.authorName}
                  </h1>
                  <p className="text-xl text-gray-600 italic">
                    Published on Aug 28 1999
                  </p>
                </div>
              </div>

              <div className="likeViews flex gap-5 mt-5  justify-between items-center py-4 px-6">
                <h1 className="flex justify-center items-center gap-2 text-2xl text-gray-600 border-r border-gray-400 pr-5">
                  <CiHeart className="text-3xl" />
                  <span>1.2k</span>
                </h1>
                <h1 className="flex justify-center items-center gap-2 text-2xl text-gray-600">
                  <IoEyeOutline className="text-3xl" />
                  <span>1.2k</span>
                </h1>
              </div>
            </div>

            <div className="image flex justify-center items-center">
              <img
                src={singleBlog?.imageUrl}
                alt=""
                className=" w-[50%] aspect-auto rounded-4xl"
              />
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: singleBlog?.content }}
              className="text-xl"
            />
          </div>
        </div>
        <aside className="w-[25%] border-l border-gray-400 p-10 pr-15 flex flex-col gap-5 overflow-auto no-scrollbar">
          {/* Author Details */}
          <div className="authorDetails flex flex-col gap-4 shadow-xl p-5 rounded-2xl">
            <h1 className="text-2xl font-bold">About the Author</h1>
            <div className="author flex items-center gap-5 p-4 shadow-xl rounded-2xl bg-[#facd7bde]">
              <div className="border border-gray-400 lg:w-15 lg:h-15 w-10 h-10 rounded-full flex justify-center items-center hover:border-[#ff7b00]">
                <FaRegUser className="text-xl lg:text-3xl text-gray-800" />
              </div>

              <div className="flex flex-col gap-1">
                <h1 className="text-xl font-bold">{singleBlog?.authorName}</h1>
                <p className="text-lg text-blue-500">@{"Author Username"}</p>
              </div>
            </div>

            <div className="userDescription">
              <p>...</p>
            </div>
          </div>

          {/* Related Post */}
          <div className="shadow-xl p-6 rounded-2xl h-[45vh]">
            <h1 className="text-2xl font-bold">Related Post</h1>

            <div className="h-full flex flex-col gap-5 mt-5 overflow-auto no-scrollbar">
              {allBlog?.map((blog) => {
                return (
                  <>
                    <div className="flex justify-center items-center gap-4 cursor-pointer shadow-md rounded-2xl bg-amber-50 py-2 px-4">
                      <div className="border border-gray-400 lg:w-25 lg:h-15 w-10 h-10 rounded-full flex justify-center items-center hover:border-[#ff7b00]">
                        <FaRegUser className="text-xl lg:text-3xl text-gray-800" />
                      </div>

                      <div className="flex flex-col gap-1">
                        <h1 className="text-xl font-semibold">
                          {blog?.title.length > 40
                            ? blog?.title?.substring(0, 40)
                            : blog?.title}
                        </h1>
                        <p className="text-lg text-blue-500">
                          @{Date.now(blog?.createdAt)}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          {/* Like and Share Button */}
          <div className="flex flex-col gap-4">
            <div className="btn w-full">
              <button
                type="submit"
                className="bg-[#ff7b00] w-full p-2 lg:p-4 rounded-lg lg:rounded-xl text-white font-medium text-lg lg:text-2xl flex justify-center items-center gap-4"
              >
                <CiHeart className="text-3xl font-bold" /> Like this post
              </button>
            </div>
            <div className="btn w-full">
              <button
                type="submit"
                className="w-full p-2 lg:p-4 rounded-lg lg:rounded-xl border border-amber-400 font-medium text-lg lg:text-2xl flex justify-center items-center gap-4 "
              >
                <MdOutlineShare className="text-3xl font-bold" /> Share
              </button>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
};

export default SingleBlog;
