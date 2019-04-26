import React, { Component } from "react";
import { chatSocket } from "./socket";

export default class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  scrollToBottom() {
    this.ul.scrollTop = this.ul.scrollHeight;
  }

  componentDidMount() {
    this.scrollToBottom();
    chatSocket.on("chat_message_with_name", this.onMessage);
    chatSocket.on("user_blocked", this.onBlockedUser);
    chatSocket.on("user_timeout", this.onUserTimeout);
    chatSocket.on("message_removed", this.onMessageRemoved);
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }

  onBlockedUser = data => {
    console.log("user blocked", data)
  }

  onUserTimeout = data => {
    console.log("user timed out", data)
  }

  onMessageRemoved = data => {
    console.log("message removed", data);
  }

  onMessage = data => {
    if (data.room === "jill") {
      // console.log(data);

      this.setState(messages => {
        const _messages = this.state.messages.push(data);
        return _messages;
      });
    }
  };

  render() {
    const { messages } = this.state;
    return (
      <div className="messages-container" ref="container">
        <ul
          id="message-list"
          className="chatBox-message-list"
          ref={el => {
            this.ul = el;
          }}
        >
          {messages.map(mes => {
            let fields = mes.message.split("] ");
            let robotName = fields[0];
            let message = fields[1];
            return (
              <li key={mes._id}>
                <p className="message-header">{`${mes.name} ${robotName}]`}</p>
                <p className="message-content">{message}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
