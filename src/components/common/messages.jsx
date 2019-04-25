import React, { Component } from "react";
import { chatSocket } from "./socket";

export default class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.scrollDown = this.scrollDown.bind(this);
  }

  scrollDown() {
    const { container } = this.refs;
    container.scrollTop = container.scrollHeight;
  }

  componentDidMount() {
    this.scrollDown();
    chatSocket.on("chat_message_with_name", this.onMessage);
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollDown();
  }

  onMessage = data => {
    if (data.room === "jill") {
      // console.log(data);

      this.setState(messages => {
        const _messages = this.state.messages.push(data);
        if (_messages.length > 10) {
          _messages.shift();
        }
        return _messages;
      });
    }
  };

  render() {
    const { messages } = this.state;
    return (
      <div className="messages-container" ref='container'>
        <ul id="message-list" className="chatBox-message-list">

          {
            messages.map((mes) => {
              let fields = mes.message.split('] ');
              let robotName = fields[0];
              let message = fields[1];
              return (
                <li key={mes._id}>
                  <p className="message-header">{`${ mes.name } ${ robotName }]`}</p>
                  <span className="message-content">{ message }</span>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}
