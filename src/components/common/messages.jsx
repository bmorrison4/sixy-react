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
    chatSocket.on("message_removed", this.onMessageRemoved);
    chatSocket.on("require_login", this.onRequireLogin);
    chatSocket.on("system_message", this.onSystemMessage);
  }

  /**
   * Runs every time the component updates
   * @param {*} prevProps
   * @param {*} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }

  /**
   *
   * {
   *  message_id: "5cc3e7d17940f3413caa2ec1"
   * }
   *
   * Triggered when socket gets a "message_removed" event
   * @param {*} data socket data
   */
  onMessageRemoved = data => {
    let _messages = this.state.messages;
    _messages = _messages.filter(message => {
      return message._id !== data.message_id;
    });

    if (_messages !== this.state.messages)
      this.setState({ messages: _messages });
  };

  /**
   * require_login event only sends an empty object. We have to make our own
   * with this function.
   *
   * If this function is called multiple times, a warning will appear in the
   * console because there will be multiple messages with the same key.
   */
  onRequireLogin = data => {
    const loginReqd = {
      _id: this.generateRandomNumber(),
      name: "Error",
      message: "[require_login] Login Required",
      room: "jill"
    };

    this.onMessage(loginReqd);
  };

  generateRandomNumber() {
    return Math.floor(Math.random() * 100000000000);
  }

  /**
   *   {
   *     room: "jill",
   *     message: "there must 1 second between your chat messages",
   *     name: "LetsBot",
   *     username_color: "#FF0000"
   *   }
   *
   * system_message event doesn't send the robot name in square brackets, which
   * our onMessage function doesn't like, so we made a new object and gave it an
   * ID too.
   *
   * If this function is called multiple times, a warning will apear in the
   * console because there will be multiple messages with the same key.
   */
  onSystemMessage = data => {
    const systemMessage = {
      _id: this.generateRandomNumber(),
      name: data.name,
      message: data.message,
      room: data.room
    };

    this.onMessage(systemMessage);
  };

  /**
   * Update the state when a message is recieved
   * @param {*} data the message object
   */
  onMessage = data => {
    if (data.room === "jill") {
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
            let robotName;
            let message;
            if (mes.message.includes("] ")) {
              let fields = mes.message.split("] ");
              robotName = fields[0] + "]";
              message = fields[1];
            } else {
              robotName = "";
              message = mes.message;
            }

            return (
              <li key={mes._id}>
                <p className="message-header">{`${mes.name} ${robotName}`}</p>
                <p className="message-content">{message}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
