import React, { Component } from "react";
import { chatSocket } from "./socket";

export default class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async scrollToBottom() {
    console.log("before delay", this.ul);
    this.delay(100);
    console.log("after deylay", this.ul);
    this.ul.scrollTop = this.ul.scrollHeight;
  }

  componentDidMount() {
    console.log("in mount", this.ul);
    this.scrollToBottom();
    chatSocket.on("chat_message_with_name", this.onMessage);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("in update", this.ul);
    this.scrollToBottom();
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
