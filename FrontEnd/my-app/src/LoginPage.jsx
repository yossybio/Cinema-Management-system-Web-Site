import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginPage = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const Login = async (e) => {
    e.preventDefault();
    const usersURL = "http://localhost:8001/users";
    const allUsers = (await axios.get(usersURL)).data.users;
    const currentUser = allUsers.filter((user) => user.UserName === userName);

    if (
      currentUser.length > 0 &&
      currentUser[0].UserName === userName &&
      currentUser[0].Password === password
    ) {
      await sessionStorage.setItem("userId", currentUser[0]._id);

      if (userName === "Admin") {
        await sessionStorage.setItem("isAdmin", "true");
      } else {
        await sessionStorage.setItem("isAdmin", "false");
      }
      props.history.push("/main");
    } else {
      alert("Incorrect user name or password");
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default LoginPage;
