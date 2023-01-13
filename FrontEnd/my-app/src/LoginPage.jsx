import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginPage = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(null);

  const Login = async (event) => {
    event.preventDefault();

    const usersURL = "http://localhost:8001/users";
    let allUsers;
    try {
      allUsers = (await axios.get(usersURL)).data;
    } catch (error) {
      console.error(error);
      await setHasError(error);
      return;
    }

    const currentUser = allUsers.users.filter(
      (user) => user.UserName === userName
    )[0];

    if (
      currentUser &&
      currentUser.UserName === userName &&
      currentUser.Password === password
    ) {
      const isAdministrator = userName === "Administrator";
      sessionStorage.setItem("isAdmin", isAdministrator.toString());

      const currentUserId = currentUser._id;
      sessionStorage.setItem("userId", currentUserId);

      const userPermissions = allUsers.usersPermissions.filter(
        (userPermissions) => currentUserId === userPermissions.Id
      )[0].Permissions;
      sessionStorage.setItem(
        "userPermissions",
        JSON.stringify(userPermissions)
      );

      props.history.replace("/main");
    } else {
      alert("Incorrect user name or password");
    }
  };

  return (
    <React.Fragment>
      <h3>Log in Page</h3>
      <form onSubmit={Login}>
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
        <button type="submit">Login</button>
        <br />
        <label>New User ? : </label>
        <Link to="/createAccount">Create Account</Link>
      </form>
      {hasError && <p style={{ color: "red" }}>Somthing went wrong!</p>}
    </React.Fragment>
  );
};

export default LoginPage;
