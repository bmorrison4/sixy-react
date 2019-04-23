import React, { Component } from "react";
import Slider from "./Slider";
import Toggle from "./Toggle";
import '../../styles/common.css'
import { sendMessage } from './socket'

export default class ButtonPanel extends Component {

  reboot = () => {
    sendMessage("reboot");
  }

  render() {
    return (
      <div className="button-panel" width="180">
        <Slider min="0" max="100" name="Volume" value="80" step="5" />
        <Slider min="-1.0" max="1.0" name="Speed" value="1.0" step="0.1" />
        <Toggle name="Table" />
        <Toggle name="Mic" />
        <button className="btn reboot-btn" onClick={this.reboot}>reboot</button>
      </div>
    );
  }
}
