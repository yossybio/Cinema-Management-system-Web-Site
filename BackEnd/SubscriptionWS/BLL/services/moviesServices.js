const Movie = require("../models/MovieModel");
const subscriptionsServices = require("../services/subscriptionsServices");

// Get-All
const getAllMovies = () => {
  return new Promise((resolve, reject) => {
    Movie.find({}, (err, movies) => {
      if (err) {
        reject(err);
      } else {
        resolve(movies);
      }
    });
  });
};

// Get-By-Id
const getMovieById = (id) => {
  return new Promise((resolve, reject) => {
    Movie.findById(id, (err, movie) => {
      if (err) {
        reject(err);
      } else {
        resolve(movie);
      }
    });
  });
};

// Post
const addMovie = (newMovie) => {
  return new Promise((resolve, reject) => {
    const movie = new Movie(newMovie);

    movie.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(movie);
      }
    });
  });
};

// Put
const updateMovie = (id, movieToUpdate) => {
  return new Promise((resolve, reject) => {
    Movie.findByIdAndUpdate(id, movieToUpdate, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(movieToUpdate);
      }
    });
  });
};

// Delete
const deleteMovie = (id) => {
  subscriptionsServices.deleteMovieAndUpdateSubscriptionById(id);

  return new Promise((resolve, reject) => {
    let movieToDelete;
    Movie.findById(id, (err, movie) => {
      if (err) {
        reject(err);
      } else {
        movieToDelete = movie;
      }
    });

    Movie.findByIdAndDelete(id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(movieToDelete);
      }
    });
  });
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
