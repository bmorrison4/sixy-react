import React, { Component } from "react";

export default class Toggle extends Component {
  render() {
    return (
      <div className="toggle">
        <button className="btn onBtn">On</button>
        <button className="btn offBtn">Off</button>
      </div>
    );
  }
}
