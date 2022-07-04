import React from "react";
import { Switch, Route } from "react-router-dom";
import MoviesPage from "./MoviesPage";
import SubscriptionsPage from "./SubscriptionsPage";
import ManageUsersPage from "./ManageUsersPage";
import { useState, useEffect } from "react";

const MainPage = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("isAdmin") === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  const routingToNewPage = (event, newPagePath) => {
    event.preventDefault();
    props.history.push(newPagePath);
  };

  return (
    <div>
      <button
        onClick={(event) =>
          routingToNewPage(event, `${props.match.url}/MoviesPage`)
        }
      >
        Movies
      </button>{" "}
      <button
        onClick={(event) =>
          routingToNewPage(event, `${props.match.url}/SubscriptionsPage`)
        }
      >
        Subscriptions
      </button>{" "}
      <button
        style={isAdmin ? { display: "inline-block" } : { display: "none" }}
        onClick={(event) =>
          routingToNewPage(event, `${props.match.url}/ManageUsersPage`)
        }
      >
        Users Managment
      </button>{" "}
      <button
        onClick={async () => {
          await props.history.push("/");
        }}
      >
        Log Out
      </button>
      <Switch>
        <Route path={`${props.match.url}/MoviesPage`} component={MoviesPage} />
        <Route
          path={`${props.match.url}/SubscriptionsPage`}
          component={SubscriptionsPage}
        />
        <Route
          path={`${props.match.url}/ManageUsersPage`}
          component={ManageUsersPage}
        />
      </Switch>
    </div>
  );
};

export default MainPage;
