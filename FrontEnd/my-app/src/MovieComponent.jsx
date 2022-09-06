import React from "react";
import { withRouter } from "react-router-dom";
import SubscriptionWatchedComponent from "./SubscriptionWatchedComponent";
import axios from "axios";

function MovieComponent(props) {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
          src="https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"
          // src={`${props.movieData.Image}`}
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
              `${props.match.url}/EditMoviePage/${props.movieData._id}`
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
        <br />
      </div>
      <br />
    </div>
  );
}

export default withRouter(MovieComponent);
