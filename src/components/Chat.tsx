import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { default as socket } from "components/web-socket";

const Chat = () => {
  const [nickname, setNickname] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [chat, setChat] = useState<any[]>([]);
  const [usersOnline, setUsersOnline] = useState<any[]>([]);
  useEffect(() => {
    // Event listener for incoming chat messages
    socket.on("chat message", ({ nickname, msg }) => {
      setChat((prevChat) => [...prevChat, { nickname, msg }]);
    });
    // Notify the server of a new user connection
    socket.on("connect", () => {
      socket.emit("new-user");
    });
    // Update the list of online users
    socket.on("users-on", (list: any) => {
      setUsersOnline(list);
    });
    // Set the nickname when user data is received
    socket.on("user-data", (nick: any) => {
      if (!nickname) setNickname(nick[0]);
    });
    // Handle user disconnection
    socket.on("user-disconnected", (user: string) => {
      if (user !== null) {
        setChat((prevChat) => [...prevChat, `${user} left the chat 👋🏻`]);
      }
    });
    // Scroll to the bottom of the chat messages
    const objDiv = document.getElementById("msg");
    if (objDiv) objDiv.scrollTop = objDiv.scrollHeight;
    // Clean up the socket event listeners on component unmount
    return () => {
      socket.off();
    };
  }, [chat, nickname]);

  /**
   * Handles message submission.
   * Emits the message to the server and updates the chat history.
   * Displays a toast notification if the message is empty.
   * @param e - The form submit event
   */
  const submitMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (msg === "") {
      toast("Enter a message.", {
        duration: 4000,
        style: {},
        className: "",
        icon: "⚠️",
      });
    } else {
      socket.emit("chat message", { nickname, msg });
      setChat((prevChat) => [...prevChat, { nickname, msg }]);
      setMsg("");
    }
  };
  return (
    <div className="col-12 col-md-6">
      <div className="card-title">💬 Chat ({usersOnline.length || "0"})</div>
      <div className="card-box">
        <Toaster />
        <div className="messages-box" id="msg">
          {chat.map((el, index) => (
            <div key={index} className="message">
              {el.nickname != null ? (
                <div className="message-flex">
                  <div className="nickname">{el.nickname}:</div>
                  <div className="user-message">{el.msg}</div>
                </div>
              ) : (
                <p className="">{el}</p>
              )}
            </div>
          ))}
        </div>
        <form className="send-msg">
          <input
            type="text"
            className="pr-3 pr-md-3"
            name="message"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <button className="btn btn-primary" onClick={(e) => submitMsg(e)}>
            Start
          </button>
        </form>
      </div>
    </div>
  );
};
export default Chat;
