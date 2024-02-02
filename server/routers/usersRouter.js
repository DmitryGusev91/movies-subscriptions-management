const express = require("express");
const usersBLL = require("../BLL/usersBLL");
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
      const users = await usersBLL.getAllUsersData();
      res.send(users);
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
      const user = await usersBLL.getUserData(id);
      res.send(user);
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

      const result = await usersBLL.addUsersData(obj);
      res.status(201).send(result);
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
      const result = await usersBLL.updateUsersData(id, obj);
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
      const result = await usersBLL.deleteUsersData(id);
      res.send(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
