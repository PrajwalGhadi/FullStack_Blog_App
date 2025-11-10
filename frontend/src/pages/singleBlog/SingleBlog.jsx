import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { FaRegUser } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { MdOutlineShare } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";

const SingleBlog = () => {
  const [singleBlog, setSingleBlog] = useState();
  const [allBlog, setAllBlog] = useState();
  const [loggedInUser, setLoggedInUser] = useState();
  const [likeMessage, setLikeMessage] = useState();
  const param = useParams();

  const { getSingleBlog, getAllPost, blogLiked, getLoggedInUser } = useContext(AuthContext);
  const navigate = useNavigate()

  async function getBlog() {
    const response = await getSingleBlog(param.id);
    const getAllBlog = await getAllPost();
    const getUser = await getLoggedInUser();

    if (response.success && getAllBlog.success) {
      setSingleBlog(response.singleBlog);
      setAllBlog(getAllBlog.blogs?.filter(blog => blog?.category === response.singleBlog?.category && blog?._id !== response.singleBlog?._id));
    }

    if (getUser.success) {
      setLoggedInUser(getUser.user);
      setLikeMessage(response.singleBlog?.likes.some(likedId => likedId === getUser.user._id))
    }
  }

  console.log(loggedInUser, likeMessage)

  async function handleLikedBtn(blogId) {
    try {
      const result = await blogLiked(blogId);

      console.log(result)
      if (!result?.success && !result?.isLogin) {
        navigate('/auth/login')
      }

      if (result.success) {
        setLikeMessage(result.message)
      }
    } catch(error) {
      console.log("Frontend Error from handledLikedBtn from SingleBlog Component: ", error.message);
    }
  }

  useEffect(() => {
    getBlog();
  }, [likeMessage, param]);

  return (
    <>
      <section className="w-full h-[93.25vh] flex gap-5">
        <div className="blogContentContainer w-full lg:px-20 lg:py-10 p-2">
          <div className="blogContent w-full h-full lg:py-5 lg:px-40 p-5 flex flex-col lg:gap-10 gap-5 overflow-auto no-scrollbar shadow-xl">
            <div className="title w-full flex flex-col justify-center items-center flex-wrap gap-5">
              {/* Category Name */}
              <h1 className="text-xl  font-bold capitalize text-[#ff7b00]">
                {singleBlog?.category}
              </h1>
             
             {/* Blog Title */}
              <h1 className="lg:text-2xl text-lg font-bold">{singleBlog?.title}</h1>

              {/* User Details */}
              <div className="profile flex gap-4 justify-between items-center p-4 rounded-2xl shadow-xl bg-[#facd7bde]">
                <div className="border border-gray-400 lg:w-15 lg:h-15 w-10 h-10 rounded-full flex justify-center items-center hover:border-[#ff7b00]">
                  <FaRegUser className="text-xl lg:text-2xl text-gray-800" />
                </div>

                <div className="flex flex-col lg:gap-2">
                  <h1 className="font-semibold text-lg lg:text-xl">
                    {singleBlog?.authorName}
                  </h1>
                  <p className="text-md text-gray-600 italic">
                    Published on Aug 28 1999
                  </p>
                </div>
              </div>

              {/* Likes and Views Count */}
              <div className="likeViews flex gap-5 justify-between items-center py-4 px-6">
                <h1 className="flex justify-center items-center gap-2 text-xl text-gray-600 border-r border-gray-400 pr-5">
                  <CiHeart className="text-2xl" />
                  <span>{singleBlog?.likes?.length}</span>
                </h1>
                <h1 className="flex justify-center items-center gap-2 text-xl text-gray-600">
                  <IoEyeOutline className="text-2xl" />
                  <span>1.2k</span>
                </h1>
              </div>
            </div>

            <div className="image flex justify-center items-center">
              <img
                src={singleBlog?.imageUrl}
                alt=""
                className=" lg:w-[50%] aspect-auto rounded-2xl"
              />
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: singleBlog?.content }}
              className="lg:text-lg text-md"
            />
          </div>
        </div>
        <aside className="w-[25%] border-l border-gray-400 p-4 pr-10 lg:flex flex-col gap-5 overflow-auto no-scrollbar hidden">
          {/* Author Details */}
          <div className="authorDetails flex flex-col gap-2 shadow-xl p-4 rounded-xl">
            <h1 className="text-xl font-bold">About the Author</h1>
            <div className="author flex items-center gap-5 p-4 shadow-xl rounded-xl bg-[#facd7bde]">
              <div className="border border-gray-400 lg:w-15 lg:h-15 w-10 h-10 rounded-full flex justify-center items-center hover:border-[#ff7b00]">
                <FaRegUser className="text-2xl text-gray-800" />
              </div>

              <div className="flex flex-col gap-1">
                <h1 className="text-md font-bold">{singleBlog?.authorName}</h1>
                <p className="text-sm text-blue-500">@{"Author Username"}</p>
              </div>
            </div>

            <div className="userDescription">
              <p>...</p>
            </div>
          </div>

          {/* Related Post */}
          <div className="shadow-xl p-6 rounded-2xl h-[45vh]">
            <h1 className="text-xl font-bold">Related Post</h1>

            <div className="h-full flex flex-col gap-5 mt-4 overflow-auto no-scrollbar">
              {allBlog?.map((blog) => {
                return (
                  <>
                    <div onClick={() => { navigate(`/singleBlog/${blog?._id}`) }} className="flex justify-center items-center gap-2 cursor-pointer shadow-md rounded-2xl bg-amber-50 py-2 px-4 hover:bg-amber-200">
                      <div className="border border-gray-400 lg:w-25 lg:h-15 w-10 h-10 rounded-full flex justify-center items-center hover:border-[#ff7b00]">
                        <FaRegUser className="text-xl text-gray-800" />
                      </div>

                      <div className="flex flex-col gap-1">
                        <h1 className="text-md font-semibold">
                          {blog?.title.length > 40
                            ? blog?.title?.substring(0, 40)
                            : blog?.title}
                        </h1>
                        <p className="text-md text-blue-500">
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
                className="bg-[#ff7b00] w-full p-3 rounded-lg lg:rounded-xl text-white font-medium text-xl flex justify-center items-center gap-2"
                onClick={()=> { handleLikedBtn(singleBlog?._id) }}
              >
                <CiHeart className="text-2xl font-bold" /> {likeMessage ? "Disliked" : "Liked"}
              </button>
            </div>
            <div className="btn w-full">
              <button
                type="submit"
                className="w-full p-3 rounded-lg lg:rounded-xl border border-amber-400 font-medium text-xl flex justify-center items-center gap-4 "
              >
                <MdOutlineShare className="text-2xl font-bold" /> Share
              </button>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
};

export default SingleBlog;
