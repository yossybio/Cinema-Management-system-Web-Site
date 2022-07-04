import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "./User";
import { Switch, Route } from "react-router-dom";

const UsersPage = (props) => {
  const [users, setUsers] = useState([]);

  async function loadingUsers() {
    const usersURL = "http://localhost:8001/users";
    const allUsersData = (await axios.get(usersURL)).data;
    const usersRep = allUsersData.users.map((user, index) => {
      return (
        <User
          key={index}
          user={user}
          userDetails={allUsersData.usersDetails[index]}
          userPermissions={allUsersData.usersPermissions[index]}
          loadingAllUsersFunc={loadingUsers}
        />
      );
    });

    setUsers(usersRep);
  }

  useEffect(() => {
    loadingUsers();
  }, []);

  return (
    <div>
      <h3>All Users Page</h3>
      {users}
    </div>
  );
};

export default UsersPage;
