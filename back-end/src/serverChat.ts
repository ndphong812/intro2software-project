import express from "express";
import http = require("http");
import { Server } from "socket.io";
import cors from "cors";
import { Socket } from "socket.io";
import path from 'path';
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let adminSocket: Socket | null = null;
const userSockets = new Map<string, Socket>();

var isAdmin = async (userId: string) => {

  let adminId = process.env.ID_ADMIN;

  // console.log("adminid: ", process.env.ID_ADMIN);

  if (userId === adminId) {
    return true;
  }
  else {
    return false;
  }

}


io.on("connection", (socket) => {
  let userId: string | null = null;

  socket.on("register", async (user_id: string) => {

    //get user_id
    userId = user_id;

    console.log("user_id: ", userId);

    let admin = await isAdmin(userId)

    if (admin) {
      // Thêm kết nối socket vào Map
      if (adminSocket === null) {
        adminSocket = socket;
        // socket.emit("isAdmin", true);
      }
    }
    else {
      if (!userSockets.has(userId)) {
        // console.log("condition: ", !userSockets.has(userId))
        userSockets.set(userId, socket);
        socket.emit("isAdmin", false);
      }

    }

  })



  socket.on("chatMessage", ({ fullname,from, to, message }) => {
    console.log("message", message)
    if (socket === adminSocket) {
      const userSocket = userSockets.get(to);
      console.log("user online: ", userSocket)

      console.log("message1", message)

      userSocket?.emit("chatMessage", { fullname, message });
  
    } else {
      // send message from user to admin
      console.log("message11: ", message);

        // console.log(adminSocket)
        console.log("message1: ", message);
        adminSocket?.emit("chatMessage", {from, fullname, message });

    }
  });

  socket.on("disconnect", () => {
    // if (socket === adminSocket) {
    //   adminSocket = null;
    // }
    // else {
    //   if (userId !== null)
    //     userSockets.delete(userId);
    // }
  });

});


server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

