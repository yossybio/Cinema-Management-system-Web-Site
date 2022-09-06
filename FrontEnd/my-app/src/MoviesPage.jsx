import { React, useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import AddMoviePage from "./AddMoviePage";
import EditMoviePage from "./EditMoviePage";
import AllMoviesPage from "./AllMoviesPage";

const MoviesPage = (props) => {
  const [userPermissions, setUserPermissions] = useState([]);
  const [hasViewMoviesPermission, setHasViewMoviesPermission] = useState(false);
  const [hasCreateMoviesPermission, setHasCreateMoviesPermission] =
    useState(false);

  const routingToNewPage = (event, newPagePath) => {
    event.preventDefault();
    props.history.push(newPagePath);
  };

  useEffect(() => {
    const getUserPermissions = async () => {
      const permissions = JSON.parse(
        await sessionStorage.getItem("userPermissions")
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
      <button
        disabled={hasViewMoviesPermission ? false : true}
        onClick={(event) => {
          routingToNewPage(event, `${props.match.url}/AllMoviesPage`);
        }}
      >
        All Movies
      </button>
      <button
        disabled={hasCreateMoviesPermission ? false : true}
        onClick={(event) => {
          routingToNewPage(event, `${props.match.url}/AddMoviePage`);
        }}
      >
        Add Movie
      </button>
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
          path={`${props.match.url}/AllMoviesPage/EditMoviePage/:movieId`}
          component={EditMoviePage}
        />
      </Switch>
    </div>
  );
};

export default MoviesPage;
