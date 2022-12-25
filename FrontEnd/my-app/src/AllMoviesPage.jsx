import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieComponent from "./MovieComponent";
import { useParams } from "react-router-dom";

export default function AllMoviesPage(props) {
  const { movieId } = useParams();
  const [userPermissions, setUserPermissions] = useState([]);
  const [hasViewPermission, setHasViewPermission] = useState(false);
  const [hasEditPermission, setHasEditPermission] = useState(false);
  const [hasDeletePermission, setHasDeletePermission] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    const getUserPermissions = async () => {
      const permissions = JSON.parse(
        await sessionStorage.getItem("userPermissions")
      );
      await setUserPermissions(permissions);

      await setHasViewPermission(
        permissions.some((permission) => permission === "View Movies")
      );

      await setHasEditPermission(
        permissions.some((permission) => permission === "Update Movies")
      );

      await setHasDeletePermission(
        permissions.some((permission) => permission === "Delete Movies")
      );
    };

    const fetchAllMovies = async () => {
      try {
        if (movieId) {
          const selectedMovieURL = `http://localhost:8000/movies/${movieId}`;
          let selectedMovieData = (await axios.get(selectedMovieURL)).data;
          await setAllMovies([{ ...selectedMovieData }]);
        } else {
          const moviesURL = `http://localhost:8000/movies`;
          let movies = (await axios.get(moviesURL)).data;
          await setAllMovies(movies);
        }
      } catch (error) {
        console.error(error);
        await setHasError(error);
      }
    };

    getUserPermissions();
    fetchAllMovies();
  }, [movieId, allMovies]);

  let moviesRepeater = allMovies.map((movie) => (
    <MovieComponent
      key={movie._id}
      movieData={movie}
      hasEditPermission={hasEditPermission}
      hasDeletePermission={hasDeletePermission}
    />
  ));

  return (
    <React.Fragment>
      {hasViewPermission && <div>{moviesRepeater}</div>}
      {hasError && <p style={{ color: "red" }}>Something went wrong!</p>}
    </React.Fragment>
  );
}
