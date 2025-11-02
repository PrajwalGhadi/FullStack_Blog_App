import React, { useState } from "react";

const Category = () => {

  const [blogs, setBlogs] = useState(null);

  if (!blogs) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <>
      <section className="py-15"></section>
    </>
  );
};

export default Category;
