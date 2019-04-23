import React, { Component } from "react";
import { sendMessage } from "./socket";

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  componentWillMount() {}

  sendChatMessage = () => {
    const name = this.props.name.toLowerCase();
    sendMessage(name + " " + this.state.value);
  };

  updateSlider = evt => {
    this.setState({ value: evt.target.value });
  };

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
