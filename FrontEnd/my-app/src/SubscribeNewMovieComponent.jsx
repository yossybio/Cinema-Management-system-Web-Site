import { React, useEffect, useState } from "react";
import axios from "axios";

export default function SubscribeNewMovieComponent(props) {
  const [allMovies, setAllMovies] = useState(null);
  const [state, setState] = useState({
    movieToSubscribe: "",
    subscriptionDate: "",
  });

  useEffect(() => {
    async function fetchAllMovies() {
      const moviesURL = "http://localhost:8000/movies";
      let movies = (await axios.get(moviesURL)).data;
      await setAllMovies(movies);
    }

    fetchAllMovies();
  }, []);

  function preparingListOfMoviesRepiter() {
    let moviesToWatch = [...allMovies];

    for (let index = 0; index < props.watchedMovies.length; index++) {
      moviesToWatch = moviesToWatch.filter(
        (movie) => movie._id !== props.watchedMovies[index].MovieId
      );
    }

    const optionElementRepiter = moviesToWatch.map((movie) => (
      <option key={movie._id} value={movie._id}>
        {movie.Name}
      </option>
    ));

    return optionElementRepiter;
  }

  async function subscribeToNewMovie(event) {
    event.preventDefault();
    const subscriptionURL = "http://localhost:8000/subscriptions";

    axios
      .post(subscriptionURL, {
        MemberId: props.memberId,
        MovieToSubscribe: state.movieToSubscribe,
        SubscriptionDate: state.subscriptionDate,
      })
      // .then(function (response) {
      // console.log(response);
      // })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function handleChange(event) {
    const { name, value } = event.target;
    await setState({ ...state, [name]: value });
  }

  return (
    allMovies && (
      <div style={{ display: props.isVisible ? "block" : "none" }}>
        <form
          onSubmit={subscribeToNewMovie}
          style={{ border: "3px solid red", width: "20rem" }}
        >
          <br />
          <label>Add a new movie</label>
          <br />
          <select name="movieToSubscribe" onChange={handleChange} required>
            <option value="">Select A Movie</option>
            {preparingListOfMoviesRepiter()}
          </select>{" "}
          <input
            type="date"
            name="subscriptionDate"
            onChange={handleChange}
            required
          />
          <br />
          <button type="submit">Subscribe</button>
          <br />
          <br />
        </form>
      </div>
    )
  );
}
