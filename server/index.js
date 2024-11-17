const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 8080;

const app = express();
app.use(
  cors({
    origin: ["localhost://*"],
  })
);

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (params) => {
  console.debug(params);
});

server.listen(port, () =>
  console.info(`Server listening on http://localhost:${port}`)
);
