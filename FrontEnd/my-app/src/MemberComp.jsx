import React, { useState, useEffect } from "react";
import axios from "axios";
import MoviesWatchedComponent from "./MoviesWatchedComponent";
import { withRouter } from "react-router-dom";

function MemberComp(props) {
  const [memberData, setMemberData] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);
  const [
    hasUpdateSubscriptionsPermission,
    setHasUpdateSubscriptionsPermission,
  ] = useState(false);
  const [
    hasDeleteSubscriptionsPermission,
    setHasDeleteSubscriptionsPermission,
  ] = useState(false);

  const routingToNewPage = (event, newPagePath) => {
    event.preventDefault();
    props.history.push(newPagePath);
  };

  useEffect(() => {
    const getUserPermissions = async () => {
      const permissions = JSON.parse(
        sessionStorage.getItem("userPermissions")
      );
      await setUserPermissions(permissions);

      await setHasUpdateSubscriptionsPermission(
        permissions.some((permission) => permission === "Update Subscriptions")
      );
      await setHasDeleteSubscriptionsPermission(
        permissions.some((permission) => permission === "Delete Subscriptions")
      );
    };

    const getMemberData = async () => {
      let memberData = (
        await axios.get(`http://localhost:8000/members/${props.memberId}`)
      ).data;
      await setMemberData(memberData);
    };

    getUserPermissions();
    getMemberData();
  }, []);

  const deleteSubscription = async (memberId) => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:8000/members/${memberId}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    memberData && (
      <div style={{ border: "3px solid black", width: "25rem" }}>
        <h4>{memberData.Name}</h4>
        <label>{`Email: ${memberData.Email}`}</label>
        <br />
        <label>{`City: ${memberData.City}`}</label>
        <br />
        <button
          disabled={hasUpdateSubscriptionsPermission ? false : true}
          onClick={(event) => {
            routingToNewPage(
              event,
              `${props.match.url}/EditMemberPage/${props.memberId}`
            );
          }}
        >
          Edit
        </button>
        {`  `}
        <button
          disabled={hasDeleteSubscriptionsPermission ? false : true}
          onClick={() => {
            deleteSubscription(props.memberId);
          }}
        >
          Delete
        </button>
        <br />
        <br />
        <MoviesWatchedComponent
          style={{
            border: "3px solid black",
            width: "22.5rem",
          }}
          memberId={props.memberId}
        />
      </div>
    )
  );
}

export default withRouter(MemberComp);
