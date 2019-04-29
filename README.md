# Sixy but in React.js
With a new framework comes new customization opportunities. Completely redesigned from the ground up. No more iFrames! The chat is rendered locally now, and has custom CSS. 

While originally strictly built for the robot Sixy, by putting all the options in a JSON file, I was able to make it so really anybody could use this on their own robot. 

## The JSON
`Settings.json` is split into 3 groups: 
* `inputs`, where the buttons and sliders are kept.
* `chat_socket` where the chat settings are kept.
* `control_socket` where the control settings are kept.

### Inputs
Right now, only two input types are supported - `slider` and `toggle`. 
* `slider` requires the following to work:
  * `name`: the name of the slider, this is also the preface for the command sent over the chat server, so make sure that it's spelled right. The case is unimportant.
  * `min`: The minimum acceptable value.
  * `max`: The maximum acceptable value.
  * `step`: The value between each acceptable value (i.e., `step: 5` = 5, 10, 15)
  * `value`: The starting value of the slider. Eventually, the goal is to have this updated every time the slider changes for persistence.
* `toggle` requires only one value:
  * `name` the name of the toggle. This is also the name of the command sent over the chat socket.

### Chat Socket
The chat socket is used to listen for and send chat messages between the site. 
* `server`: The domain of the server to listen to. You probably will never need to change this.
* `port`: The port of the server to listen to. You probably will never need to change this.
* `robotName`: The name of the robot. Case sensitive.
* `robotID`: The ID of the robot you want to talk to.
* `secret`: the socket secret key. You probably will never need to change this.
* `room`: The chatroom your robot is in. Probably either `global` or your username. Case sensitive.

### Control Socket
The `Latest Activity` window uses this socket to show movement events. You will probably never need to change any of these settings.
* `server`: The domain of the server to listen to.
* `port`: The port of the server to listen to.

## TODO
1. Add more button types
2. Ability to chat from the robot
3. Latest Activity Dropdown
4. resizability. Right now it's specifically sized for the screen on Sixy. 
