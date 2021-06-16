import "./chat.css";
import { useEffect, useState } from "react";
import axios from "axios";
import socketClient from "socket.io-client";
let socket = socketClient("localhost:3021");
const Chat = () => {
  const [userList, setUserList] = useState([]);
  const [message, setMessage] = useState("");
  const [dispMessage, setDispMessage] = useState([]);
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [partner, setPartner] = useState("");

  useEffect(() => {
    setUser(localStorage.getItem("user"));
    if (user != null) {
      axios.put("http://localhost:3021/user", { user: user }).then((res) => {
        console.log(res.data);
        setUserList(res.data);
      });
    }
  }, [user]);
  useEffect(() => {
    socket.on("disp", (msg) => {
      setDispMessage([...dispMessage, msg]);
    });
  }, [dispMessage]);
  useEffect(() => {
    socket.on("room", (roomid) => {
      setRoom(roomid.room);
      console.log(roomid.chathistory);
      // roomid.chathistory.forEach((element) => {
      //   console.log(element.message);
      //   setDispMessage([element.message]);
      // });

      setDispMessage(
        roomid.chathistory.map((value) => {
          return value.message;
        })
      );

      console.log(dispMessage);
      console.log(roomid.room);
      console.log(roomid, "..........room");
      localStorage.setItem("room", roomid.room);
    });
  }, [partner]);

  const joinChat = (chatpartner) => {
    setPartner(chatpartner);
    let testroom = localStorage.getItem("room");
    setRoom(chatpartner);
    console.log(testroom);

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
    if (chatpartner === testroom) {
      // setUser(room);
      alert("already chatting with same person");
    } else if (testroom === null || testroom === undefined) {
      socket.emit("joinroom", { user, chatpartner, date });
    } else {
      console.log(testroom);
      socket.emit("leaveroom", { room: testroom });
      socket.emit("joinroom", { user, chatpartner, date });
    }
  };
  const handleSendChat = () => {
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
    let chatroom = localStorage.getItem("room");
    console.log(chatroom);
    if (chatroom === null) {
      alert("join room first");
    } else {
      console.log(chatroom, "testing chat roomname on chat send");
      socket.emit("sendchat", { msg: user, chatroom, message, date });
    }
  };
  return (
    <>
      <div className="chatdiv">
        <div className="chatlist">
          <h2>USER LIST</h2>
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
          <h5>your chatting with {partner}</h5>
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
