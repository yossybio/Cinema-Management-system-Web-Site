import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

const User = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    async function checkingForAdmin() {
      let isAdministrator = props.user.UserName === "Administrator";
      setIsAdmin(isAdministrator);
    }

    checkingForAdmin();
  }, [props.user.UserName]);

  const editUser = async (userId) => {
    props.history.push(`${props.match.url}/EditUserPage/${userId}`);
  };

  const deleteUser = async (userId) => {
    const usersURL = "http://localhost:8001/users";
    try {
      await axios.delete(`${usersURL}/${userId}`);
    } catch (error) {
      console.error(error);
      await setHasError(error);
    }

    props.loadingAllUsersFunc();
  };

  return (
    <div style={{ border: "3px solid black" }}>
      <label>
        Name : {`${props.userDetails.FirstName} ${props.userDetails.LastName}`}{" "}
      </label>
      <br />
      <label>User Name : {`${props.user.UserName}`} </label>
      <br />
      <label>
        Created Data :{" "}
        {`${new Date(props.userDetails.CreatedDate).toLocaleString("he-IL")}`}{" "}
      </label>
      <br />
      <label>Permissions : {`${props.userPermissions.Permissions}`} </label>
      <br />
      <br />
      <button
        onClick={() => {
          editUser(props.user._id);
        }}
        disabled={isAdmin}
      >
        Edit
      </button>
      <button
        onClick={() => {
          deleteUser(props.user._id);
        }}
        disabled={isAdmin}
      >
        Delete
      </button>
      <br />
      <br />
      {hasError && (
        <p style={{ color: "red" }}>Deletion did not complete successfully!</p>
      )}
    </div>
  );
};

export default withRouter(User);
