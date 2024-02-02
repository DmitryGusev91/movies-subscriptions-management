const express = require("express");
const membersBLL = require("../BLL/membersBLL");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const members = await membersBLL.getAllMembers(filters);
    res.send(members);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const member = await membersBLL.getMemberByID(id);
    res.send(member);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const obj = req.body;
    const result = await membersBLL.addMember(obj);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await membersBLL.updateMember(id, obj);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await membersBLL.deleteMember(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
