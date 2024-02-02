const axios = require("axios");

const urlMovie = "http://localhost:3000/movies";


const getAllMovies = () => {
  return axios.get(urlMovie);
};

const getByIDMovie = (id) => {
  return axios.get(`${urlMovie}/${id}`);
};

const addMovie = async (obj) => {
  await axios.post(urlMovie, obj);
  return "Added!";
};

const updateMovie = async (id, obj) => {
  await axios.put(`${urlMovie}/${id}`, obj);
  return "Updated!";
};

const deleteMovie = async (id) => {
  await axios.delete(`${urlMovie}/${id}`);
  return "Deleted!";
};
module.exports = { getAllMovies,addMovie, updateMovie, getByIDMovie, deleteMovie };
