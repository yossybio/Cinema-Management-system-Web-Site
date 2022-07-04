const express = require("express");
const moviesService = require("../../BLL/services/moviesServices");

const router = express.Router();

// Entry Point: 'http://localhost:8000/movies'

// Get-All
router.route("/").get(async (req, res) => {
  try {
    const movies = await moviesService.getAllMovies();
    return res.json(movies);
  } catch (error) {
    return res.json(error);
  }
});

// Get-By-Id
router.route("/:id").get(async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await moviesService.getMovieById(id);
    return res.json(movie);
  } catch (error) {
    return res.json(error);
  }
});

// Post
router.route("/").post(async (req, res) => {
  try {
    const movie = req.body;
    const result = await moviesService.addMovie(movie);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

// Put
router.route("/:id").put(async (req, res) => {
  try {
    const id = req.params.id;
    const movie = req.body;
    const result = await moviesService.updateMovie(id, movie);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

// Delete
router.route("/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;
    const result = await moviesService.deleteMovie(id);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
