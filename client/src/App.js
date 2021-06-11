import "./App.css";
import Home from "./components/Home";
import Chat from "./components/Chat";
import { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState("");
  return (
    <div className="App">
      <div className="header">
        <Router>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          {/* <Link to="/chat"></Link> */}

          <Switch>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/chat" component={Chat}></Route>
          </Switch>
        </Router>
        <div>{user === "" ? null : <button>Logout</button>}</div>
      </div>
    </div>
  );
}

export default App;
