import React from "react";
import { Switch, Route } from "react-router-dom";
import UsersPage from "./UsersPage";
import AddUserPage from "./AddUserPage";
import EditUserPage from "./EditUserPage";

const ManageUsersPage = (props) => {
  const routingToNewPage = (event, newPagePath) => {
    event.preventDefault();
    props.history.push(newPagePath);
  };

  return (
    <div>
      <h3>Users</h3>
      <button
        onClick={(event) => {
          routingToNewPage(event, `${props.match.url}`);
        }}
      >
        All Users
      </button>
      <button
        onClick={(event) => {
          routingToNewPage(event, `${props.match.url}/AddUserPage`);
        }}
      >
        Add User
      </button>
      <Switch>
        <Route path={`${props.match.url}/`} exact component={UsersPage} />
        <Route
          path={`${props.match.url}/AddUserPage`}
          component={AddUserPage}
        />
        <Route
          path={`${props.match.url}/EditUserPage/:userId`}
          component={EditUserPage}
        />
      </Switch>
    </div>
  );
};

export default ManageUsersPage;
