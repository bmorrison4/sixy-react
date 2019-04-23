import React, { Component } from "react";

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="slide-container">
        <p>{/*name*/}</p>
        <input type="range" className="slider"></input>
      </div>
    );
  }
}
