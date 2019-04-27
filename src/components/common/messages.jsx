import React, { Component } from "react";
import { chatSocket } from "./socket";

/**
 * Component that handles chat messages
 */
export default class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  /**
   * Tells the browser to scroll to the bottom of the chat div
   */
  scrollToBottom() {
    this.ul.scrollTop = this.ul.scrollHeight;
  }

  /**
   * Runs every time the component mounts
   */
  componentDidMount() {
    this.scrollToBottom();
    chatSocket.on("chat_message_with_name", this.onMessage);
    chatSocket.on("user_blocked", this.onBlockedUser);
    chatSocket.on("user_timeout", this.onUserTimeout);
    chatSocket.on("message_removed", this.onMessageRemoved);
  }

  /**
   * Runs every time the ocmponent updates
   * @param {*} prevProps
   * @param {*} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }

  /**
   * Triggered when socket gets a "user_blocked" event
   * @param {*} data socket data
   */
  onBlockedUser = data => {
    console.log("user_blocked", data);
  };

  /**
   *  Triggered when socket gets a "user_timed_out" event
   *  @param {*} data socket data
   */
  onUserTimeout = data => {
    console.log("user_timed_out", data);
  };
  /**
   * Triggered when socket gets a "message_removed" event
   * @param {*} data socket data
   */
  onMessageRemoved = data => {
    console.log("message_removed", data);
  };

  /**
   * Update the state when a message is recieved
   * @param {*} data the message object
   */
  onMessage = data => {
    if (data.room === "jill") {
      // console.log(data);

      this.setState(messages => {
        const _messages = this.state.messages.push(data);
        return _messages;
      });
    }
  };

  /**
   * Render the messages in a list
   */
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
