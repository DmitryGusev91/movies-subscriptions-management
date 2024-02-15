const axios = require("axios");
require("dotenv").config();

const urlMember = `${process.env.MOVIES_SERVER}/members`;

const getByIDMember = (id) => {
  return axios.get(`${urlMember}/${id}`);
};

const addMember = async (obj) => {
  await axios.post(urlMember, obj);
  return "Added!";
};

const updateMember = async (id, obj) => {
  await axios.put(`${urlMember}/${id}`, obj);
  return "Updated!";
};

const deleteMember = async (id) => {
  await axios.delete(`${urlMember}/${id}`);
  return "Deleted!";
};
module.exports = { addMember, updateMember, getByIDMember, deleteMember };
