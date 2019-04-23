import React, { Component } from "react";
import settings from "../../settings.json";
import io from "socket.io-client";

class ChatBox extends Component {
  src = settings.chat.domain + settings.chat.channel;
  render() {
    return <div className="Chatbox" width="380" />;
  }

  createChatSocket = () => {
    let socket = io.connect("wss://letsroobt.tv:8000");

    socket.on("connect", function() {
      console.debug("chat connected");
    });

    socket.on('chat_message_with_name', function(e) {
      
    })
  };
}

export default ChatBox;
