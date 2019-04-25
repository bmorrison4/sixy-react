import React, { Component } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { controlSocket } from "./socket";

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

  componentDidMount() {
    controlSocket.on("robot_command_has_hit_webserver", this.onMessage);
  }

  onMessage = data => {
    this.setState(messages => {
      const _messages = this.state.messages.push(data);
      return _messages;
    });
  };

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
        <div className="latest-activity-dropper">
          <i className="dropdown-arrow">
            {dropDown ? <FaAngleDown /> : <FaAngleUp />}
          </i>
        </div>
      </div>
    );
  }
}
