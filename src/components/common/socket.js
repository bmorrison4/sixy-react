const io = require("socket.io-client");

const chatSocket = io.connect("wss://letsrobot.tv:8000");
const controlSocket = io.connect("wss://letsrobot.tv:3536");

/**
 * Send a message to the socket server
 * @param {str} message the message to send
 */
const sendMessage = message => {
  // console.log("Trying to send message", message);
  chatSocket.emit("chat_message", {
    message: "[sixy] ." + message,
    robot_name: "sixy",
    robot_id: "80459902",
    room: "jill",
    secret: "iknowyourelookingatthisthatsfine"
  });
};

/**
 * export the socket objects and functions
 */
module.exports = {
  sendMessage,
  chatSocket,
  controlSocket
};
