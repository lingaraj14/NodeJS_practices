const Blog = require("../models/blog");
const Comment = require("../models/comment");

const createNewBlog = (req, res) => {
  res.render("addblog", {
    user: req.user,
  });
};

const handleAddBlog = async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    title,
    body,
    coverImageURL: `/uploads/${req.file.filename}`,
    createdBy: req.user._id,
  });

  return res.redirect(`/blog/${blog._id}`);
};

const handleDisplayBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
};

const handleComment = async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.id,
    createdBy: req.user._id,
  });

  res.redirect(`/blog/${req.params.id}`);
};

module.exports = {
  createNewBlog,
  handleAddBlog,
  handleDisplayBlog,
  handleComment,
};
