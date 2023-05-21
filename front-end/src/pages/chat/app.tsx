import "./style.scss";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { register } from "numeral";
import { useAppSelector } from "app/hook";
import {  authState } from 'redux/auth/authSlice';


const socket = io("http://localhost:3001");

function App() {

  var isadmin: boolean = false; 
  const selector = useAppSelector(authState);
  const userId = selector.user.user_id
  const fullname = selector.user.fullname

  // console.log("fullname: ", fullname)

  socket.emit("register", userId);

  socket.on("isAdmin", (admin: boolean) => {
    isadmin = admin;
  console.log("Is admin: ", isadmin);
  })

  socket.on("chatMessage", ({fullname, message}) => {
    // console.log("from and message: ", message);
    var item = document.createElement('li');
    item.textContent = fullname + ": " + message;
    // console.log("Data: ", fullname, message);
    if(messagescontent) {
    messagescontent.appendChild(item);
    // window.scrollTo(0, document.body.scrollHeight);
    }

  })

  function sendMessage(){
    var msg = (document.getElementById("send-message") as HTMLInputElement).value;
    var recieverId = (document.getElementById("reciver-id") as HTMLInputElement).value;

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


// var messagescontent = document.getElementsByClassName('content-message') ;
var messagescontent = document.querySelector('.content-message');


// send message from admin to client.
function sendMessageToUser(recieverId: string, msg: string) {
  const data = {
    fullname: "Admin",
    to: recieverId,
    message: msg
  }

  if(msg != null) {
    var item = document.createElement('li');
    item.textContent = "The admin: " + msg;
    if(messagescontent) {
      messagescontent.appendChild(item);
      // window.scrollTo(0, document.body.scrollHeight);
    }

    socket.emit("chatMessage", data);
  }
}

function sendMessageToAdmin(msg: string) {
  const data = {
    fullname: fullname,
    to: "admin",
    message: msg
  }

  if(msg){
    var item = document.createElement('li');
    item.textContent = "Me: " + msg;
    if(messagescontent) {
      messagescontent.appendChild(item);
      // window.scrollTo(0, document.body.scrollHeight);
    }

    socket.emit("chatMessage", data);
  } 

}



  return (
    <div className="App">

      <input id="reciver-id" />reciver


      <input id="send-message" />
      <button onClick={sendMessage}> Send Message</button>
      <table className="content-message">
      <h1> Message:</h1>


      </table>
    </div>
  );
}

export default App;


