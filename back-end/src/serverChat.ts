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

  if(userId === adminId) {
    return true;
  }
  else {
    return false;
  }

}


io.on("connection", (socket) => {

  socket.on("register", async (user_id) => {

  //get user_id
  let userId: string = user_id;

  console.log("user_id: ", userId);

  let admin = await isAdmin(userId)

  console.log("admin: ", admin);

  if (admin) {
    // Thêm kết nối socket vào Map
    adminSocket = socket;
    socket.emit("isAdmin", true);
  }
  else {
    userSockets.set(userId, socket);
    socket.emit("isAdmin", false);
  }
    
  })



  socket.on("chatMessage", ({from, to, message}) => {
    if(socket === adminSocket) {
      // send message from admin to user
      const userSocket = userSockets.get(to);

      // if usersocket is in list usersockets.
      if(userSocket) {
        userSocket.emit("chatMessage", { from, message });
      }
    } else {
      // send message from user to admin
      if(adminSocket) {
        adminSocket.emit("chatMessage", {from, message});
      }
    }
  });

  socket.on("disconnect", (userId: string) => {
    if(socket === adminSocket) {
      adminSocket = null;
    }
    else {
      userSockets.delete(userId);
    }
  });
  
});


server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});

