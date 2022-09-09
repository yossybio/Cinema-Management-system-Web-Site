import { React, useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import AllMembersPage from "./AllMembersPage";
import AddMemberPage from "./AddMemberPage";
import EditMemberPage from "./EditMemberPage";

const SubscriptionsPage = (props) => {
  const [userPermissions, setUserPermissions] = useState([]);
  const [hasViewSubscriptionsPermission, setHasViewSubscriptionsPermission] =
    useState(false);
  const [
    hasCreateSubscriptionsPermission,
    setHasCreateSubscriptionsPermission,
  ] = useState(false);

  const routingToNewPage = (event, newPagePath) => {
    event.preventDefault();
    props.history.push(newPagePath);
  };

  useEffect(() => {
    const getUserPermissions = async () => {
      const permissions = JSON.parse(
        await sessionStorage.getItem("userPermissions")
      );
      await setUserPermissions(permissions);

      await setHasViewSubscriptionsPermission(
        permissions.some((permission) => permission === "View Subscriptions")
      );
      await setHasCreateSubscriptionsPermission(
        permissions.some((permission) => permission === "Create Subscriptions")
      );
    };

    getUserPermissions();
  }, []);

  return (
    <div>
      <h3>Subscriptions</h3>
      <button
        disabled={hasViewSubscriptionsPermission ? false : true}
        onClick={(event) => {
          routingToNewPage(event, `${props.match.url}/AllMembersPage`);
        }}
      >
        All Members
      </button>
      <button
        disabled={hasCreateSubscriptionsPermission ? false : true}
        onClick={(event) => {
          routingToNewPage(event, `${props.match.url}/AddMemberPage`);
        }}
      >
        Add Member
      </button>
      <br />
      <br />
      <Switch>
        <Route
          path={`${props.match.url}/AllMembersPage`}
          exact
          component={AllMembersPage}
        />
        <Route
          path={`${props.match.url}/AddMemberPage`}
          component={AddMemberPage}
        />
        <Route
          path={`${props.match.url}/AllMembersPage/EditMemberPage/:memberId`}
          component={EditMemberPage}
        />
      </Switch>
    </div>
  );
};

export default SubscriptionsPage;
