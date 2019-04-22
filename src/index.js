import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import io from "socket.io-client";

// const settingsJSON =
//   '[{"settings":[{"chat":[{"domain":"https://www.letsrobot.tv/chat/",' +
//   '"channel":"skeeter_mcbee"}],"socket":[{"server":"wss://letsrobot.tv",' +
//   '"port":"8000"}]}]}]';

const settings = {
  chat: {
    domain: "https://www.letsrobot.tv/chat/",
    channel: "jill"
  },
  sliders: {
    volume: {
      min: "0",
      max: "100",
      step: "5",
      value: "80"
    },
    speed: {
      min: "-1.0",
      max: "1.0",
      step: "0.1",
      value: "1.0"
    }
  },
  checkboxes: {
    table: {
      checked: "false"
    },
    mic: {
      checked: "true"
    }
  },
  socket: {
    server: "wss://letsrobot.tv",
    port: "8000",
    robotName: "sixy",
    robotID: "80459902",
  }
};

//const socket = io.connect(
//settings.settings[0].socket[0].server + ":" + settings.settings[0].socket[0].port
//);

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
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
          value={this.state.value}
          step={this.props.step}
          id={this.props.inputId}
        />
      </div>
    );
  }
}

class Toggle extends React.Component {
  render() {
    return (
      <div id={this.props.divId}>
        <p>{this.props.name}</p>
        <label className="switch">
          <input type="checkbox" id="{props.inputId}" checked={this.props.checked} />
          <span className="slider_round" />
        </label>
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
        />
        <Slider
          name="Speed"
          min={this.speed.min}
          max={this.speed.max}
          step={this.speed.step}
        />
        <Toggle
          divId="tableMode"
          name="Table Mode"
          inputId="tableButton"
          checked={settings.checkboxes.table.checked}
        />
        <Toggle
          divId="micEnable"
          name="Microphone"
          inputId="micButton"
          checked={settings.checkboxes.mic.checked}
        />
        <button onclick="{/* update */}" id="updateButton">
          Update
        </button>
        <button onclick="{/* reboot */}" id="rebootButton">
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
