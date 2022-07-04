const express = require("express");
const axios = require("axios");

const router = express.Router();

// Entry Point: 'http://localhost:8001/subscriptionWS'

//Members:
// Get-All
router.route("/members").get(async (req, res) => {
  try {
    const membersURL = "http://localhost:8000/members";
    const allMembers = (await axios.get(membersURL)).data;
    
    return res.json(allMembers);
  } catch (error) {
    return res.json(error);
  }
});

// Get-By-Id
router.route("/members/:id").get(async (req, res) => {
  try {
    const membersURL = "http://localhost:8000/members";
    const id = req.params.id;
    const member = (await axios.get(`${membersURL}/${id}`)).data;

    return res.json(member);
  } catch (error) {
    return res.json(error);
  }
});

// Post
router.route("/members").post(async (req, res) => {
  try {
    const newMemberData = req.body;

    const membersURL = "http://localhost:8000/members";
    const newMember = (await axios.post(membersURL, newMemberData)).data;

    return res.json(newMember);
  } catch (error) {
    return res.json(error);
  }
});

// Put
router.route("/members/:id").put(async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const membersURL = "http://localhost:8000/members";
    const member = (await axios.put(`${membersURL}/${id}`, data)).data;

    return res.json(member);
  } catch (error) {
    return res.json(error);
  }
});

// Delete
router.route("/members/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;

    const membersURL = "http://localhost:8000/members";
    const result = (await axios.delete(`${membersURL}/${id}`)).data;

    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

//Movies:
// Get-All
router.route("/movies").get(async (req, res) => {
  try {
    const moviesURL = "http://localhost:8000/movies";
    const allMovies = (await axios.get(moviesURL)).data;

    return res.json(allMovies);
  } catch (error) {
    return res.json(error);
  }
});

// Get-By-Id
router.route("/movies/:id").get(async (req, res) => {
  try {
    const moviesURL = "http://localhost:8000/movies";
    const id = req.params.id;
    const member = (await axios.get(`${moviesURL}/${id}`)).data;

    return res.json(member);
  } catch (error) {
    return res.json(error);
  }
});

// Post
router.route("/movies").post(async (req, res) => {
  try {
    const newMovieData = req.body;

    const moviesURL = "http://localhost:8000/movies";
    const newMovie = (await axios.post(moviesURL, newMovieData)).data;

    return res.json(newMovie);
  } catch (error) {
    return res.json(error);
  }
});

// Put
router.route("/movies/:id").put(async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const moviesURL = "http://localhost:8000/movies";
    const movie = (await axios.put(`${moviesURL}/${id}`, data)).data;

    return res.json(movie);
  } catch (error) {
    return res.json(error);
  }
});

// Delete
router.route("/movies/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;

    const moviesURL = "http://localhost:8000/movies";
    const result = (await axios.delete(`${moviesURL}/${id}`)).data;

    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

//Subsriptions:
// Get-All
router.route("/subscriptions").get(async (req, res) => {
  try {
    const subscriptionsURL = "http://localhost:8000/subscriptions";
    const allsubscriptions = (await axios.get(subscriptionsURL)).data;

    return res.json(allsubscriptions);
  } catch (error) {
    return res.json(error);
  }
});

// Get-By-Id
router.route("/subscriptions/:id").get(async (req, res) => {
  try {
    const subscriptionsURL = "http://localhost:8000/subscriptions";
    const id = req.params.id;
    const subscription = (await axios.get(`${subscriptionsURL}/${id}`)).data;

    return res.json(subscription);
  } catch (error) {
    return res.json(error);
  }
});

// Post
router.route("/subscriptions").post(async (req, res) => {
  try {
    const newSubscriptionData = req.body;

    const subscriptionsURL = "http://localhost:8000/subscriptions";
    const newSubscription = (
      await axios.post(subscriptionsURL, newSubscriptionData)
    ).data;

    return res.json(newSubscription);
  } catch (error) {
    return res.json(error);
  }
});

// Put
// router.route("/subscriptions/:id").put(async (req, res) => {
//   try {
//     const id = req.params.id;
//     const data = req.body;

//     const subscriptionsURL = "http://localhost:8000/subscriptions";
//     const subscription = (await axios.put(`${subscriptionsURL}/${id}`, data))
//       .data;

//     return res.json(subscription);
//   } catch (error) {
//     return res.json(error);
//   }
// });

// Delete
router.route("/subscriptions/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;

    const subscriptionsURL = "http://localhost:8000/subscriptions";
    const result = (await axios.delete(`${subscriptionsURL}/${id}`)).data;

    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
