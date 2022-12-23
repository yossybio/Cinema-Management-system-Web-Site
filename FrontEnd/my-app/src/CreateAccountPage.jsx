import React from "react";
import { useState } from "react";
import axios from "axios";

const CreateAccountPage = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(null);

  const createAccount = async (e) => {
    e.preventDefault();

    const usersURL = "http://localhost:8001/users";
    let allUsersData;

    try {
      allUsersData = (await axios.get(usersURL)).data;
    } catch (error) {
      console.error(error);
      await setHasError(error);
      return;
    }
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

      try {
        await axios.put(`${usersURL}/${userId}`, obj);
      } catch (error) {
        console.error(error);
        await setHasError(error);
        return;
      }

      await props.history.push("/");
    } else {
      alert("Invalid user name!!!");
    }
  };

  return (
    <React.Fragment>
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
      {hasError && <p style={{ color: "red" }}>Somthing went wrong!</p>}
    </React.Fragment>
  );
};

export default CreateAccountPage;
