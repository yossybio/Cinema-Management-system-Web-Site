const Subscription = require("../models/SubscriptionsModel");
const mongoose = require("mongoose");

// Get-All
const getAllSubscriptions = () => {
  return new Promise((resolve, reject) => {
    Subscription.find({}, (err, subscriptions) => {
      if (err) {
        reject(err);
      } else {
        resolve(subscriptions);
      }
    });
  });
};

// Get-By-Id
const getSubscriptionByMemberId = (memberId) => {
  return new Promise((resolve, reject) => {
    Subscription.find({ MemberId: { $eq: memberId } }, (err, subscription) => {
      if (err) {
        reject(err);
      } else {
        resolve(subscription);
      }
    });
  });
};

// Put
// const updateSubscription = (memberId, subscriptionToUpdate) => {
//   return new Promise((resolve, reject) => {
//     // let subscriptionByMemberId;
//     Subscription.find({ MemberId: { $eq: memberId } }, (err, subscription) => {
//       if (err) {
//         reject(err);
//       } else {
//         // subscriptionByMemberId = subscription;
//         console.log(subscription);
//         Subscription.findByIdAndUpdate(
//           subscription[0]._id,
//           subscriptionToUpdate,
//           (err) => {
//             if (err) {
//               reject(err);
//             } else {
//               resolve(subscriptionToUpdate);
//             }
//           }
//         );
//       }
//     });
//   });
// };

// Delete subscription
const deleteSubscription = (memberId) => {
  return new Promise((resolve, reject) => {
    let subscriptionToDelete;
    Subscription.find({ MemberId: { $eq: memberId } }, (err, subscription) => {
      if (err) {
        reject(err);
      } else {
        subscriptionToDelete = subscription;

        Subscription.findByIdAndDelete(subscriptionToDelete[0]._id, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(subscriptionToDelete);
          }
        });
      }
    });
  });
};

const findSubscriptionByMemberId = function (memberId) {
  return new Promise((resolve, reject) => {
    Subscription.find({ MemberId: { $eq: memberId } }, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

//Post
const addMovieToSubscription = (memberId, newWatchedMovie) => {
  return new Promise(async (resolve, reject) => {
    Subscription.find(
      { MemberId: { $eq: memberId } },
      function (err, subscription) {
        if (err) {
          reject(err);
        } else {
          if (subscription.length > 0) {
            const allMovies = subscription[0].Movies;
            const matchedMovie = allMovies.find(
              (movie) => movie.MovieId.toString() === newWatchedMovie
            );

            if (matchedMovie) {
              resolve("Client has already bought this movie.");
            } else {
              const obj = {
                MemberId: mongoose.Types.ObjectId(memberId),
                Movies: [
                  ...allMovies,
                  {
                    MovieId: mongoose.Types.ObjectId(newWatchedMovie),
                    Date: Date.now(),
                  },
                ],
              };
              Subscription.findByIdAndUpdate(
                subscription[0]._id,
                obj,
                (err) => {
                  if (err) reject(err);
                  else resolve("Client bought a new movie. congrats!");
                }
              );
            }
          } else {
            const obj = new Subscription({
              MemberId: mongoose.Types.ObjectId(memberId),
              //
              Movies: [
                {
                  MovieId: mongoose.Types.ObjectId(newWatchedMovie),
                  Date: Date.now(),
                },
              ],
            });
            obj.save(function (err, data) {
              if (err) {
                reject(err);
              } else {
                resolve(
                  "Client Bought a new movie for the first time, congrats!",
                  data
                );
              }
            });
          }
        }
      }
    );
  });
};

// const deleteMovieAndUpdateSubscriptionById = async function (
//   memberId,
//   movieId
// ) {
//   return new Promise(async (resolve, reject) => {
//     const subscription = await findSubscriptionByMemberId(memberId);

//     for (let j = 0; j < subscription[0].Movies.length; j++) {
//       const filteredMovies = subscription[0].Movies.filter(
//         (movie) => movie.MovieId.toString() !== movieId
//       );

//       const obj = {
//         MemberId: mongoose.Types.ObjectId(memberId),
//         Movies: [...filteredMovies],
//       };

//       Subscription.findByIdAndUpdate(subscription[0]._id, obj, (err) => {
//         if (err) reject(err);
//         else resolve("Subscription Movies Updated!");
//       });
//     }
//   });
// };

const deleteMovieAndUpdateSubscriptionById = async function (id) {
  const allSubscriptions = await getAllSubscriptions();

  for (let i = 0; i < allSubscriptions.length; i++) {
    for (let j = 0; j < allSubscriptions[i].Movies.length; j++) {
      const filteredMovies = allSubscriptions[i].Movies.filter(
        (movie) => movie.MovieId.toString() !== id
      );

      const obj = {
        MemberId: allSubscriptions[i].MemberId,
        Movies: [...filteredMovies],
      };

      Subscription.findByIdAndUpdate(allSubscriptions[i]._id, obj, (err) => {
        if (err) console.log(err);
      });
    }
  }
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionByMemberId,
  // updateSubscription,
  addMovieToSubscription,
  deleteSubscription,
  findSubscriptionByMemberId,
  // deleteMovieAndUpdateSubscriptionById,
  deleteMovieAndUpdateSubscriptionById
};
