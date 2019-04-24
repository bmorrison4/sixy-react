import React, { Component } from "react";
import socket from "./socket";

export default class Messages extends Component {
  constructor(props) {
    super(props);

    this.scrollDown = this.scrollDown.bind(this);
  }

  scrollDown() {
    const { container } = this.refs;
    container.scrollTop = container.scrollHeight;
  }

  componentDidMount() {
    this.scrollDown();
    socket.on('chat_message_with_name', this.onMessage);
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollDown();
  }

  onMessage = data => {
    console.log(data);
  }

  render() {
    const { messages, user } = this.props;
    return (
      <div className="messages-container">
        <div className="thread">
          {messages.map(mes => {
            return (
              <div
                key={mes.id}
                className={`message=container ${mes.sender === user.name}`}
              >
                <p>{mes.sender}</p>
                <span>{mes.message}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
