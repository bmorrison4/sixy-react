import React, { Component } from "react";
import { sendMessage } from "./socket";

/**
 * Slider Component
 */
export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  /**
   * Runs when the component mounts
   */
  componentWillMount() {}

  /**
   * Sends a chat message
   */
  sendChatMessage = () => {
    const name = this.props.name.toLowerCase();
    sendMessage(name + " " + this.state.value);
  };

  /**
   * Updates the slider when the state is changed
   * @param {*} evt update event
   */
  updateSlider = evt => {
    this.setState({ value: evt.target.value });
  };

  /**
   * render the slider
   */
  render() {
    const { min, max, name, step } = this.props;
    const { value } = this.state;
    return (
      <div className="slide-container">
        <p>{name}</p>
        <input
          type="range"
          className="slider"
          min={min}
          max={max}
          defaultValue={value}
          id={name}
          step={step}
          onChange={evt => this.updateSlider(evt)}
          onMouseUp={this.sendChatMessage}
        />
      </div>
    );
  }
}
