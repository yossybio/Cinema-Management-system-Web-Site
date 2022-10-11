const express = require("express");
const subscriptionsService = require("../../BLL/services/subscriptionsServices");

const router = express.Router();

// Entry Point: 'http://localhost:8000/subscriptions'

// Get-All
router.route("/").get(async (req, res) => {
  try {
    const subscriptions = await subscriptionsService.getAllSubscriptions();
    return res.json(subscriptions);
  } catch (error) {
    return res.json(error);
  }
});

// Get-By-Id
router.route("/:memberId").get(async (req, res) => {
  try {
    const id = req.params.memberId;
    const subscription = await subscriptionsService.getSubscriptionByMemberId(
      id
    );
    return res.json(subscription);
  } catch (error) {
    return res.json(error);
  }
});

// Post
router.route("/").post(async (req, res) => {
  try {
    const subscription = req.body;
    const memberId = subscription.MemberId;
    const movieToSubscribe = subscription.MovieToSubscribe;
    const subscriptionDate = subscription.SubscriptionDate;
    const result = await subscriptionsService.addMovieToSubscription(
      memberId,
      movieToSubscribe,
      subscriptionDate
    );
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

// Delete subscription
router.route("/:memberId").delete(async (req, res) => {
  try {
    const memberId = req.params.memberId;
    const result = await subscriptionsService.deleteSubscription(memberId);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

//Delete movie of subscription
router.route("/:memberId/:movieId").delete(async (req, res) => {
  try {
    const memberId = req.params.memberId;
    const movieId = req.params.movieId;
    const result =
      await subscriptionsService.deleteMovieAndUpdateSubscriptionById(
        memberId,
        movieId
      );
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
