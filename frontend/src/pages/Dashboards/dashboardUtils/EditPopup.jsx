const EditPopup = () => {
  return (
    <div
      className={`${
        closeBtn ? "hidden" : ""
      } absolute lg:w-[85%] w-[90%] h-[85vh] z-1 p-4 mt-5 lg:mt-0 bg-[#F3F4F6] rounded-lg border border-amber-400 shadow-md overflow-auto`}
    >
      <div className="w-full flex justify-end">
        <MdClose onClick={closeAllModals} className="heading-secondary" />
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
                  <img
                    src={singleBlog.imageUrl}
                    alt="Current"
                    className="w-full lg:w-[50%]"
                  />
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
            <legend className="text-lg font-bold mb-2">Select Category</legend>

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
  );
};

export default EditPopup;
