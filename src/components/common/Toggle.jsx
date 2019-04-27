import React, { Component } from "react";
import { sendMessage } from './socket'

/**
 * 
 */
export default class Toggle extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   * 
   */
  onButtonOn = () => {
    const name = this.props.name.toLowerCase();
    sendMessage(name + " on");    
  };

  /**
   * 
   */
  onButtonOff = () => {
    const name = this.props.name.toLowerCase();
    sendMessage(name + " off");
  };

  /**
   * 
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
