const express = require("express");
const usersService = require("../../BLL/services/usersServices");
const userDetailsServices = require("../../BLL/services/userDetailsServices");
const userPermissionsServices = require("../../BLL/services/userPermissionsServices");

const router = express.Router();

// Entry Point: 'http://localhost:8001/users'

// Get-All
router.route("/").get(async (req, res) => {
  try {
    const dbUsers = await usersService.getAllUsers();
    const fileUsersDetails = await userDetailsServices.getAllUsersDetails();
    const fileUsersPermissions =
      await userPermissionsServices.getAllUsersPermissions();

    const result = {
      users: dbUsers,
      usersDetails: fileUsersDetails.usersDetails,
      usersPermissions: fileUsersPermissions.usersPermissions,
    };

    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

// Get-By-Id
router.route("/:id").get(async (req, res) => {
  try {
    const id = req.params.id;
    const dbUser = await usersService.getUserById(id);
    const fileUserDetails = await userDetailsServices.getUsersDetailsById(id);
    const fileUserPermissions =
      await userPermissionsServices.getUsersPermissionsById(id);

    const result = {
      users: dbUser,
      userDetails: fileUserDetails,
      userPermissions: fileUserPermissions,
    };

    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

// Post
router.route("/").post(async (req, res) => {
  try {
    const data = req.body;

    const user = { UserName: data.UserName };
    const addedUserToDB = await usersService.addUser(user);

    const userDetails = {
      Id: addedUserToDB._id,
      FirstName: data.FirstName,
      LastName: data.LastName,
      CreatedDate: new Date(),
    };

    const addedUserToFile = await userDetailsServices.addNewUserDetails(
      userDetails
    );

    const userPermissions = {
      Id: addedUserToDB._id,
      Permissions: data.Permissions,
    };

    const addedPermissionToFile =
      await userPermissionsServices.addNewUserPermissions(userPermissions);

    const result = {
      users: addedUserToDB,
      userDetails: addedUserToFile,
      userPermissions: addedPermissionToFile,
    };

    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

// Put
router.route("/:id").put(async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const dataForDB = {
      UserName: data.UserName,
      Password: data.Password,
    };

    const user = {
      FirstName: data.FirstName,
      LastName: data.LastName,
    };

    const permissions = {
      Permissions: data.Permissions,
    };

    const updatedUserDB = await usersService.updateUser(id, dataForDB);
    const updatedDetailsFile = await userDetailsServices.updateUserDetails(
      id,
      user
    );
    const updatedPermissionsFile =
      await userPermissionsServices.updateUserPermissions(id, permissions);

    const result = {
      users: updatedUserDB,
      userDetails: updatedDetailsFile,
      userPermissions: updatedPermissionsFile,
    };

    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
});

// Delete
router.route("/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;

    const resultDB = await usersService.deleteUser(id);
    const resultDetailsFile = await userDetailsServices.deleteUserDetails(id);
    const resultPermissionsFile =
      await userPermissionsServices.deleteUserPermissions(id);
    return res.json({ resultDB, resultDetailsFile, resultPermissionsFile });
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
