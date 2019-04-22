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
    channel: "skeeter_mcbee"
  }
};

//const socket = io.connect(
//settings.settings[0].socket[0].server + ":" + settings.settings[0].socket[0].port
//);

function Slider(props) {
  return (
    <div className="slidecontainer">
      <p>{props.name}</p>
      <input
        type="range"
        className="slider"
        min={props.min}
        max={props.max}
        value={props.value}
        step={props.step}
        id={props.inputId}
      />
    </div>
  );
}

function Toggle(props) {
  return (
    <div id={props.divId}>
      <p>{props.name}</p>
      <label className="switch">
        <input type="checkbox" id="{inputId}" />
        <span className="slider_round" />
      </label>
    </div>
  );
}

class Chatbox extends React.Component {
  src = settings.chat.domain + settings.chat.channel;
  render() {
    return <iframe src={this.src} title="chatbox" height="800" />;
  }
}

class ButtonPanel extends React.Component {
  render() {
    return (
      <div className="ButtonPanel">
        <Slider
          min="0"
          max="100"
          value={this.props.value}
          step="5"
          inputId="volumeSlider"
          name="Volume"
        />
        <Slider
          min="-1.0"
          max="1.0"
          value="1"
          step="0.1"
          inputId="speedSlider"
          name="Speed"
        />
        <Toggle divId="tableMode" name="Table Mode" inputId="tableButton" />
        <Toggle divId="micEnable" name="Microphone" inputId="micButton" />
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
