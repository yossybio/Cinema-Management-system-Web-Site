import React, { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import SubscriptionWatchedComponent from "./SubscriptionWatchedComponent";
import axios from "axios";

function MovieComponent(props) {
  let history = useHistory();
  const [deletionHasError, setDeletionHasError] = useState(null);

  const routingToNewPage = (event, newPagePath) => {
    event.preventDefault();
    props.history.push(newPagePath);
  };

  const deleteMovie = async (movieId) => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:8000/movies/${movieId}`,
      });
      history.goBack();
    } catch (error) {
      console.error(error);
      await setDeletionHasError(error);
    }
  };

  return (
    <React.Fragment>
      <br />
      <div style={{ border: "3px solid black", width: "25rem" }}>
        <label>
          <strong>{`${props.movieData.Name} ,${new Date(
            props.movieData.Premiered
          ).getFullYear()}`}</strong>
        </label>
        <br />
        <label>{`genres: ${props.movieData.Genres.map(
          (genere) => `"${genere}"`
        )}`}</label>
        <br />
        <img
          src={`${props.movieData.Image}`}
          width={"60rem"}
          height={"120rem"}
          alt={`${props.movieData.Name}`}
        />
        <SubscriptionWatchedComponent
          style={{
            float: "right",
            border: "3px solid black",
            position: "relative",
            right: "0.75rem",
          }}
          movieId={props.movieData._id}
        />
        <br />
        <button
          disabled={props.hasEditPermission ? false : true}
          onClick={(event) => {
            routingToNewPage(
              event,
              `${props.match.url.split("/AllMoviesPage")[0]}/EditMoviePage/${
                props.movieData._id
              }`
            );
          }}
        >
          Edit
        </button>
        {"   "}
        <button
          disabled={props.hasDeletePermission ? false : true}
          onClick={() => {
            deleteMovie(props.movieData._id);
          }}
        >
          Delete
        </button>
        <br />
        {deletionHasError && (
          <p style={{ color: "red" }}>Deletion ended unsuccessfully!</p>
        )}
        <br />
      </div>
      <br />
    </React.Fragment>
  );
}

export default withRouter(MovieComponent);
