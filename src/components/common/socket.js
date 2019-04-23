const io = require("socket.io-client");

const socket = io.connect("wss://letsrobot.tv:8000");

const sendMessage = message => {
  console.log("Trying to send message", message);
  socket.emit("chat_message", {
    message: "[sixy] ." + message,
    robot_name: "sixy",
    robot_id: "80459902",
    room: "jill",
    secret: "iknowyourelookingatthisthatsfine"
  });
};

module.exports = {
  sendMessage
};
