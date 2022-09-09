import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function AddMemberPage() {
  let [state, setState] = useState({
    memberData: {
      Name: "",
      Email: "",
      City: "",
    },
  });
  let history = useHistory();

  const handleMemberChange = async (event) => {
    let { name, value } = event.target;
    let newState = { ...state };
    newState.memberData[name] = value;

    await setState(newState);
  };

  const savingNewMember = () => {
    axios({
      method: "post",
      url: `http://localhost:8000/members`,
      headers: {},
      data: {
        Name: state.memberData.Name,
        Email: state.memberData.Email,
        City: state.memberData.City,
      },
    });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          savingNewMember();
          history.goBack();
        }}
      >
        <label>Name : </label>
        <input type="text" name="Name" onChange={handleMemberChange} />
        <br />
        <label>Email : </label>
        <input type="email" name="Email" onChange={handleMemberChange} />
        <br />
        <label>City : </label>
        <input type="text" name="City" onChange={handleMemberChange} />
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
