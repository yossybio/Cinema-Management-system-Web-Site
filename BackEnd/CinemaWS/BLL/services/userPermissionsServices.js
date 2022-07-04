// const addNewUserPermissions = async (permisionsToAdd) => {
//   const usersFile = require("jsonfile");

//   const file = "../files/Users.json";
//   const obj = userToAdd;

//   await usersFile.writeFile(file, obj, { flag: "a" }, function (err) {
//     if (err) console.error(err);
//   });
// };

//Get-ALL
const getAllUsersPermissions = async () => {
  try {
    const usersFile = require("jsonfile");
    const file = "./files/Permissions.json";
    const obj = await usersFile.readFile(file);
    return obj;
  } catch (error) {
    return error;
  }
};

//GET-BY-ID
const getUsersPermissionsById = async (id) => {
  try {
    const usersFile = require("jsonfile");
    const file = "./files/Permissions.json";
    const obj = await usersFile.readFile(file);
    const userPermissions = obj.usersPermissions.filter(
      (user) => user.Id === id
    );
    return userPermissions;
  } catch (error) {
    return error;
  }
};

//Post
const addNewUserPermissions = async (permissionToAdd) => {
  const usersFile = require("jsonfile");
  const file = "./files/Permissions.json";

  let allUsers = await getAllUsersPermissions();
  let allUsersNew = { ...allUsers };
  allUsersNew.usersPermissions.push(permissionToAdd);
  const obj = allUsersNew;

  await usersFile.writeFile(file, obj, function (err) {
    if (err) console.error(err);
  });

  return permissionToAdd;
};

//PUT
const updateUserPermissions = async (userId, newData) => {
  let allUsers = await getAllUsersPermissions();
  const index = allUsers.usersPermissions.findIndex(
    (user) => String(user.Id) === String(userId)
  );
  allUsers.usersPermissions[index] = {
    ...allUsers.usersPermissions[index],
    ...newData,
  };

  const usersFile = require("jsonfile");
  const file = "./files/Permissions.json";
  await usersFile.writeFile(file, allUsers, function (err) {
    if (err) console.error(err);
  });

  return allUsers.usersPermissions[index];
};

//Delete
const deleteUserPermissions = async (userId) => {
  let allUsers = await getAllUsersPermissions();
  const usersPermissionsNew = allUsers.usersPermissions.filter(
    (user) => String(user.Id) !== String(userId)
  );
  allUsers.usersPermissions = [...usersPermissionsNew];

  const usersFile = require("jsonfile");
  const file = "./files/Permissions.json";
  await usersFile.writeFile(file, allUsers, function (err) {
    if (err) console.error(err);
  });

  return "User permissions deleted succesfully!";
};

module.exports = {
  getAllUsersPermissions,
  getUsersPermissionsById,
  addNewUserPermissions,
  updateUserPermissions,
  deleteUserPermissions,
};
