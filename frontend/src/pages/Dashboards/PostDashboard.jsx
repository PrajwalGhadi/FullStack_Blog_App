import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdOutlineEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { MdOutlineReportProblem } from "react-icons/md";
import { formatCreatedAt } from "../../components/DateConverter";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Editor from "react-simple-wysiwyg";

const PostDashboard = ({ user, blogs }) => {
  const navigate = useNavigate();

  const [filterBlogs, setFilterBlogs] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (blogs) {
      const filtered = blogs.filter((blog) => {
        if (searchInput.length > 0) {
          return blog.title.toLowerCase().includes(searchInput.toLowerCase());
        } else {
          return blog;
        }
      });
      setFilterBlogs(filtered);
    }
  }, [searchInput, blogs]);

  // Delete functionality
  const { deleteBlog, getSingleBlog, udpatePost } = useContext(AuthContext); // Assume we have updateBlog
  const [closeBtn, setCloseBtn] = useState(false);
  const [deleteBtnSelected, setDeleteBtnSelected] = useState(false);
  const [selectedId, setSelectedId] = useState();

  async function deleteBlogID(blogId) {
    try {
      setCloseBtn(!closeBtn);

      const result = await deleteBlog(blogId);
      if (result.success) {
        navigate("/dashboard/myPosts");
      }
    } catch (error) {
      console.log("Error from deleteBlog: ", error.message);
    }
  }

  // View functionality
  const [viewBtnSelected, setViewBtnSelected] = useState(false);
  const [singleBlog, setSingleBlog] = useState();

  async function singleBlogID(blogId) {
    try {
      const result = await getSingleBlog(blogId);
      if (result.success) {
        setSingleBlog(result.singleBlog);
      }
    } catch (error) {
      console.log(
        "Error from singleBlogID function of PostDashboard Component: ",
        error.message
      );
    }
  }

  // Edit Functionality
  const [editBtnSelected, setEditBtnSelected] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [thumbnail, setThumbnail] = useState(null); // Can be null or a File

  const categories = [
    { id: "tech", label: "Technology", value: "technology" },
    { id: "design", label: "Design", value: "design" },
    { id: "prod", label: "Productivity", value: "productivity" },
    { id: "life", label: "Lifestyle", value: "lifestyle" },
  ];

  // Initialize form when singleBlog is set (for edit)
  useEffect(() => {
    if (singleBlog) {
      setTitle(singleBlog.title);
      setContent(singleBlog.content);
      setSelectedCategory(singleBlog.category);
      // We don't set the thumbnail state to the imageUrl because it's a string and we are using file input.
      // We can keep it null and if the user doesn't select a new file, we don't change the image.
    }
  }, [singleBlog]);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      console.log("handleSubmit clicked for edit");

      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", selectedCategory);
      // formData.append("image", thumbnail);

      const result = await udpatePost(singleBlog._id, formData); // Assume updateBlog takes id and formData

      if (!result.success && !result.isLogin) return navigate("/auth/login");

      if (result.success) {
        // Close the modal and refresh the data? or navigate?
        closeAllModals();
      }
    } catch (error) {
      console.log("Error from handleSubmit", error.message);
    }
  } 

  //ChatGPT Recommended this 
  const closeAllModals = () => {
    setCloseBtn(true);
    setDeleteBtnSelected(false);
    setViewBtnSelected(false);
    setEditBtnSelected(false);
  };

  useEffect(() => {}, [closeBtn, deleteBtnSelected, singleBlog]);

  return (
    <>
      <section className={`lg:px-25 px-5 flex flex-col gap-2 w-full relative`}>
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
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
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

          {filterBlogs &&
            filterBlogs?.map((blog, index) => {
              return (
                <>
                  <div
                    className={`lg:flex justify-between py-3 px-10 ${
                      index === blogs.length - 1 ? "" : "lg:border-b"
                    }  border-gray-400 text-md font-bold gap-4 hidden`}
                  >
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
                    <h1 className="w-full font-medium">
                      {formatCreatedAt(blog?.createdAt)}
                    </h1>
                    <h1 className="w-full font-normal">{blog?.views}</h1>
                    <h1 className="w-full font-normal">{blog?.likes.length}</h1>
                    <h1
                      className="w-[30%] flex justify-center items-center text-blue-500"
                      onClick={() => {
                        setEditBtnSelected(!editBtnSelected);
                        setCloseBtn(false);
                        singleBlogID(blog?._id);
                      }}
                    >
                      <MdOutlineEdit className="text-2xl" />
                    </h1>
                    <h1
                      className="w-[30%] flex justify-center items-center text-amber-600"
                      onClick={() => {
                        setViewBtnSelected(!viewBtnSelected);
                        setCloseBtn(false);
                        singleBlogID(blog?._id);
                      }}
                    >
                      <IoEyeOutline className="text-2xl" />
                    </h1>
                    <h1
                      className="w-[30%] flex justify-center items-center"
                      onClick={() => {
                        setDeleteBtnSelected(!deleteBtnSelected);
                        setCloseBtn(false);
                        setSelectedId(blog?._id);
                      }}
                    >
                      <MdDeleteOutline className="text-2xl text-red-500" />
                    </h1>
                  </div>

                  <div className="flex justify-between py-2 px-2 border rounded-xl border-gray-400 text-md font-bold gap-2 lg:hidden flex-col">
                    <div className="flex justify-between gap-6 py-2">
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

                    <div className="flex justify-between items-center gap-2 border-t border-gray-400 py-2">
                      <h1 className="w-full hidden">
                        {Date.now(blog?.createdAt)}
                      </h1>
                      <h1 className="w-full flex gap-2 items-center text-md font-medium">
                        <IoEyeOutline className="text-2xl" />
                        {blog?.views}
                      </h1>
                      <h1 className="w-full flex gap-2 items-center text-md font-medium">
                        <CiHeart className="text-2xl" /> {blog?.likes.length}
                      </h1>
                      <h1
                        className="w-[30%] flex justify-center items-center gap-1 p-1 border border-gray-400 rounded-md text-md text-blue-500 font-normal"
                        onClick={() => {
                          setEditBtnSelected(!editBtnSelected);
                          setCloseBtn(false);
                          singleBlogID(blog?._id);
                        }}
                      >
                        <MdOutlineEdit className="text-xl" /> Edit
                      </h1>
                      <h1
                        className="w-[30%] flex justify-center items-center gap-1 border border-gray-400 p-1 rounded-md text-md text-amber-600 font-normal"
                        onClick={() => {
                          setViewBtnSelected(!viewBtnSelected);
                          setCloseBtn(false);
                          singleBlogID(blog?._id);
                        }}
                      >
                        <IoEyeOutline className="text-xl" /> View
                      </h1>
                      <h1
                        className="w-[30%] flex justify-center items-center gap-1 text-red-500 border p-1 rounded-md text-md font-normal"
                        onClick={() => {
                          setDeleteBtnSelected(!deleteBtnSelected);
                          setCloseBtn(false);
                          setSelectedId(blog?._id);
                        }}
                      >
                        <MdDeleteOutline className="text-xl text-red-500" />{" "}
                        Delete
                      </h1>
                    </div>
                  </div>
                </>
              );
            })}
        </div>

        {deleteBtnSelected ? (
          <div
            className={`${
              closeBtn ? "hidden" : ""
            } absolute bottom-[30%] lg:bottom-0 lg:top-[50%] lg:left-[35%] w-[90%] lg:w-[30%] h-fit p-4 bg-[#F3F4F6] z-1 rounded-lg border border-amber-400 shadow-md`}
          >
            <div className="w-full flex justify-end">
              <MdClose
                onClick={() => {
                  setCloseBtn(true);
                  setDeleteBtnSelected(!deleteBtnSelected);
                }}
                className="heading-secondary"
              />
            </div>
            <div className="flex justify-center items-center flex-col gap-2 lg:px-15">
              <MdOutlineReportProblem className="heading-secondary text-red-600 border w-15 h-15 p-2 rounded-full bg-red-300 border-none" />
              <h1 className="font-bold paragraph-body">Confirm Deletion</h1>
              <p className="paragraph-body text-center text-gray-600">
                Are you sure you want to delete this item? This action is
                permanent and cannot be undone. All associated data will be
                permanently removed.
              </p>

              <div className="w-full flex justify-center items-center gap-4 mt-4">
                <button
                  onClick={() => {
                    setCloseBtn(true);
                    setDeleteBtnSelected(!deleteBtnSelected);
                  }}
                  className="w-fit px-9 py-3 rounded-lg border border-amber-400 font-medium paragraph-body flex justify-center items-center gap-2 hover:bg-gray-400 hover:text-black"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    deleteBlogID(selectedId);
                  }}
                  className="w-fit px-9 py-3 rounded-lg bg-red-600 text-white font-medium paragraph-body flex justify-center items-center gap-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {viewBtnSelected ? (
          <div
            className={`${
              closeBtn ? "hidden" : ""
            } absolute lg:w-[85%] w-[90%] h-[85vh] z-1 p-4 mt-5 lg:mt-0 bg-[#F3F4F6] rounded-lg border border-amber-400 shadow-md overflow-auto`}
          >
            <div className="w-full flex justify-end">
              <MdClose
                onClick={() => {
                  setCloseBtn(true);
                  setViewBtnSelected(!viewBtnSelected);
                }}
                className="heading-secondary"
              />
            </div>
            <div className="blogContentContainer w-full lg:px-20 lg:py-10 p-2">
              <div className="blogContent w-full h-full lg:py-5 lg:px-40 p-5 flex flex-col lg:gap-10 gap-5 overflow-auto no-scrollbar shadow-xl rounded-2xl">
                <div className="title w-full flex flex-col justify-center items-center flex-wrap gap-5">
                  {/* Category Name */}
                  <h1 className="text-xl  font-bold capitalize text-[#ff7b00]">
                    {singleBlog?.category}
                  </h1>

                  {/* Blog Title */}
                  <h1 className="lg:text-2xl text-lg font-bold">
                    {singleBlog?.title}
                  </h1>

                  {/* User Details */}
                  {/* <div className="profile flex gap-4 justify-between items-center p-3 rounded-lg shadow-xl bg-[#ffe0a7]">
                      <div className="border border-gray-400 lg:w-15 lg:h-15 w-10 h-10 rounded-full flex justify-center items-center hover:border-[#ff7b00]">
                        {userPostedBlog?.profilePicture ? (
                          <img
                            key={userPostedBlog && userPostedBlog._id}
                            src={`${
                              userPostedBlog && userPostedBlog.profilePicture
                            }`}
                            className="w-full h-full aspect-auto rounded-full"
                          />
                        ) : (
                          <FaRegUser className="text-xl lg:text-xl text-gray-800" />
                        )}
                      </div>

                      <div className="flex flex-col lg:gap-2">
                        <h1 className="font-semibold text-lg lg:text-xl">
                          {userPostedBlog
                            ? userPostedBlog?.firstName +
                              " " +
                              userPostedBlog?.lastName
                            : "Anonymus"}
                        </h1>
                        <p className="text-md text-gray-600 italic">
                          Published on{" "}
                          {singleBlog && formatCreatedAt(singleBlog?.createdAt)}
                        </p>
                      </div>
                    </div> */}

                  {/* Likes and Views Count */}
                  <div className="likeViews flex gap-5 justify-between items-center py-4 px-6">
                    <h1 className="flex justify-center items-center gap-2 text-xl text-gray-600 border-r border-gray-400 pr-5">
                      <CiHeart className="text-2xl" />
                      <span>{singleBlog?.likes?.length}</span>
                    </h1>
                    <h1 className="flex justify-center items-center gap-2 text-xl text-gray-600">
                      <IoEyeOutline className="text-2xl" />
                      <span>{singleBlog?.views}</span>
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
          </div>
        ) : null}

          {editBtnSelected ? (
          <div
            className={`${
              closeBtn ? "hidden" : ""
            } absolute lg:w-[85%] w-[90%] h-[85vh] z-1 p-4 mt-5 lg:mt-0 bg-[#F3F4F6] rounded-lg border border-amber-400 shadow-md overflow-auto`}
          >
            <div className="w-full flex justify-end">
              <MdClose
                onClick={closeAllModals}
                className="heading-secondary"
              />
            </div>

            <div className="Inputs w-full flex flex-col py-5">
              <h1 className="text-center font-bold heading-primary uppercase">
                Edit Blog
              </h1>
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
                className="w-full flex flex-col lg:gap-5 gap-2"
              >
                <div className="w-full flex lg:gap-2 lg:flex-row flex-col gap-5">
                  <div className="w-full">
                    <label htmlFor="image" className="text-lg font-bold">
                      Thumbnail
                    </label>
                    {/* <input
                      type="file"
                      name="image"
                      id="image"
                      accept="image/png, image/jpeg"
                      onChange={(e) => {
                        setThumbnail(e.target.files[0]);
                      }}
                      className="text-lg flex"
                    /> */}
                    {/* Show current image if exists and no new image selected */}
                    {thumbnail === null && singleBlog?.imageUrl && (
                      <div>
                        {/* <p>Current image:</p> */}
                        <img src={singleBlog.imageUrl} alt="Current" className="w-full lg:w-[50%]" />
                      </div>
                    )}
                  </div>

                  <div className="btn lg:w-[15%] w-[50%]  h-12 flex justify-end">
                    <button
                      type="submit"
                      className="bg-[#ff7b00] py-2 px-6 rounded-lg text-white font-medium text-lg w-full"
                    >
                      Update
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Blog Title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  className="w-full p-2 focus:outline-[#ff7b00] border-b text-lg"
                />
                <Editor
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  className="h-[50vh]"
                />

                <fieldset className="flex gap-4 w-full flex-wrap py-2 lg:py-0">
                  <legend className="text-lg font-bold mb-2">
                    Select Category
                  </legend>

                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="flex items-center gap-1 border border-gray-400 p-2 rounded-lg"
                    >
                      <input
                        type="radio"
                        name="category"
                        id={cat.id}
                        value={cat.value}
                        onChange={handleCategoryChange}
                        checked={selectedCategory === cat.value}
                        className="lg:w-5 lg:h-5 h-3 w-3"
                        required
                      />
                      <label htmlFor={cat.id} className="text-md font-semibold">
                        {cat.label}
                      </label>
                    </div>
                  ))}
                </fieldset>

                <button type="submit"></button>
              </form>
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
};

export default PostDashboard;
