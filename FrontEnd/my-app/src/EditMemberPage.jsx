import { React, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

export default function EditMemberPage() {
  const { memberId } = useParams();
  let [state, setState] = useState(null);
  let history = useHistory();
  const [oldMemberName, setOldMemberName] = useState("");

  useEffect(() => {
    async function gettingMemberData() {
      const memberUrl = `http://localhost:8000/members/${memberId}`;
      const oldMemebrData = (await axios.get(memberUrl)).data;
      await setState({
        memberData: { ...oldMemebrData },
      });

      await setOldMemberName(oldMemebrData.Name);
    }

    gettingMemberData();
  }, []);

  const handleChange = async (event) => {
    let { name, value } = event.target;
    let newState = { ...state };
    newState.memberData[name] = value;

    await setState(newState);
  };

  const savingChanges = () => {
    axios({
      method: "put",
      url: `http://localhost:8000/members/${memberId}`,
      headers: {},
      data: {
        Name: state.memberData.Name,
        Email: state.memberData.Email,
        City: state.memberData.City,
      },
    });
  };

  return (
    state && (
      <div>
        <h4>Edit Movie : {`${oldMemberName}`}</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            savingChanges();
            history.goBack();
          }}
        >
          <label>Name : </label>
          <input
            type="text"
            name="Name"
            value={state.memberData.Name}
            onChange={handleChange}
          />
          <br />
          <label>Email : </label>
          <input
            type="email"
            name="Email"
            value={state.memberData.Email}
            onChange={handleChange}
          />
          <br />
          <label>City : </label>
          <input
            type="text"
            name="City"
            value={state.memberData.City}
            onChange={handleChange}
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
      </div>
    )
  );
}
