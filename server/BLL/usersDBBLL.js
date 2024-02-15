const User = require("../models/UserModel");

//updates user
const updateUser = async (id, obj) => {
  await User.findByIdAndUpdate(id, obj);
  return "Updated!";
};

const getAllUsers=async()=>{
  return User.find({});
}

const verifyUser = async (name) => {
  const user = await User.findOne({ name });
  if (!user) {
    return null;
  }

  return user;
};

const checkNewUser = async (name) => {
  const user = await User.findOne({ name });
  if (!user) {
    return null;
  }
  return user;
};

module.exports = { getAllUsers,updateUser, verifyUser, checkNewUser };
