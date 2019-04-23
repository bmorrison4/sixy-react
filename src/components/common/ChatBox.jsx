import React, { Component } from "react";
import settings from "../../settings.json";

class ChatBox extends Component {
  src = settings.chat.domain + settings.chat.channel;
  render() {
    return <iframe src={ this.src } title="chat" />;
  }
}

export default ChatBox;
