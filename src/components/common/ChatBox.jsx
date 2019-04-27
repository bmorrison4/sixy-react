import React, { Component } from "react";
import Messages from "./messages";
import LatestActivity from "./LatestActivity";

/**
 * ChatBox container that renders latest activity and Messages components.
 */
export default class ChatBox extends Component {
  /**
   * Show the latest activity and messages list.
   */
  render() {
    return (
      <div className="chatBox">
        <LatestActivity />
        <Messages />
      </div>
    );
  }
}
