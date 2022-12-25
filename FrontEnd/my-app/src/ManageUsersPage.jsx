import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import UsersPage from "./UsersPage";
import AddUserPage from "./AddUserPage";
import EditUserPage from "./EditUserPage";
import classes from "./navLink.module.css";

const ManageUsersPage = (props) => {
  return (
    <React.Fragment>
      <h3>Users</h3>
      <NavLink
        to={props.match.url} exact
        activeClassName={classes.selectedNavLink}
        className={classes.navLinkStyle}
      >
        All Users
      </NavLink>
      {"  "}
      <NavLink
        to={`${props.match.url}/AddUserPage`}
        activeClassName={classes.selectedNavLink}
        className={classes.navLinkStyle}
      >
        Add User
      </NavLink>
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
    </React.Fragment>
  );
};

export default ManageUsersPage;
