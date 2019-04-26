import React, { Component } from "react";
import Messages from "./messages";
import LatestActivity from "./LatestActivity";

class ChatBox extends Component { 

  render() {
    return (
      <div className="chatBox">
        <LatestActivity />
        <Messages />
      </div>
    );
  }
}

export default ChatBox;
