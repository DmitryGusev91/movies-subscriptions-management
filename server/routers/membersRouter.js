const express = require("express");
const membersBLL = require("../BLL/membersBLL");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const router = express.Router();
const ACCESS_SECRET_TOKEN = process.env.ACCESS_SECRET_TOKEN;

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
      const result = await membersBLL.addMember(obj);
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
      const members = await membersBLL.getByIDMember(id);
      res.send(members);
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
      const result = await membersBLL.updateMember(id, obj);
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
      const result = await membersBLL.deleteMember(id);
      res.send(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
