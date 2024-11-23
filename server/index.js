const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const generateRandomString = require("./lib");

const SERVER_PORT = process.env.PORT || 4000;
const CORS_ORIGIN = ["http://localhost:3000", "http://localhost:4000"];

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: CORS_ORIGIN,
  })
);

let meetingRooms = {};
function getUniqueMeetID() {
  const id = generateRandomString(6);
  if (meetingRooms[id]) {
    getUniqueMeetID();
  }
  return id;
}

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: CORS_ORIGIN,
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  // io.on("")
  // console.info("Client connected",socket);

  socket.on("disconnect", () => {
    console.info("Client disconnected");
  });
});

// io.on("join-meet",args=>{})
// io.on("join-meet",args=>{})
// io.on("leave-meet",args=>{})

app.get("/", (req, res) => {
  res.status(200).send("Server is active").end();
});

app.post("/is-joining-code-valid", (req, res) => {
  let isJoiningCodeValid = meetingRooms[req.body?.joiningCode] ? true : false;
  res
    .status(200)
    .send({
      message: `Meet link is ${isJoiningCodeValid ? "valid" : "invalid"}`,
      data: { isJoiningCodeValid },
    })
    .end();
});

app.post("/new-meet", (req, res) => {
  const meetID = getUniqueMeetID();
  meetingRooms[meetID] = {
    id: meetID,
    users: [],
  };
  res
    .status(200)
    .send({
      message: "Successfully created new meet.",
      data: { meetID },
    })
    .end();
});

app.get("/ongoing-meets", (req, res) => {
  res.status(200).send({
    message: "",
    data: meetingRooms,
  });
});

httpServer.listen(SERVER_PORT, () =>
  console.info(`Server listening on http://localhost:${SERVER_PORT}`)
);
