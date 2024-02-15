const axios = require("axios");
require("dotenv").config();

const urlSub = `${process.env.MOVIES_SERVER}/subscriptions`;

const getSubs = (filters) => {
  return axios.get(urlSub, { params: filters });
};

const addSub = async (obj) => {
  await axios.post(urlSub, obj);
  return "Added!";
};

const updateSub = async (id, obj) => {
  await axios.put(`${urlSub}/${id}`, obj);
  return "Updated!";
};

const deleteSub = async (id) => {
  await axios.delete(`${urlSub}/${id}`);
  return "Deleted!";
};

const getMovieAndMembers = async () => {
  const { data } = await axios.get(`${urlSub}/movies`);
  return data;
};

const getMemberAndMovies = async () => {
  const { data } = await axios.get(`${urlSub}/subscriptions`);
  return data;
};

module.exports = {
  addSub,
  updateSub,
  deleteSub,
  getMovieAndMembers,
  getMemberAndMovies,
  getSubs,
};
