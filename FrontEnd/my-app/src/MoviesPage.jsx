import React from "react";
import { Switch, Route } from "react-router-dom";
import AddMoviePage from "./AddMoviePage";
import EditMoviePage from "./EditMoviePage";
import AllMoviesPage from "./AllMoviesPage";

const MoviesPage = (props) => {
  const routingToNewPage = (event, newPagePath) => {
    event.preventDefault();
    props.history.push(newPagePath);
  };

  return (
    <div>
      <h3>Movies</h3>
      <button
        onClick={(event) => {
          routingToNewPage(event, `${props.match.url}/AllMoviesPage`);
        }}
      >
        All Movies
      </button>
      <button
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
