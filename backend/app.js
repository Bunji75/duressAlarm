const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	console.log("A user connected:", socket.id);

	socket.on("duress-alert", (data) => {
		console.log("Duress alert received:", data);

		io.emit("receive-alert", data);
	});

	socket.on("disconnect", () => {
		console.log("User disconnected: ", socket.id);
	});
});

server.listen(3000, "0.0.0.0", () => {
	console.log("Server running on http://0.0.0.0:3000");
});
