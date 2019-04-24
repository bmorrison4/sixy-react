import React, { Component } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownChecked: false
    };
  }

  updateDropdown = () => {
    console.log("Changing state", this.state.dropdownChecked);
    this.setState({ dropdownChecked: !this.state.dropdownChecked });
  };

  render() {
    const { dropdownChecked } = this.state;
    return (
      <div className="chatBox">
        <div className="latest-activity" checked={dropdownChecked}>
          <div className="title">
            <span className="chat-header">Latest Activity</span>
          </div>
          <ul className="latest-activity-messages" />
        </div>
        <div className="latest-activity-dropper" onClick={this.updateDropdown}>
          <i className="dropdown-arrow">
            {dropdownChecked ? <FaAngleDown /> : <FaAngleUp />}
          </i>
        </div>
        <ul id="message-list" className="chatBox-message-list">
          <li>
            <p className="message-header">skeeter_mcbee [sixy]</p>
            <span className="message-content">This is a message</span>
          </li>
          <li>
            <p className="message-header">jill [sixy]</p>
            <span className="message-content">indeed it is : ]</span>
          </li>
          <li>
            <p className="message-header">Gedyy [sixy]</p>
            <span className="message-content">
              i dinny ken wit yer talkin about
            </span>
          </li>
          <li>
            <p className="message-header">Admanta [sixy]</p>
            <span className="message-content">I want beer</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default ChatBox;
