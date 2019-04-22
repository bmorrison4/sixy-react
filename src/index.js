import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import io from "socket.io-client";
import fs from "fs";

let settings = require('./settings.json');

const socket = io.connect(settings.socket.server + ":" + settings.socket.port);

function onMessageSendEvent(message) {
  console.log("Got message", message);
  socket.emit("chat_message", {
    message: "[" + settings.socket.robotName + "] ." + message,
    robot_name: settings.socket.robotName,
    robot_id: settings.socket.robotID,
    room: settings.chat.channel,
    secret: settings.socket.secret
  });
}

function onRebootRequest() {
  console.log("Got reboot request");
  if (window.confirm("Are you sure you want to reboot?")) {
    onMessageSendEvent("reboot");
  }
}

function onEnableToggleSetting(identifier) {
  console.log("Got on state for", identifier);
  onMessageSendEvent(identifier + (identifier === "mic" ? " unmute" : " on"));
}

function onDisableToggleSetting(identifier) {
  console.log("Got off state for", identifier);
  onMessageSendEvent(identifier + (identifier === "mic" ? " mute" : " off"));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function onUpdateSliderSettings() {
  console.log("got update event");

  let volumeSlider = document.getElementById("volumeSlider");
  let speedSlider = document.getElementById("speedSlider");
  onMessageSendEvent("vol " + volumeSlider.value);
  await sleep(1000);
  onMessageSendEvent("speed " + speedSlider.value);

  settings.sliders.volume.value = volumeSlider;
  settings.sliders.speed.value = speedSlider;
  fs.writeFile("./settings.json", JSON.stringify(settings), (err) => {
    if (err) {
      console.error(err);
      return;
    };
    console.log("File has been created");
  })
}

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }
  render() {
    return (
      <div className="slidecontainer">
        <p>{this.props.name}</p>
        <input
          type="range"
          className="slider"
          min={this.props.min}
          max={this.props.max}
          defaultValue={this.state.value}
          step={this.props.step}
          id={this.props.inputId}
        />
      </div>
    );
  }
}

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked
    };
  }
  render() {
    return (
      <div id={this.props.divId}>
        <p>{this.props.name}</p>
        <button
          className="btn onButton"
          onClick={() => onEnableToggleSetting(this.props.identifier)}
        >
          On
        </button>
        <button
          className="btn offButton"
          onClick={() => onDisableToggleSetting(this.props.identifier)}
        >
          Off
        </button>
      </div>
    );
  }
}

class Chatbox extends React.Component {
  src = settings.chat.domain + settings.chat.channel;
  render() {
    return <iframe src={this.src} title="chatbox" height="800" />;
  }
}

class ButtonPanel extends React.Component {
  vol = settings.sliders.volume;
  speed = settings.sliders.speed;
  render() {
    return (
      <div className="ButtonPanel">
        <Slider
          name="Volume"
          min={this.vol.min}
          max={this.vol.max}
          step={this.vol.step}
          inputId="volumeSlider"
          value={this.vol.value}
        />
        <Slider
          name="Speed"
          min={this.speed.min}
          max={this.speed.max}
          step={this.speed.step}
          inputId="speedSlider"
          value={this.speed.value}
        />
        <Toggle
          divId="tableMode"
          name="Table Mode"
          inputId="tableButton"
          identifier="table"
        />
        <Toggle
          divId="micEnable"
          name="Microphone"
          inputId="micButton"
          identifier="mic"
        />
        <button
          className="btn"
          onClick={() => onUpdateSliderSettings()}
          id="updateButton"
        >
          Update
        </button>
        <button
          className="btn"
          onClick={() => onRebootRequest()}
          id="rebootButton"
        >
          Reboot
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <div className="content">
    <div className="controls">
      <ButtonPanel />
    </div>
    <Chatbox />
  </div>,
  document.getElementById("root")
);
