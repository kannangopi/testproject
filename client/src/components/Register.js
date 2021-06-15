import { useState } from "react";
import Axios from "axios";
import "./register.css";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = () => {
    if (username === "" || password === "") {
      alert("password and user name can not be empty");
    } else {
      console.log(username, password);
      Axios.post("http://localhost:3021/register", {
        username: username,
        password: password,
      }).then((res) => {
        console.log(res);
      });
    }
  };
  return (
    <>
      <div className="registerdiv">
        <div>
          <label htmlFor="">enter username</label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="">enter password</label>
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleRegister}>SUBMIT</button>
      </div>
    </>
  );
};
export default Register;
