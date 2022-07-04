const User = require("../models/UserModel");

// Get-All
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}, (err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
  });
};

// Get-By-Id
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (err, movie) => {
      if (err) {
        reject(err);
      } else {
        resolve(movie);
      }
    });
  });
};

// Post
const addUser = (newUser) => {
  return new Promise((resolve, reject) => {
    const user = new User(newUser);

    user.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

// Put
const updateUser = (id, userToUpdate) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(id, userToUpdate, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(userToUpdate);
      }
    });
  });
};

// Delete
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndDelete(id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("User Deleted");
      }
    });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
