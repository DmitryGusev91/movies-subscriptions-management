const subsDAL = require("../DAL/subscriptions");

const getAllSubs = async (filters) => {
  const { data } = await subsDAL.getSubs(filters);
  return data;
};

const addSub = async (obj) => {
  await subsDAL.addSub(obj);
  return "Added!";
};

const updateSub = async (id, obj) => {
  await subsDAL.updateSub(id, obj);
  return "Updated!";
};

const deleteSub = async (id) => {
  await subsDAL.deleteSub(id);
  return "Deleted!";
};

const getMemberAndMovies = () => {
  return subsDAL.getMemberAndMovies();
};

const getMovieAndMembers = () => {
  return subsDAL.getMovieAndMembers();
};

module.exports = {
  addSub,
  updateSub,
  deleteSub,
  getMemberAndMovies,
  getMovieAndMembers,
  getAllSubs,
};
