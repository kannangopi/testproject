import "./App.css";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Chat from "./components/Chat";
import { useHistory } from "react-router";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Register from "./components/Register";
function App() {
  const history = useHistory();
  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(localStorage.getItem("user"));
    console.log(user);
  }, []);
  const removeUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("room");
  };
  return (
    <div className="App">
      <div className="header">
        <Router>
          <Link to="/">HOME</Link>
          <Link to="/register">REGISTER</Link>
          {/* <Link to="/chat"></Link> */}
          {user ? (
            // <button className="logout" onClick={removeUser}>
            //   LOGOUT
            // </button>
            <Link to="/" className="logout" onClick={removeUser}>
              LOGOUT
            </Link>
          ) : null}

          <Switch>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/chat" component={Chat}></Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
