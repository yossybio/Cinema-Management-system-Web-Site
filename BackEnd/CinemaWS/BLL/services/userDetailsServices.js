//Get-ALL
const getAllUsersDetails = async () => {
  try {
    const usersFile = require("jsonfile");
    const file = "./files/Users.json";
    const obj = await usersFile.readFile(file);
    return obj;
  } catch (error) {
    return error;
  }
};

//GET-BY-ID
const getUsersDetailsById = async (id) => {
  try {
    const usersFile = require("jsonfile");
    const file = "./files/Users.json";
    const obj = await usersFile.readFile(file);
    const userDetails = obj.usersDetails.filter((user) => user.Id === id);
    return userDetails;
  } catch (error) {
    return error;
  }
};

//Post
const addNewUserDetails = async (userToAdd) => {
  const usersFile = require("jsonfile");

  const file = "./files/Users.json";
  let allUsers = await getAllUsersDetails();
  let allUsersNew = { ...allUsers };
  allUsersNew.usersDetails.push(userToAdd);
  const obj = allUsersNew;

  await usersFile.writeFile(file, obj, function (err) {
    if (err) console.error(err);
  });

  return userToAdd;
};

//PUT
const updateUserDetails = async (userId, newData) => {
  let allUsers = await getAllUsersDetails();
  const index = allUsers.usersDetails.findIndex(
    (user) => String(user.Id) === String(userId)
  );
  // allUsers.usersDetails[index] = newData;
  allUsers.usersDetails[index] = {
    ...allUsers.usersDetails[index],
    ...newData,
  };

  const usersFile = require("jsonfile");
  const file = "./files/Users.json";
  await usersFile.writeFile(file, allUsers, function (err) {
    if (err) console.error(err);
  });

  return allUsers.usersDetails[index];
};

//Delete
const deleteUserDetails = async (userId) => {
  let allUsers = await getAllUsersDetails();
  const usersDetailsNew = allUsers.usersDetails.filter(
    (user) => String(user.Id) !== String(userId)
  );
  allUsers.usersDetails = [...usersDetailsNew];

  const usersFile = require("jsonfile");
  const file = "./files/Users.json";
  await usersFile.writeFile(file, allUsers, function (err) {
    if (err) console.error(err);
  });

  return "User details deleted succesfully!";
};

module.exports = {
  getAllUsersDetails,
  getUsersDetailsById,
  addNewUserDetails,
  updateUserDetails,
  deleteUserDetails,
};
