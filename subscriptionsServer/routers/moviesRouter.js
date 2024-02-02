const express = require("express");
const moviesBLL = require("../BLL/moviesBLL");


const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filters = req.query;
    console.log(filters)
    const movies = await moviesBLL.getAllMovies(filters);
    res.send(movies);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await moviesBLL.getMovieByID(id);
    res.send(movie);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const obj = req.body;
    const result = await moviesBLL.addMovie(obj);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await moviesBLL.updateMovie(id, obj);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await moviesBLL.deleteMovie(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
