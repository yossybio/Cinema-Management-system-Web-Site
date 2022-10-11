import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

const User = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkingForAdmin() {
      props.user.UserName === "Administrator"
        ? setIsAdmin(true)
        : setIsAdmin(false);
    }

    checkingForAdmin();
  }, []);

  const editUser = async (userId) => {
    props.history.push(`${props.match.url}/EditUserPage/${userId}`);
  };

  const deleteUser = async (userId) => {
    const usersURL = "http://localhost:8001/users";
    await axios.delete(`${usersURL}/${userId}`);
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
    </div>
  );
};

export default withRouter(User);
