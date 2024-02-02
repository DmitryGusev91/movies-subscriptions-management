const express = require("express");
const subscriptionsBLL = require("../BLL/subscriptionsBLL");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filters = req.query;
    const subscriptions = await subscriptionsBLL.getAllSubscriptions(filters);
    res.send(subscriptions);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/subscriptions", async (req, res) => {
  const subscriptions = await subscriptionsBLL.getSubscriptionsDetails();
  res.send(subscriptions);
});

router.get("/movies", async (req, res) => {
  const subscriptions = await subscriptionsBLL.getMovieDetails();
  res.send(subscriptions);
});

router.post("/", async (req, res) => {
  try {
    const obj = req.body;
    const result = await subscriptionsBLL.addSubscription(obj);
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await subscriptionsBLL.getSubscriptionByID(id);
    res.send(subscription);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    console.log(obj)
    const result = await subscriptionsBLL.updateSubscription(id, obj);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await subscriptionsBLL.deleteSubscription(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
