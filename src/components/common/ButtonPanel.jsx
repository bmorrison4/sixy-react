import React, { Component } from "react";
import Slider from "./Slider";
import Toggle from "./Toggle";
import '../../styles/common.css'

export default class ButtonPanel extends Component {
  render() {
    return (
      <div className="button-panel" width="180">
        <Slider />
        <Slider />
        <Toggle />
        <Toggle />
        <button className="btn updateBtn">
          update
        </button>
        <button className="btn rebootBtn">
          reboot
        </button>
      </div>
    );
  }
}
