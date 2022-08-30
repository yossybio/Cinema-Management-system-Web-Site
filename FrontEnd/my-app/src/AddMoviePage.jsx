import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function AddMoviePage() {
  let [state, setState] = useState({
    movieData: {
      Name: "",
      Genres: "",
      Image: "",
      Premiered: "",
    },
  });
  let history = useHistory();

  const handleUserDetailsChange = async (event) => {
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

  const savingNewMovie = () => {
    axios({
      method: "post",
      url: `http://localhost:8000/movies`,
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
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          savingNewMovie();
          history.goBack();
        }}
      >
        <label>Name : </label>
        <input type="text" name="Name" onChange={handleUserDetailsChange} />
        <br />
        <label>Genres : </label>
        <input type="text" name="Genres" onChange={handleGenresChange} />
        <br />
        <label>Image URL : </label>
        <input type="url" name="Image" onChange={handleUserDetailsChange} />
        <br />
        <label>Premiered : </label>
        <input
          type="date"
          name="Premiered"
          tabIndex="-1"
          onChange={handleUserDetailsChange}
        />
        <br />
        <br />
        <button type="submit">Save</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            history.goBack();
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
