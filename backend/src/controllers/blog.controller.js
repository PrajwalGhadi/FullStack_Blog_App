const blogModel = require("../models/blog.model");
const userModel = require('../models/user.model')
const generateImageUrl = require("../services/imageKit.service");
const { v4: uuidv4 } = require("uuid");

async function getAllBlogs(req, res) {
  try {
    const allBlogs = await blogModel.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, blogs: allBlogs});
  } catch (error) {
    console.log("Error from getAllBlogs:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function createBlog(req, res) {
  try {
    const { title, content, category } = req.body;
    const file = req.file;

    console.log(req.user);

    const result = await generateImageUrl(
      file.buffer,
      `${file.originalname}_${uuidv4()}`
    );

    console.log("Creating blog:", { title, category, imageUrl: result.url });

    const newBlog = await blogModel.create({
      title,
      content,
      author: req.user.id,
      authorName: req.user.fullName,
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

async function getSingleBlog(req, res) {
  try {
    
    const { blogId } = req.params

    const getBlog = await blogModel.findOne({ _id: blogId });

    if (!getBlog) {
      return res.status(404).json({
        success: false,
        message: "404 Page Not Found"
      })
    }

    res.status(200).json({ success: true, singleBlog: getBlog});
  } catch (error) {
    console.log("Error from GetSingleBlog controller: ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

async function blogLiked(req, res) {
  try {

  } catch(error) {
    console.log('Error from BlogLiked Controller: ', error.message)
  }
}

async function fetchUserBlogs(req, res) {
  try {
    const user = await userModel.find({_id: req.user.id})
    const blogs = await blogModel.find({author: req.user.id})
    
    res.status(200).json({ success: true, user: user, blogs: blogs})
  } catch(error) {
    console.log('Error from fetchUserBlogs: ', error.message);
    res.status(500).json({success: true, message: 'Internal Server Error'})
  }
}

module.exports = {
  getAllBlogs,
  createBlog,
  getSingleBlog,
  fetchUserBlogs
};
