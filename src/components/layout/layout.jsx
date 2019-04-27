import React, { Component } from "react";
//import io from "socket.io-client";
import ButtonPanel from "../common/ButtonPanel";
import ChatBox from "../common/ChatBox";
import "../../styles/common.css";

/**
 * 
 */
export default class Layout extends Component {

  /**
   * 
   */
  render() {
    return (
      <div className="content">
        <ButtonPanel />
        <ChatBox />
      </div>
    );
  }
}
