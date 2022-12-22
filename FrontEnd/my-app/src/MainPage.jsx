import React from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import MoviesPage from "./MoviesPage";
import SubscriptionsPage from "./SubscriptionsPage";
import ManageUsersPage from "./ManageUsersPage";
import { useState } from "react";
import classes from "./MainPage.module.css";

const MainPage = (props) => {
  const [isAdmin, setIsAdmin] = useState(
    sessionStorage.getItem("isAdmin") === "true"
  );

  return (
    <div>
      <NavLink
        to={`${props.match.url}/MoviesPage/AllMoviesPage`}
        activeClassName={classes.selectedNavLink}
      >
        Movies
      </NavLink>{" "}
      <NavLink
        to={`${props.match.url}/SubscriptionsPage/AllMembersPage`}
        activeClassName={classes.selectedNavLink}
      >
        Subscriptions
      </NavLink>{" "}
      <NavLink
        to={`${props.match.url}/ManageUsersPage`}
        activeClassName={classes.selectedNavLink}
        style={isAdmin ? { display: "inline-block" } : { display: "none" }}
      >
        Users Managment
      </NavLink>{" "}
      <NavLink
        to={"/"}
        onClick={async () => {
          await sessionStorage.clear();
        }}
      >
        Log Out
      </NavLink>
      
      <Switch>
        <Route path={`${props.match.url}/MoviesPage`} component={MoviesPage} />
        <Route
          path={`${props.match.url}/SubscriptionsPage`}
          component={SubscriptionsPage}
        />
        <Route
          path={`${props.match.url}/ManageUsersPage`}
          component={ManageUsersPage}
        />
      </Switch>
    </div>
  );
};

export default MainPage;
