const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

const userRouter = require("./routes/user");
const eventRouter = require("./routes/event");


const app = express();
const httpServer = http.Server(app);
const io = socketIO(httpServer);
const port = process.env.PORT || 8080;
const dbPath = "mongodb://coax-bootcamp-admin:CO888777ax@ds143262.mlab.com:43262/rn-bootcamp-09-2019";


// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Set up routes
app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);


// Start server
app.listen(port, () => {
  console.log("Server is listening");
});

// Start socket
io.on("connection", function() {
  console.log("a user is connected")
});

setInterval(() => {
  io.emit("test", { text: "Hi!" });
}, 5000);


// Connect to DB
mongoose.connect(dbPath, { useNewUrlParser: true }, (err) => {
  if (err) return console.log(err, "error");

  console.log("Connected successfully");
});

