const membersDAL = require("../DAL/members");
const subsDAL = require("../DAL/subscriptions");

const getByIDMember = async (id) => {
  const { data } = await membersDAL.getByIDMember(id);
  return data;
};

const addMember = async (obj) => {
  await membersDAL.addMember(obj);
  return "Added!";
};

const updateMember = async (id, obj) => {
  await membersDAL.updateMember(id, obj);
  return "Updated!";
};

const deleteMember = async (id) => {
  const { data: subs } = await subsDAL.getSubs();
  const sub = subs.filter((s) => s.memberId === id);
  if (sub[0]) {
    await subsDAL.deleteSub(sub[0]._id);
  }
  await membersDAL.deleteMember(id);
};

module.exports = { getByIDMember, addMember, updateMember, deleteMember };
