import React from "react";
import { useState } from "react";
import axios from "axios";

const CreateAccountPage = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = async (e) => {
    e.preventDefault();
    const usersURL = "http://localhost:8001/users";
    const allUsersData = (await axios.get(usersURL)).data;
    const users = allUsersData.users;
    const details = allUsersData.usersDetails;
    const permissions = allUsersData.usersPermissions;
    let userIndex = -1;

    for (let i = 0; i < users.length; i++) {
      if (users[i].UserName === userName) {
        userIndex = i;
        break;
      }
    }

    if (userIndex !== -1) {
      const userId = users[userIndex]._id;
      const obj = {
        UserName: userName,
        Password: password,
        FirstName: details[userIndex].FirstName,
        LastName: details[userIndex].LastName,
        CreatedDate: details[userIndex].CreatedDate,
        Permissions: permissions[userIndex].Permissions,
      };

      await axios.put(`${usersURL}/${userId}`, obj);
      await props.history.push("/");
    } else {
      alert("Invalid user name!!!");
    }
  };

  return (
    <div>
      <h3>Create an Account </h3>
      <form onSubmit={createAccount}>
        <label>User Name : </label>
        <input
          type="text"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <br />
        <label>Password : </label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateAccountPage;
