// Import necessary modules
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const { join } = require("node:path");

let myClients = [];

// Name Clients to send them data

// Create an Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Attach Socket.IO to the HTTP server
const io = socketIO(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
  },
});

// // Serve static files from the public directory
// app.use(express.static("public"));

// Serve static files from the 'public' folder
app.use(express.static(join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// Assuming 'clients' is an array that stores objects with 'customId' and 'clientId'
var clients = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  let id = socket.id;

  myClients.push(id);

  console.log(myClients);

  socket.on("disconnect", function () {
    // Remove the disconnected client from the clients object

    delete myClients[id];
    removeItem(myClients, id);
    console.log("Updated client list: " + myClients);
  });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port http://0.0.0.0:${port}`);
});

function removeItem(array, itemToRemove) {
  const index = array.indexOf(itemToRemove);

  if (index !== -1) {
    array.splice(index, 1);
  }
}
