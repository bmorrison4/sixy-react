import React, { Component } from "react";
// import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { controlSocket } from "./socket";

/**
 * Component that renders the latest control activity
 */
export default class LatestActivity extends Component {
  constructor(props) {
    super(props);

    controlSocket.on("connect", function() {
      controlSocket.emit("robot_id", "80459902");
    });

    this.state = {
      messages: [],
      dropDown: false
    };
  }

  /**
   * Runs once when the component first renders
   */
  componentDidMount() {
    controlSocket.on("robot_command_has_hit_webserver", this.onMessage);
  }

  /**
   * Update the component state when a new message is added
   * @param {*} data the latest message
   */
  onMessage = data => {
    let _messages = this.state.messages;
    _messages.push(data);
    if (_messages.length > 7) {
      _messages = _messages.splice(1);
    }

    this.setState({ messages: _messages });
  };

  /**
   * Render the latest activity messages
   */
  render() {
    const { messages, dropDown } = this.state;
    return (
      <div className="latest-activity" checked={dropDown}>
        <div className="latest-activity-content">
          <span>Latest activity</span>
          <ul>
            {messages.map((mes, index) => 
                <li key={index}>
                  <span className="latest-activity-content">
                    {`${mes.user} moved ${mes.robot_name} ${mes.command} ${
                      mes.key_position
                    }`}
                  </span>
                </li>
              )}
          </ul>
        </div>
       {/* <div className="latest-activity-dropper">
          <i className="dropdown-arrow">
            {dropDown ? <FaAngleDown /> : <FaAngleUp />}
          </i>
        </div> */}
      </div>
    );
  }
}
