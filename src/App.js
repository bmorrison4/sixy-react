// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import io from "socket.io-client";
// import fs from "fs";
// import ChatBox from "components/chatbox";

import React, { Component } from "react";
import Layout from "./components/layout/layout";
import "./App.css";
import "./styles/common.css";

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <Layout />
        </div>
      </div>
    );
  }
}

export default App;
