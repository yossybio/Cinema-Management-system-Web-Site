import { React, useEffect, useState } from "react";
import axios from "axios";
import SubscribeNewMovieComponent from "./SubscribeNewMovieComponent";
import { Link, withRouter } from "react-router-dom";

function MoviesWatchedComponent(props) {
  let [currentSubscription, setCurrentSubscription] = useState([]);
  let [itemsRepiter, setItemsRepiter] = useState([]);
  let [subscriptionWatchedMovies, setSubscriptionWatchedMovies] = useState([]);
  let [addNewMovieComponentVisability, setAddNewMovieComponentVisability] =
    useState(false);

  const fetchMovieName = async (movieId) => {
    const resp = await axios.get(`http://localhost:8000/movies/${movieId}`);
    const data = resp.data;
    const movieName = data.Name;

    return movieName;
  };

  useEffect(() => {
    const fetchCurrentSubscription = async () => {
      const subscriptionData = (
        await axios.get(`http://localhost:8000/subscriptions/${props.memberId}`)
      ).data;
      await setCurrentSubscription(subscriptionData);
    };

    fetchCurrentSubscription();
  }, []);

  useEffect(() => {
    const producingUnorderedListItems = async () => {
      if (!(currentSubscription.length > 0)) return;
      let promisesArray = currentSubscription[0].Movies.map(async (movie) => {
        return {
          MovieId: movie.MovieId,
          MovieName: await fetchMovieName(movie.MovieId),
          MovieWatchedDate: new Date(movie.Date).toLocaleString("he-IL"),
        };
      });

      await Promise.all(promisesArray).then(async (watchedMovies) => {
        await setSubscriptionWatchedMovies(watchedMovies);
        let itemsForList = [];
        for (let index = 0; index < watchedMovies.length; index++) {
          if (watchedMovies[index] !== undefined) {
            itemsForList.push(
              <li key={`${watchedMovies[index].MovieId}`}>
                <Link
                  to={`${
                    props.match.url.split("/SubscriptionsPage")[0]
                  }/MoviesPage/AllMoviesPage/${watchedMovies[index].MovieId}`}
                >{`${watchedMovies[index].MovieName}`}</Link>
                {`, ${watchedMovies[index].MovieWatchedDate.split(",")[0]}`}
              </li>
            );
          }
        }

        await setItemsRepiter(itemsForList);
      });
    };
    producingUnorderedListItems();
  }, [currentSubscription]);

  return (
    <div style={props.style}>
      <p>
        <strong>Movies Watched :</strong>
      </p>
      <button
        onClick={async () => {
          await setAddNewMovieComponentVisability(
            !addNewMovieComponentVisability
          );
        }}
      >
        Subscribe to new movie
      </button>
      <SubscribeNewMovieComponent
        isVisible={addNewMovieComponentVisability}
        memberId={props.memberId}
        watchedMovies={subscriptionWatchedMovies}
      />
      <ul>{itemsRepiter}</ul>
    </div>
  );
}

export default withRouter(MoviesWatchedComponent);
