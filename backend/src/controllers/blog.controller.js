const blogModel = require("../models/blog.model");
const userModel = require("../models/user.model");
const generateImageUrl = require("../services/imageKit.service");
const { v4: uuidv4 } = require("uuid");

async function getAllBlogs(req, res) {
  try {
    const allBlogs = await blogModel.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, blogs: allBlogs });
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
    const { blogId } = req.params;

    console.log('🔄 getSingleBlog called for:', blogId);
    console.log('📋 Session ID:', req.sessionID);
    console.log('💾 Current session:', req.session);
    console.log('👀 Viewed blogs in session:', req.session?.viewedBlogs);

    let getBlog = await blogModel.findOne({ _id: blogId });

    if (!getBlog) {
      return res.status(404).json({
        success: false,
        message: "404 Page Not Found",
      });
    }

    // Initialize session if it doesn't exist
    if (!req.session.viewedBlogs) {
      req.session.viewedBlogs = [];
      console.log('✅ Initialized viewedBlogs array');
    }

    // Check if blog hasn't been viewed in this session
    const hasViewed = req.session.viewedBlogs.includes(blogId.toString());
    console.log('❓ Has viewed this blog:', hasViewed);

    if (!hasViewed) {
      console.log('⬆️ Incrementing views for blog:', blogId);
      
      // Increment views in database
      await blogModel.findByIdAndUpdate(blogId, { $inc: { views: 1 } });
      
      // Update the local blog object for response
      getBlog.views += 1;
      
      // Add to viewed blogs in session
      req.session.viewedBlogs.push(blogId.toString());
      
      console.log('✅ Added to viewed blogs. New count:', getBlog.views);
      console.log('📋 Updated viewedBlogs:', req.session.viewedBlogs);
    } else {
      console.log('⏭️ Already viewed, skipping increment');
    }

    res.status(200).json({ success: true, singleBlog: getBlog });
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
    const blogId = req.params.id;
    const userId = req.user.id;

    const blog = await blogModel.findOne({ _id: blogId, likes: userId });

    let updateLike = {};

    if (blog) {
      updateLike = { $pull: { likes: userId } };
    } else {
      updateLike = { $push: { likes: userId } };
    }

    const updatedBlog = await blogModel.findOneAndUpdate(
      { _id: blogId },
      updateLike,
      { new: true } // always return the new document
    );

    res
      .status(200)
      .json({ success: true, message: !blog ? "Liked" : "Disliked" });
  } catch (error) {
    console.log("Error from blogLiked Controller: ", error.message);
  }
}

async function fetchUserBlogs(req, res) {
  try {
    const user = await userModel.find({ _id: req.user.id });
    const blogs = await blogModel.find({ author: req.user.id });

    res.status(200).json({ success: true, user: user, blogs: blogs });
  } catch (error) {
    console.log("Error from fetchUserBlogs: ", error.message);
    res.status(500).json({ success: true, message: "Internal Server Error" });
  }
}

module.exports = {
  getAllBlogs,
  createBlog,
  getSingleBlog,
  fetchUserBlogs,
  blogLiked,
};
