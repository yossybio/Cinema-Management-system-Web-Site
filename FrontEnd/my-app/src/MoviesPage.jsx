import { React, useState, useEffect } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import AddMoviePage from "./AddMoviePage";
import EditMoviePage from "./EditMoviePage";
import AllMoviesPage from "./AllMoviesPage";
import classes from "./navLink.module.css";

const MoviesPage = (props) => {
  const [userPermissions, setUserPermissions] = useState([]);
  const [hasViewMoviesPermission, setHasViewMoviesPermission] = useState(false);
  const [hasCreateMoviesPermission, setHasCreateMoviesPermission] =
    useState(false);

  useEffect(() => {
    const getUserPermissions = async () => {
      const permissions = JSON.parse(
        sessionStorage.getItem("userPermissions")
      );
      await setUserPermissions(permissions);

      await setHasViewMoviesPermission(
        permissions.some((permission) => permission === "View Movies")
      );
      await setHasCreateMoviesPermission(
        permissions.some((permission) => permission === "Create Movies")
      );
    };

    getUserPermissions();
  }, []);

  return (
    <div>
      <h3>Movies</h3>
      <NavLink
        disabled={hasViewMoviesPermission ? false : true}
        to={`${props.match.url}/AllMoviesPage`}
        className={classes.navLinkStyle}
        activeClassName={classes.selectedNavLink}
      >
        {" "}
        All Movies
      </NavLink>
      {"  "}
      <NavLink
        disabled={hasCreateMoviesPermission ? false : true}
        to={`${props.match.url}/AddMoviePage`}
        className={classes.navLinkStyle}
        activeClassName={classes.selectedNavLink}
      >
        Add Movie
      </NavLink>
      <Switch>
        <Route
          path={`${props.match.url}/AllMoviesPage`}
          exact
          component={AllMoviesPage}
        />
        <Route
          path={`${props.match.url}/AddMoviePage`}
          component={AddMoviePage}
        />
        <Route
          path={`${props.match.url}/EditMoviePage/:movieId`}
          component={EditMoviePage}
        />
        <Route
          path={`${props.match.url}/AllMoviesPage/:movieId`}
          component={AllMoviesPage}
        />
      </Switch>
    </div>
  );
};

export default MoviesPage;
