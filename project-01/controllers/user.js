const User = require("../models/user");

const handleAllusers = async (req, res) => {
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  return res.json(user);
};

const handleCreateUser = async (req, res) => {
  const body = req.body;

  const results = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  res.status(201).json(results);
};

const updateUserById = async (req, res) => {
  const body = req.body;

  const updatedUsers = await User.findByIdAndUpdate(req.params.id, {
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  console.log(updatedUsers); //It will return
  res.status(201).json({ msg: "User updated successfully!!" });
};

const deleteUserById = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  console.log(deletedUser);
  res.status(201).json(deletedUser);
};

module.exports = {
  handleAllusers,
  getUserById,
  handleCreateUser,
  updateUserById,
  deleteUserById,
};
