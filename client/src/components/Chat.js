import "./chat.css";
import { useEffect, useState } from "react";
import axios from "axios";
import socketClient from "socket.io-client";
let socket;
const Chat = () => {
  const [userList, setUserList] = useState([]);
  const [message, setMessage] = useState("");
  const [dispMessage, setDispMessage] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    socket = socketClient("localhost:3020");
    setUser(localStorage.getItem("user"));
    axios.put("http://localhost:3020/user", { user: user }).then((res) => {
      // console.log(res.data);
      setUserList(res.data);
    });
  }, []);
  useEffect(() => {
    socket.on("disp", (msg) => {
      setDispMessage([...dispMessage, msg]);
    });
  }, [dispMessage]);
  const joinChat = (chatpartner) => {
    console.log(user + chatpartner);
    // setUser(room);
    let today = new Date();
    let date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();
    console.log(date);
    socket.emit("joinroom", { user, chatpartner, date });
  };
  const handleSendChat = () => {
    socket.emit("sendchat", { msg: user, message });
  };
  return (
    <>
      <div className="chatdiv">
        <div className="chatlist">
          <table>
            <tbody>
              {userList.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{value.username}</td>
                    <td>
                      <button onClick={() => joinChat(value.username)}>
                        chat
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ul></ul>
        </div>
        <div>
          <input
            type="text"
            className="chatbox"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button onClick={handleSendChat}>send</button>
        </div>
        <div className="displaymsg">
          <ul>
            {dispMessage.map((msg, index) => {
              return <li key={index}>{msg}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Chat;
