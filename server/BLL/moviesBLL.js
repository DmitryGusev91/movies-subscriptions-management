const moviesDAL = require("../DAL/movies");
const subsDAL = require("../DAL/subscriptions");

const getAllMovies = async () => {
  const { data } = await moviesDAL.getAllMovies();
  return data;
};

const getByIDMovie = async (id) => {
  const { data } = await moviesDAL.getByIDMovie(id);
  return data;
};

const addMovie = async (obj) => {
  await moviesDAL.addMovie(obj);
  return "Added!";
};

const updateMovie = async (id, obj) => {
  await moviesDAL.updateMovie(id, obj);
  return "Updated!";
};

//goes through all the subscriptions and searches a subscription with the given movie id
//if found then updates the sub withought the movie (deletes it from subscription)
//in the end it deletes the movie
const deleteMovie = async (id) => {
  const { data: subs } = await subsDAL.getSubs();
  const updateSubs = [];

  subs.forEach((sub) => {
    const movieIndex = sub.movies.findIndex((movie) => movie.movieId === id);

    if (movieIndex !== -1) {
      // Remove the movie from sub.movies
      const updatedMovies = sub.movies.filter((movie) => movie.movieId !== id);

      // Check if sub.movies is empty after removing the movie
      if (updatedMovies.length === 0) {
        // If empty, update the subscription to have an empty movies array
        const deletePromise = subsDAL.deleteSub(String(sub._id));
        updateSubs.push(deletePromise);
      } else {
        // If not empty, update the subscription with the updated movies array
        const updatePromise = subsDAL.updateSub(String(sub._id), {
          movies: updatedMovies,
        });
        updateSubs.push(updatePromise);
      }
    }
  });

  // Wait for all update promises to resolve
  await Promise.all(updateSubs);

  // Finally, delete the movie
  await moviesDAL.deleteMovie(id);
};

module.exports = {
  getAllMovies,
  getByIDMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
