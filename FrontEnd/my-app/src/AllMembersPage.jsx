import React, { useEffect, useState } from "react";
import axios from "axios";
import MemberComp from "./MemberComp";
import MoviesWatchedComponent from "./MoviesWatchedComponent";
// import { getUsersPermissionsById } from "../../../BackEnd/CinemaWS/BLL/services/userPermissionsServices";

export default function AllMembersPage(props) {
  const [userPermissions, setUserPermissions] = useState([]);
  const [hasViewPermission, setHasViewPermission] = useState(false);
  const [hasEditPermission, setHasEditPermission] = useState(false);
  const [hasDeletePermission, setHasDeletePermission] = useState(false);
  const [allMembers, setAllMembers] = useState([]);

  useEffect(() => {
    const getUserPermissions = async () => {
      const permissions = JSON.parse(
        sessionStorage.getItem("userPermissions")
      );
      await setUserPermissions(permissions);

      await setHasViewPermission(
        permissions.some((permission) => permission === "View Subscriptions")
      );

      await setHasEditPermission(
        permissions.some((permission) => permission === "Update Subscriptions")
      );

      await setHasDeletePermission(
        permissions.some((permission) => permission === "Delete Subscriptions")
      );
    };

    const fetchAllMembers = async () => {
      let members = (await axios.get("http://localhost:8000/members")).data;
      await setAllMembers(members);
    };

    getUserPermissions();
    fetchAllMembers();
  }, [allMembers]);

  let subscriptionsRepeater = allMembers.map((member) => (
    <div key={member._id}>
      <br />
      <MemberComp memberId={member._id} />
    </div>
    // <MovieComponent
    //   key={movie._id}
    //   movieData={movie}
    //   hasEditPermission={hasEditPermission}
    //   hasDeletePermission={hasDeletePermission}
    // />
  ));
  return hasViewPermission && <div>{subscriptionsRepeater}</div>;
}
