const axios = require("axios");

const urlMember = "http://localhost:3000/members";

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
