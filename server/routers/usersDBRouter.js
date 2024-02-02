const express = require("express");
const usersBLL = require("../BLL/usersDBBLL");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const router = express.Router();
const ACCESS_SECRET_TOKEN = process.env.ACCESS_SECRET_TOKEN;

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
      const result = await usersBLL.updateUser(id, obj);
      res.send(result);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
