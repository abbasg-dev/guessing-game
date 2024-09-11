import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserName } from "../store";
import { default as socket } from "components/web-socket";

const Join = () => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const userName = useSelector((state: any) => state.reduxStore.userName);

  //Handles the submission of the user's nickname.
  //Emits the nickname to the server and updates the Redux store with the nickname.
  const submitNickname = () => {
    socket.emit("user nickname", nickname);
    dispatch(setUserName(nickname));
  };

  useEffect(() => {
    // Enable the button if the nickname length is 3 or more characters
    setIsButtonDisabled(nickname.length < 3);
  }, [nickname]);

  return (
    <div className={`card-box join-box ${userName ? "d-none" : ""}`}>
      <div className="join-title">Welcome</div>
      <form>
        <div className="join-hint">Please Insert Your Name</div>
        <input
          type="text"
          onChange={(e) => setNickname(e.target.value)}
          value={nickname}
          className=""
          placeholder=""
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            submitNickname();
          }}
          type="button"
          disabled={isButtonDisabled}
        >
          Accept
        </button>
      </form>
    </div>
  );
};
export default Join;
