import "./chat.css";
import { useEffect, useState } from "react";
import axios from "axios";
import socketClient from "socket.io-client";
let socket = socketClient("localhost:3020");
const Chat = () => {
  const [userList, setUserList] = useState([]);
  const [message, setMessage] = useState("");
  const [dispMessage, setDispMessage] = useState([]);
  const [user, setUser] = useState("");
  useEffect(() => {
    axios.get("http://localhost:3020/user").then((res) => {
      console.log(res.data);
      setUserList(res.data);
    });
    socket.on("disp", (msg) => {
      console.log(msg);
      setDispMessage([...dispMessage, msg]);
    });
    console.log("............", dispMessage);
  }, []);
  const handleChat = (room) => {
    console.log(room);
    setUser(room);

    socket.emit("joinroom", room);
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
                      <button onClick={() => handleChat(value.username)}>
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
