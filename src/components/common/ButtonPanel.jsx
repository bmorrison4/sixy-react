import React, { Component } from "react";
import Slider from "./Slider";
import Toggle from "./Toggle";
import "../../styles/common.css";
import settings from "../../settings";
import { sendMessage } from "./socket";

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
  };

  /**
   * Renders input buttons from JSON, and a static "reboot" button.
   */
  render() {
    const inputs = settings.inputs;

    return (
      <div className="button-panel" width="180">
        {inputs.map(input => {
          switch (input.type) {
            case "slider":
              return (
                <>
                  <Slider
                    min={input.min}
                    max={input.max}
                    step={input.step}
                    value={input.value}
                    name={input.name}
                  />
                </>
              );
            case "toggle":
              return (
                <>
                  <Toggle name={input.name} />
                </>
              );
            default:
              return (<p className="error">Unknown Type: {input.type}</p>);
          }
        })}
        <button className="btn reboot-btn" onClick={this.reboot}>
          reboot
        </button>
      </div>
    );
  }
}
