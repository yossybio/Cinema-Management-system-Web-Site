import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

export default function EditMoviePage() {
  const { movieId } = useParams();
  const [state, setState] = useState(null);
  const [oldMovieName, setOldMovieName] = useState("");
  const [hasError, setHasError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function gettingMovieData() {
      const movieUrl = `http://localhost:8000/movies/${movieId}`;
      const oldMovieData = (await axios.get(movieUrl)).data;
      await setState({
        movieData: { ...oldMovieData },
      });

      await setOldMovieName(oldMovieData.Name);
    }

    gettingMovieData();
  }, [movieId]);

  const handleMovieDetailsChange = async (event) => {
    let { name, value } = event.target;
    let newState = { ...state };
    newState.movieData[name] = value;

    await setState(newState);
  };

  const handleGenresChange = async (event) => {
    let { name, value } = event.target;
    let newState = { ...state };
    newState.movieData[name] = value.split(",");

    await setState(newState);
  };

  const savingChanges = async () => {
    await axios({
      method: "put",
      url: `http://localhost:8000/movies/${movieId}`,
      headers: {},
      data: {
        Name: state.movieData.Name,
        Genres: state.movieData.Genres,
        Image: state.movieData.Image,
        Premiered: state.movieData.Premiered,
      },
    });
  };

  return (
    state && (
      <div>
        <h4>Edit Movie : {`${oldMovieName}`}</h4>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await savingChanges();
              history.goBack();
            } catch (error) {
              console.error(error);
              await setHasError(error);
            }
          }}
        >
          <label>Name : </label>
          <input
            type="text"
            name="Name"
            value={state.movieData.Name}
            onChange={handleMovieDetailsChange}
          />
          <br />
          <label>Genres : </label>
          <input
            type="text"
            name="Genres"
            value={state.movieData.Genres}
            onChange={handleGenresChange}
          />
          <br />
          <label>Image URL : </label>
          <input
            type="url"
            name="Image"
            value={state.movieData.Image}
            onChange={handleMovieDetailsChange}
          />
          <br />
          <label>Premiered : </label>
          <input
            type="date"
            name="Premiered"
            defaultValue={new Date(state.movieData.Premiered)
              .toISOString()
              .substring(0, 10)}
            tabIndex="-1"
            onChange={handleMovieDetailsChange}
          />
          <br />
          <br />
          <button type="submit">Update</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              history.goBack();
            }}
          >
            Cancel
          </button>
        </form>
        {hasError && (
          <p style={{ color: "red" }}>Edit movie ended unsuccessfully!</p>
        )}
      </div>
    )
  );
}
