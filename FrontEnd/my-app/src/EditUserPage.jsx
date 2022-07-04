import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const EditUserPage = (props) => {
  const { userId } = useParams();
  let [state, setState] = useState(null);
  let history = useHistory();

  useEffect(() => {
    async function gettingUserData() {
      const userUrl = `http://localhost:8001/users/${userId}`;
      const oldUserData = (await axios.get(userUrl)).data;
      await setState({
        users: { ...oldUserData.users },
        userDetails: [...oldUserData.userDetails],
        userPermissions: [...oldUserData.userPermissions],
      });
    }

    gettingUserData();
  }, []);

  const gettingOldPermissions = (oldPermission) => {
    return state.userPermissions[0].Permissions.indexOf(oldPermission) > -1;
  };

  const updatePermissions = async (changedPermission) => {
    let newState = { ...state };
    const index =
      state.userPermissions[0].Permissions.indexOf(changedPermission);
    if (index > -1) {
      const oldPermissionsArray = [...state.userPermissions[0].Permissions];
      const newPermissionsArray = oldPermissionsArray.filter(
        (permissionCell) => permissionCell !== changedPermission
      );
      newState.userPermissions[0].Permissions = newPermissionsArray;
      await setState(newState);
    } else {
      let newPermissionsArray = [...state.userPermissions[0].Permissions];
      newPermissionsArray.push(changedPermission);

      const isUserHasViewSubscriptionsPermission =
        state.userPermissions[0].Permissions.indexOf("View Subscriptions") > -1;
      if (
        (changedPermission === "Create Subscriptions" ||
          changedPermission === "Update Subscriptions" ||
          changedPermission === "Delete Subscriptions") &&
        isUserHasViewSubscriptionsPermission === false
      ) {
        newPermissionsArray.push("View Subscriptions");
      }

      const isUserHasViewMoviesPermission =
        state.userPermissions[0].Permissions.indexOf("View Movies") > -1;
      if (
        (changedPermission === "Create Movies" ||
          changedPermission === "Update Movies" ||
          changedPermission === "Delete Movies") &&
        isUserHasViewMoviesPermission === false
      ) {
        newPermissionsArray.push("View Movies");
      }

      newState.userPermissions[0].Permissions = newPermissionsArray;
      await setState(newState);
    }
  };

  const handleUserDetailsChange = async (event) => {
    let { name, value } = event.target;
    let newState = { ...state };
    newState.userDetails[0][name] = value;

    await setState(newState);
  };

  const handleUserChange = async (event) => {
    let { name, value } = event.target;
    let newState = { ...state };
    newState.users[name] = value;

    await setState(newState);
  };

  const savingChanges = () => {
    axios({
      method: "put",
      url: `http://localhost:8001/users/${state.users._id}`,
      headers: {},
      data: {
        UserName: state.users.UserName,
        Password: state.users.Password,
        FirstName: state.userDetails[0].FirstName,
        LastName: state.userDetails[0].LastName,
        Permissions: state.userPermissions[0].Permissions,
      },
    });
  };

  return (
    state && (
      <div>
        <h4>
          Edit User :{" "}
          {`${state.userDetails[0].FirstName} ${state.userDetails[0].LastName}`}
        </h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            savingChanges();
            history.goBack();
          }}
        >
          <label>First Name : </label>
          <input
            type="text"
            name="FirstName"
            value={state.userDetails[0].FirstName}
            onChange={handleUserDetailsChange}
          />
          <br />
          <label>Last Name : </label>
          <input
            type="text"
            name="LastName"
            value={state.userDetails[0].LastName}
            onChange={handleUserDetailsChange}
          />
          <br />
          <label>User Name : </label>
          <input
            type="email"
            name="UserName"
            value={state.users.UserName}
            onChange={handleUserChange}
          />
          <br />
          <label>Created Date : </label>
          <input
            type="date"
            defaultValue={new Date(state.userDetails[0].CreatedDate)
              .toISOString()
              .substring(0, 10)}
            style={{ pointerEvents: "none" }}
            tabIndex="-1"
          />
          <br />
          <label>Permissions : </label>
          <br />
          <input
            type="checkbox"
            defaultChecked={gettingOldPermissions("View Subscriptions")}
            onChange={() => {
              updatePermissions("View Subscriptions");
            }}
          />
          <label>View Subscriptions</label>
          <br />
          <input
            type="checkbox"
            defaultChecked={gettingOldPermissions("Create Subscriptions")}
            onChange={() => {
              updatePermissions("Create Subscriptions");
            }}
          />
          <label>Create Subscriptions</label>
          <br />
          <input
            type="checkbox"
            defaultChecked={gettingOldPermissions("Delete Subscriptions")}
            onChange={() => {
              updatePermissions("Delete Subscriptions");
            }}
          />
          <label>Delete Subscriptions</label>
          <br />
          <input
            type="checkbox"
            defaultChecked={gettingOldPermissions("Update Subscriptions")}
            onChange={() => {
              updatePermissions("Update Subscriptions");
            }}
          />
          <label>Update Subscription</label>
          <br />
          <input
            type="checkbox"
            defaultChecked={gettingOldPermissions("View Movies")}
            onChange={() => {
              updatePermissions("View Movies");
            }}
          />
          <label>View Movies</label>
          <br />
          <input
            type="checkbox"
            defaultChecked={gettingOldPermissions("Create Movies")}
            onChange={() => {
              updatePermissions("Create Movies");
            }}
          />
          <label>Create Movies</label>
          <br />
          <input
            type="checkbox"
            defaultChecked={gettingOldPermissions("Delete Movies")}
            onChange={() => {
              updatePermissions("Delete Movies");
            }}
          />
          <label>Delete Movies</label>
          <br />
          <input
            type="checkbox"
            defaultChecked={gettingOldPermissions("Update Movies")}
            onChange={() => {
              updatePermissions("Update Movies");
            }}
          />
          <label>Update Movie</label>
          <br />
          <br />
          <button type="submit">Update</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              history.goBack();
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    )
  );
};

export default EditUserPage;
