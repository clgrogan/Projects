import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// Import pages
import AllLists from "./pages/AllLists";
import NotFound from "./pages/NotFound";
import List from "./pages/List";
import AddList from "./pages/AddList";
import UpdateList from "./pages/UpdateList";
import AddItem from "./pages/AddItem";

const options = {
  position: "bottom center",
  timeout: 5000,
  offset: "30px",
  transition: "scale"
};

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <p>HTML origin: App.jsx </p>
        </header>
      </div>
      <AlertProvider template={AlertTemplate} {...options}>
        <Router>
          {/* <NavBar /> */}
          <Switch>
            <Route exact path="/" component={AllLists}></Route>
            <Route exact path="/List/:ListId" component={List}></Route>
            <Route exact path="/AddList" component={AddList}></Route>
            <Route
              exact
              path="/UpdateList/:ListId"
              component={UpdateList}
            ></Route>
            <Route exact path="/AddItem/:ListId" component={AddItem}></Route>
            <Route path="*" component={NotFound}></Route>
          </Switch>
        </Router>
      </AlertProvider>
    </>
  );
}

export default App;
