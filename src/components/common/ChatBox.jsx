import React, { Component } from "react";
//import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Messages from "./messages";

class ChatBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownChecked: false
    };
  }

  updateDropdown = () => {
    // console.log("Changing state", this.state.dropdownChecked);
    //this.setState({ dropdownChecked: !this.state.dropdownChecked });
    /*
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

    */
  };

  render() {
    //const { dropdownChecked } = this.state;
    return (
      <div className="chatBox">
        <Messages />
      </div>
    );
  }
}

export default ChatBox;
