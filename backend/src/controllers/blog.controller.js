const blogModel = require("../models/blog.model");
const generateImageUrl = require("../services/imageKit.service");
const { v4: uuidv4 } = require("uuid");

async function getAllBlogs(req, res) {
  try {
    const allBlogs = await blogModel.findAll();

    res.status(200).json({ success: true, blogs: allBlogs });
  } catch (error) {
    console.log("Error from getAllBlogs:", error.message);
    res.stateus(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function createBlog(req, res) {
  try {
    const { title, content, category } = req.body;
    const file = req.file;

    const result = await generateImageUrl(
      file.buffer,
      `${file.originalname}_${uuidv4()}`
    );

    console.log("Creating blog:", { title, category, imageUrl: result.url });

    const newBlog = await blogModel.create({
      title,
      content,
      author: req.user,
      category,
      imageUrl: result.url,
    });

    console.log("Blog created successfully:", newBlog);

    res.status(201).json({
      success: true,
      message: "New Post Created Successfully",
      newBlog,
    });

  } catch (error) {
    console.log("CreateBlog Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
}
module.exports = {
  getAllBlogs,
  createBlog,
};
