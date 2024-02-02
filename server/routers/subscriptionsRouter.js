const express = require("express");
const subsBLL = require("../BLL/subscriptionsBLL");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const router = express.Router();
const ACCESS_SECRET_TOKEN = process.env.ACCESS_SECRET_TOKEN;

router.get("/", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(401).json("No token provided");
    }

    jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
      if (err) {
        return res.status(500).json("Failed to authenticate token");
      }
      const filters = req.query;
      const subscriptions = await subsBLL.getAllSubs(filters);
      res.send(subscriptions);
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
      const result = await subsBLL.addSub(obj);
      res.status(201).send(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/movies", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json("No token provided");
    }

    jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
      if (err) {
        return res.status(500).json("Failed to authenticate token");
      }

      const subs = await subsBLL.getMovieAndMembers();
      res.send(subs);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/members", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json("No token provided");
    }

    jwt.verify(token, ACCESS_SECRET_TOKEN, async (err, data) => {
      if (err) {
        return res.status(500).json("Failed to authenticate token");
      }
      const subs = await subsBLL.getMemberAndMovies();
      res.send(subs);
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
      const result = await subsBLL.updateSub(id, obj);
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
      const result = await subsBLL.deleteSub(id);
      res.send(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
