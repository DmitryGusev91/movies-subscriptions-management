const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const usersdb = require("../BLL/usersDBBLL");
const usersFile = require("../BLL/usersBLL");

dotenv.config();
const router = express.Router();

router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    const userdb = await usersdb.verifyUser(name);

    if (!userdb) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const isPasswordMatch = await bcrypt.compare(password, userdb.password);

    if (isPasswordMatch) {
      const ACCESS_SECRET_TOKEN = process.env.ACCESS_SECRET_TOKEN;
      const userFile = await usersFile.getUserData(String(userdb._id));
      const time = parseInt(userFile.sessionTimeOut, 10) * 60;

      const accessToken = jwt.sign(
        { id: String(userdb._id), name },
        ACCESS_SECRET_TOKEN,
        {
          expiresIn: time,
        }
      );

      return res.status(200).json({ accessToken, id: String(userdb._id) });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  const { name, password } = req.body;
  const user = await usersdb.checkNewUser(name);
  //checks that user name exists and isnt registered yet (password is empty)
  if (user && user.password) {
    return res.status(401).json({ error: "Register Failed!!" });
  } else if (user) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await usersdb.updateUser(user._id, { password: hashedPassword });
    return res.json(user);
  }

  return res.status(401).json({ error: "Register Failed!!" });
});

router.post;

module.exports = router;
