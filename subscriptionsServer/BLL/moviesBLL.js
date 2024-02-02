const Movie = require("../models/MovieModel");

const getAllMovies = (filters = {}) => {
  return Movie.find(filters);
};

const getMovieByID = (id) => {
  return Movie.findById(id);
};

const updateMovie = async (id, obj) => {
  await Movie.findByIdAndUpdate(id, obj);
  return "Updated!";
};

const deleteMovie = async (id) => {
  await Movie.findByIdAndDelete(id);
  return "Deleted!";
};

const addMovie = async (obj) => {
  const movie = new Movie(obj);
  await movie.save();
  return "Created!";
};


//get array of movies and puts it into mongoDB
const initMovies = async (movies) => {
  const promisesArray = movies.map((movie) =>
    addMovie({
      name: movie.name,
      genres: movie.genres,
      image: movie.image.original,
      premiered: movie.premiered,
    })
  );
  await Promise.all(promisesArray);
};

module.exports = {
  getAllMovies,
  getMovieByID,
  updateMovie,
  deleteMovie,
  addMovie,
  initMovies,
};
