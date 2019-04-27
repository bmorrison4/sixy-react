import React, { Component } from "react";
import Slider from "./Slider";
import Toggle from "./Toggle";
import '../../styles/common.css'
import { sendMessage } from './socket'

/**
 * Container for Slider and Toggle components
 */
export default class ButtonPanel extends Component {

  /**
   * calls the sendMessage function with the "reboot" message to signal the
   * robot to reboot.
   */
  reboot = () => {
    sendMessage("reboot");
  }

  /**
   * Renders 2 sliders, 2 toggles, and the reboot button.
   * Slider 1: Volume, 0-100 @ 5, default 80
   * Slider 2: Speed, -1-1 @ 0.1 default 1
   * Toggle 1: Table
   * Toggle 2: Mic
   */
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
