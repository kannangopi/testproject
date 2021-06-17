import "./App.css";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Register from "./components/Register";
function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(localStorage.getItem("user"));
    console.log(user);
  }, [user]);
  const removeUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("room");
    setUser(null);
  };
  return (
    <div className="App">
      <div className="header">
        <Router>
          <Link to="/">HOME</Link>
          {user ? (
            <Link to="/" className="logout" onClick={removeUser}>
              LOGOUT
            </Link>
          ) : (
            <Link to="/register">REGISTER</Link>
          )}

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
