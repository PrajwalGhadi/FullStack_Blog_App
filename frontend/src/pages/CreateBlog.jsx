import React, { useContext, useState } from "react";
import Editor from "react-simple-wysiwyg";
import AuthContext from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // Changed to string
  const [thumbnail, setThumbnail] = useState("");

  const categories = [
    { id: "tech", label: "Technology", value: "technology" },
    { id: "design", label: "Design", value: "design" },
    { id: "prod", label: "Productivity", value: "productivity" },
    { id: "life", label: "Lifestyle", value: "lifestyle" },
  ];

  const { createPost } = useContext(AuthContext);
  const navigate = useNavigate();

  // New handler for radio buttons
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
  
      console.log('handleSubmit clicked')
  
      const formData = new FormData();
  
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", selectedCategory); // Now sending string instead of array
      formData.append("image", thumbnail);
  
      const result = await createPost(formData);
  
      if (!result.success && !result.isLogin) return navigate('/auth/login')

      if (result.success) return navigate('/')

    } catch (error) {
      console.log('Error from handleSubmit', error.message)
    }
  }
  
  return (
    <>
      <section className="flex justify-between gap-10 lg:mx-70 lg:h-[92vh] h-[88vh] font-[LATO] lg:overflow-hidden overflow-auto py-2">
        {/* Create Blog */}
        <div className="Inputs w-full flex flex-col px-5 py-5">
          <h1 className="text-center font-semibold text-2xl">Create Blog</h1>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="w-full flex flex-col lg:gap-5 gap-2"
          >
            <div className="w-full flex lg:gap-2">
              <div className="w-[70%]">
                <label htmlFor="image" className="text-lg font-bold">
                  Thumbnail
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    setThumbnail(e.target.files[0]);
                  }}
                  required
                  className="text-lg flex"
                />
              </div>

              <div className="btn w-full flex justify-end">
                <button
                  type="submit"
                  className="bg-[#ff7b00] py-2 px-6 rounded-lg text-white font-medium text-lg"
                >
                  Create
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
              <legend className="text-lg font-bold mb-2">Select Category</legend>

              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center gap-1 border border-gray-400 p-2 rounded-lg">
                  <input
                    type="radio"
                    name="category" // Same name for all radio buttons
                    id={cat.id}
                    value={cat.value}
                    onChange={handleCategoryChange}
                    checked={selectedCategory === cat.value} // Compare with string
                    className="lg:w-5 lg:h-5 h-3 w-3"
                    required // Makes one selection mandatory
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

        {/* Preview Section */}
        <div className="preview w-full p-5 overflow-auto hidden lg:flex lg:flex-col">
          <h1 className="text-center font-semibold text-4xl">Preview Blog</h1>

          <div className="w-full flex flex-col gap-4 overflow-auto">
            <h1 className="title text-2xl font-bold">{title}</h1>

            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateBlog;