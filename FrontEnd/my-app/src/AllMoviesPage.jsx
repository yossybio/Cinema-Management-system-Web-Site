import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieComponent from "./MovieComponent";

export default function AllMoviesPage(props) {
  const [userPermissions, setUserPermissions] = useState([]);
  const [hasViewPermission, setHasViewPermission] = useState(false);
  const [hasEditPermission, setHasEditPermission] = useState(false);
  const [hasDeletePermission, setHasDeletePermission] = useState(false);
  const [allMovies, setAllMovies] = useState([]);

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
      let movies = (await axios.get("http://localhost:8000/movies")).data;
      await setAllMovies(movies);
    };

    getUserPermissions();
    fetchAllMovies();
  }, [allMovies]);

  let moviesRepeater = allMovies.map((movie) => (
    <MovieComponent
      key={movie._id}
      movieData={movie}
      hasEditPermission={hasEditPermission}
      hasDeletePermission={hasDeletePermission}
    />
  ));
  return hasViewPermission && <div>{moviesRepeater}</div>;
}
