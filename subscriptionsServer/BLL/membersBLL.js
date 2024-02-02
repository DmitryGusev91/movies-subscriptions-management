const Member = require("../models/MemberModel");

const getAllMembers = (filters = {}) => {
  return Member.find(filters);
};

const getMemberByID = (id) => {
  return Member.findById(id);
};

const updateMember = async (id, obj) => {
  await Member.findByIdAndUpdate(id, obj);
  return "Updated!";
};

const deleteMember = async (id) => {
  await Member.findByIdAndDelete(id);
  return "Deleted!";
};

const addMember = async (obj) => {
  const member = new Member(obj);
  await member.save();
  return "Created!";
};

//get array of member and puts it into mongoDB
const initMembers = async (members) => {
  const promisesArray = members.map((member) =>
    addMember({
      name: member.name,
      email: member.email,
      city: member.address.city,
    })
  );
  await Promise.all(promisesArray);
};

module.exports = {
  getAllMembers,
  getMemberByID,
  updateMember,
  deleteMember,
  addMember,
  initMembers,
};
