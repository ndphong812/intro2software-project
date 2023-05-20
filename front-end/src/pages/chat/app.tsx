import "./style.scss";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { register } from "numeral";

const socket = io("http://localhost:3001");

function App() {

  var isadmin: boolean = false; 
  var userId = "2kfvzy6qklf7r6k5f";

  socket.emit("register", userId);

  socket.on("isAdmin", (admin: boolean) => {
    isadmin = admin;
  console.log("Is admin: ", isadmin);
  })

  socket.on("chatMessage", ({from, message}) => {
    var item = document.createElement('p');
    item.textContent = from + ": " + message;
    messagescontent.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  })

  function sendMessage(){
    var msg = (document.getElementById("send-message") as HTMLInputElement).value;
    var recieverId = (document.getElementById("reciever-id") as HTMLInputElement).value;

    if(msg){
      if(isadmin) {
        sendMessageToUser(recieverId, msg);
      }

      else {
        sendMessageToAdmin(msg);
      }

      (document.getElementById("send-message") as HTMLInputElement).value = "";
    }
 }


var messagescontent = document.getElementById('content-message') as HTMLInputElement;

// send message from admin to client.
function sendMessageToUser(recieverId: string, msg: string) {
  const data = {
    from: "admin",
    to: recieverId,
    message: msg
  }

  if(msg) {
    var item = document.createElement('li');
    item.textContent = "Admin: " + msg;
    messagescontent.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);

    socket.emit("chatMessage", data);
  }


}

function sendMessageToAdmin(msg: string) {
  const data = {
    from: userId,
    to: "admin",
    message: msg
  }

  if(msg){
    var item = document.createElement('li');
    item.textContent = "Me: " + msg;
    messagescontent.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);

    socket.emit("chatMessage", data);
  }


}

  return (
    <div className="App">
      reciver
      <input id="reciever-id"/>
      <input id="send-message" />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      <table id="content-message"></table>
    </div>
  );
}

export default App;

