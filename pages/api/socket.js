import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  // Checking if the server already has a property named "io" (Socket.IO server instance)
  if (res.socket.server.io) {
    console.log("Server already running");
  } else {
    // If "io" doesn't exist, create a new Socket.IO server instance and pass the server instance from res.socket.server
    const io = new Server(res.socket.server);
    
    // Assign the newly created Socket.IO server instance to the "io" property of the server
    res.socket.server.io = io;

    // Set up an event listener for the "connection" event, which is triggered when a client connects to the server
    io.on("connection", (socket) => {
      console.log("Server is connected");
    });
  }

  // End the response process
  res.end();
};

export default SocketHandler;