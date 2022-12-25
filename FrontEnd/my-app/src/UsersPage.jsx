import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import User from "./User";

const UsersPage = (props) => {
  const [allUsers, setAllUsers] = useState(null);
  const [hasError, setHasError] = useState(null);

  const loadingUsers = useCallback(async () => {
    const usersURL = "http://localhost:8001/users";
    let allUsersData;

    try {
      allUsersData = (await axios.get(usersURL)).data;
    } catch (error) {
      console.error(error);
      await setHasError(error);
      return;
    }

    await setAllUsers(allUsersData);
  }, []);

  useEffect(() => {
    loadingUsers();
  }, [loadingUsers]);

  let usersRep = [];
  const creatingUserElements = () => {
    for (let index = 0; index < allUsers.users.length; index++) {
      usersRep.push(
        <User
          key={index}
          user={allUsers.users[index]}
          userDetails={allUsers.usersDetails[index]}
          userPermissions={allUsers.usersPermissions[index]}
          loadingAllUsersFunc={loadingUsers}
        />
      );
    }

    return usersRep;
  };

  return (
    <React.Fragment>
      <h3>All Users Page</h3>
      {allUsers && creatingUserElements()}
      {hasError && <p style={{ color: "red" }}>Somthing went wrong!</p>}
    </React.Fragment>
  );
};

export default UsersPage;
