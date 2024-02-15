const express = require("express");
const moviesBLL = require("../BLL/moviesBLL");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();
const ACCESS_SECRET_TOKEN = process.env.ACCESS_SECRET_TOKEN;

router.get("/", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    console.log("flag token");
    if (!token) {
      return res.status(401).json("No token provided");
    }
    console.log("flag after token in router movies");
    jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
      if (err) {
  
        return res.status(500).json("Failed to authenticate token");
        
      }
console.log("flag before router movies");
      const movie = await moviesBLL.getAllMovies();
      console.log("flag in router movies");
      console.log(movie);
      res.send(movie);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json("No token provided");
    }
    jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
      if (err) {
        return res.status(500).json("Failed to authenticate token");
      }
      const obj = req.body;
      const result = await moviesBLL.addMovie(obj);
      res.status(201).send(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json("No token provided");
    }
    jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
      if (err) {
        return res.status(500).json("Failed to authenticate token");
      }
      const { id } = req.params;
      const movies = await moviesBLL.getByIDMovie(id);
      res.send(movies);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json("No token provided");
    }
    jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
      if (err) {
        return res.status(500).json("Failed to authenticate token");
      }
      const { id } = req.params;
      const obj = req.body;
      const result = await moviesBLL.updateMovie(id, obj);
      res.send(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json("No token provided");
    }
    jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
      if (err) {
        return res.status(500).json("Failed to authenticate token");
      }
      const { id } = req.params;
      const result = await moviesBLL.deleteMovie(id);
      res.send(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
