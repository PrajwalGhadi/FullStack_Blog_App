import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
const Category = () => {
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getAllPost } = useContext(AuthContext);

  const param = useParams();
  useEffect(() => {
    async function getAll() {
      try {
        setLoading(true);
        const result = await getAllPost();
        console.log(result);
        setBlogs(result.blogs);

        // Filtering According to category selected
        if (param.categoryName === "all" || !param.categoryName) return;
        setBlogs((prev) =>
          prev.filter((blog) => {
            return blog.category === param.categoryName;
          })
        );
      } catch (error) {
        console.log("Error from Category Component: ", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getAll();
  }, [getAllPost, param]); // Add getAllPost to dependencies

  // Loading state
  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container flex justify-center items-center mt-20">
        <p className="text-xl text-red-500 p-5 border rounded-2xl shadow-md shadow-red-700">
          Error loading blogs: It's Not You It's Us
        </p>
      </div>
    );
  }

  // Render blogs
  return (
    <>
      <section className="flex lg:mr-90 lg:h-[85vh] lg:px-30 px-5 lg:border-l lg:border-gray-400 flex-wrap  gap-10 lg:py-10 overflow-auto no-scrollbar w-full h-[88vh] py-5 s,sm:border">
        {blogs.length > 0 ? (
          blogs && blogs?.map((blog) => {
            return (
              <>
                <div className=" w-full lg:w-[18vw] max-h-[45vh] flex flex-col border border-gray-300 hover:shadow-xl hover:shadow-gray-300 rounded-2xl">
                  <div className="w-full h-[50vw] lg:h-[10vw]">
                    <img
                      src={blog?.imageUrl}
                      alt=""
                      className="w-full h-full rounded-2xl"
                    />
                  </div>

                  <div className="w-full px-5 py-2 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <div className="name_readtime flex gap-2 items-center w-full">
                        <h1 className="lg:text-md text-sm text-gray-500 italic">
                          {blog?.author?.length > 10
                            ? blog?.author.substring(0, 10)
                            : blog?.author}
                        </h1>
                        <p className="lg:text-md text-sm text-gray-500 italic w-full">
                          {blog?.readTime} min read
                        </p>
                      </div>

                      <div className="tags w-fit  flex justify-end items-center">
                        <h1 className="text-md py-2 px-4 border w-fit rounded-xl bg-[#ff7b00] text-white font-medium capitalize">
                          {blog?.category}
                        </h1>
                      </div>
                    </div>

                    <div className="w-full h-fit flex flex-col gap-2">
                      <h1 className="text-md lg:text-lg font-bold">
                        {blog?.title?.length > 50
                          ? blog?.title?.substring(0, 50)
                          : blog?.title}
                      </h1>

                      <div
                        className="lg:text-md text-sm text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html:
                            blog?.content.length > 70
                              ? blog?.content?.substring(0, 70) + "..."
                              : blog?.content,
                        }}
                      />

                      <Link to={`/singleBlog/${blog?._id}`} className="mt-auto text-[#ff7b00] text-lg">
                        {"Read More"}
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <div className="error-container flex justify-center items-start mt-20 w-full">
            <p className="text-xl text-red-500 p-5 border rounded-2xl shadow-md shadow-red-700">
              Currently, there are no blogs available for {param.categoryName}.
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default Category;
