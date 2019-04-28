import io from "socket.io-client";
import settings from "../../settings";

const chatSocketServer =
  settings.chat_socket.server + ":" + settings.chat_socket.port;
const controlSocketServer =
  settings.control_socket.server + ":" + settings.control_socket.port;

export const chatSocket = io.connect(chatSocketServer);
export const controlSocket = io.connect(controlSocketServer);

/**
 * Send a message to the socket server
 * @param {str} message the message to send
 */
export const sendMessage = message => {
  // console.log("Trying to send message", message);
  chatSocket.emit("chat_message", {
    message: "[" + settings.chat_socket.robotName + "] ." + message,
    robot_name: settings.chat_socket.robotName,
    robot_id: settings.chat_socket.robotID,
    room: settings.chat_socket.room,
    secret: settings.chat_socket.secret
  });
};
