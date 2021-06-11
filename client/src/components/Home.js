import { useState } from "react";
import { useHistory } from "react-router";
import Axios from "axios";
import "./Home.css";
const Home = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    if (username === "" || password === "") {
      alert("password and user name can not be empty");
    } else {
      console.log(username, password);
      Axios.put("http://localhost:3020/login", {
        username: username,
        password: password,
      }).then((reslt) => {
        if (reslt.data === true) {
          console.log(reslt);
          history.push("/chat");
        }
      });
    }
  };
  return (
    <>
      <div className="logindiv">
        <label htmlFor="">user name</label>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="">enter password</label>
        <input type="text" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>SUBMIT</button>
      </div>
    </>
  );
};
export default Home;
