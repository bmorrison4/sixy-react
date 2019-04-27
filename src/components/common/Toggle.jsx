import React, { Component } from "react";
import { sendMessage } from './socket'

/**
 * Component that renders the toggle switches
 */
export default class Toggle extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   * Triggered when the button is pressed
   */
  onButtonOn = () => {
    const name = this.props.name.toLowerCase();
    sendMessage(name + " on");    
  };

  /**
   * Triggered when the button is released
   */
  onButtonOff = () => {
    const name = this.props.name.toLowerCase();
    sendMessage(name + " off");
  };

  /**
   * Render the toggle buttons
   * @returns Toggle buttons
   */
  render() {
    const { name } = this.props;
    return (
      <div className="toggle">
        <p>{name}</p>
        <button className="btn on-btn" onClick={() => this.onButtonOn()}>
          On
        </button>
        <button className="btn off-btn" onClick={() => this.onButtonOff()}>
          Off
        </button>
      </div>
    );
  }
}
