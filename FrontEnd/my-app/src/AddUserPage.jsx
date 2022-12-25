import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddUserPage = () => {
  const [state, setState] = useState({
    FirstName: "",
    LastName: "",
    UserName: "",
    Permissions: [],
  });
  const [hasError, setHasError] = useState(null);
  let history = useHistory();

  const updatePermissions = async (changedPermission) => {
    let newState = { ...state };
    const index = state.Permissions.indexOf(changedPermission);
    if (index > -1) {
      const oldPermissionsArray = [...state.Permissions];
      const newPermissionsArray = oldPermissionsArray.filter(
        (permissionCell) => permissionCell !== changedPermission
      );
      newState.Permissions = newPermissionsArray;
      await setState(newState);
    } else {
      let newPermissionsArray = [...state.Permissions];
      newPermissionsArray.push(changedPermission);

      const isUserHasViewSubscriptionsPermission =
        state.Permissions.indexOf("View Subscriptions") > -1;
      if (
        (changedPermission === "Create Subscriptions" ||
          changedPermission === "Update Subscriptions" ||
          changedPermission === "Delete Subscriptions") &&
        isUserHasViewSubscriptionsPermission === false
      ) {
        newPermissionsArray.push("View Subscriptions");
      }

      const isUserHasViewMoviesPermission =
        state.Permissions.indexOf("View Movies") > -1;
      if (
        (changedPermission === "Create Movies" ||
          changedPermission === "Update Movies" ||
          changedPermission === "Delete Movies") &&
        isUserHasViewMoviesPermission === false
      ) {
        newPermissionsArray.push("View Movies");
      }

      newState.Permissions = newPermissionsArray;
      await setState(newState);
    }
  };

  const handleChange = async (event) => {
    let { name, value } = event.target;
    let newState = { ...state };
    newState[name] = value;

    await setState(newState);
  };

  const savingChanges = async () => {
    await axios({
      method: "post",
      url: `http://localhost:8001/users/`,
      headers: {},
      data: {
        UserName: state.UserName,
        FirstName: state.FirstName,
        LastName: state.LastName,
        Permissions: state.Permissions,
      },
    });
  };

  return (
    <React.Fragment>
      <h4>Add New User :</h4>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await savingChanges();
            history.goBack();
          } catch (error) {
            console.error(error);
            await setHasError(error);
          }
        }}
      >
        <label>First Name : </label>
        <input
          type="text"
          name="FirstName"
          placeholder="Enter First Name"
          onChange={handleChange}
        />
        <br />
        <label>Last Name : </label>
        <input
          type="text"
          name="LastName"
          placeholder="Enter Last Name"
          onChange={handleChange}
        />
        <br />
        <label>User Name : </label>
        <input
          type="email"
          name="UserName"
          placeholder="Enter User Name"
          onChange={handleChange}
        />
        <br />
        <label>Permissions : </label>
        <br />
        <input
          type="checkbox"
          onChange={() => {
            updatePermissions("View Subscriptions");
          }}
        />
        <label>View Subscriptions</label>
        <br />
        <input
          type="checkbox"
          onChange={() => {
            updatePermissions("Create Subscriptions");
          }}
        />
        <label>Create Subscriptions</label>
        <br />
        <input
          type="checkbox"
          onChange={() => {
            updatePermissions("Delete Subscriptions");
          }}
        />
        <label>Delete Subscriptions</label>
        <br />
        <input
          type="checkbox"
          onChange={() => {
            updatePermissions("Update Subscriptions");
          }}
        />
        <label>Update Subscriptions</label>
        <br />
        <input
          type="checkbox"
          onChange={() => {
            updatePermissions("View Movies");
          }}
        />
        <label>View Movies</label>
        <br />
        <input
          type="checkbox"
          onChange={() => {
            updatePermissions("Create Movies");
          }}
        />
        <label>Create Movies</label>
        <br />
        <input
          type="checkbox"
          onChange={() => {
            updatePermissions("Delete Movies");
          }}
        />
        <label>Delete Movies</label>
        <br />
        <input
          type="checkbox"
          onChange={() => {
            updatePermissions("Update Movies");
          }}
        />
        <label>Update Movies</label>
        <br />
        <br />
        <button type="submit">Save</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            history.goBack();
          }}
        >
          Cancel
        </button>
      </form>
      {hasError && <p style={{ color: "red" }}>Adding new user failed!</p>}
    </React.Fragment>
  );
};

export default AddUserPage;
