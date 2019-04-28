import React, { Component } from "react";
import Slider from "./Slider";
import Toggle from "./Toggle";
import '../../styles/common.css'
import settings from '../../settings';
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
        <Slider 
          min={ settings.sliders.Volume.min } 
          max={ settings.sliders.Volume.max } 
          name={ settings.sliders.Volume.name }
          value={ settings.sliders.Volume.value }
          step={ settings.sliders.Volume.step }
        />
        <Slider 
          min={ settings.sliders.Speed.min }
          max={ settings.sliders.Speed.max }
          name={ settings.sliders.Speed.name }
          value={ settings.sliders.Speed.value }
          step={ settings.sliders.Speed.step }
        />
        <Toggle name={ settings.toggles.Table.name }/>
        <Toggle name={ settings.toggles.Mic.name } />
        <button className="btn reboot-btn" onClick={this.reboot}>reboot</button>
      </div>
    );
  }
}
