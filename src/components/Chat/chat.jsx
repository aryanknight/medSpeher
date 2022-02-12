import React, { useState, useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import Doc from './doc.png';
import queryString from "query-string";
import Message from "../Messages/messages";
import io from "socket.io-client";
import "./chat.css";

const END_POINT = "https://safe-tor-36719.herokuapp.com/";
//const END_POINT = "http://localhost:8080";
let socket = io(END_POINT);

const Chat = (props) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([<Message />]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const url = useLocation();

  useEffect(() => {
    const { name, room } = queryString.parse(url.search);
    setName(name);
    setRoom(room);
    socket.emit("join", { name, room });
    setMessages([
      <Message message={`Welcome ${name} to Room ${room}`} pos="left" />
    ]);
  }, [END_POINT, url.search]);

  function sendMessage(event) {
    event.preventDefault();
    if (message) {
      socket.emit("send", { name, message, room });
      setMessages((messages) => [
        ...messages,
        <Message message={message} pos="right" />
      ]);
      document.getElementsByTagName("INPUT")[0].value = "";
    }
    var x = document.getElementsByClassName("display-section")[0];
    x.scrollTop = x.scrollHeight + 100;
  }

  useEffect(() => {
    socket.on("message", ({ text }) => {
      setMessages((messages) => [
        ...messages,
        <Message message={text} pos="left" />
      ]);
      var x = document.getElementsByClassName("display-section")[0];
      x.scrollTop = x.scrollHeight;
    });

    socket.on("online-user", ({ name }) => {
      if (name) {
        setOnlineUsers([]);
        name.map((user) =>
          setOnlineUsers((users) => [...users, <li>{user}</li>])
        );
      }
    });
  }, []);

  return (
    <div className="chat-outer-container">
      <img className="doc-img" src={Doc}/>
      <div className="left-container">
        <div className="info-bar">{room}</div>
        <div className="display-section">{messages}</div>
        <div className="input-area">
          <input
            className="chat-input"
            placeholder="Write Message"
            // autofocus="true"
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(e) => (e.key == "Enter" ? sendMessage(e) : null)}
          />
          <button className="chat-button" onClick={(e) => sendMessage(e)}>
            <b>Send</b>
          </button>
        </div>
      </div>
      <div className="right-container">
        <div className="right-inner-container">
          <h1 style={{color:'#4169E1'}}>Online Users</h1>
          {onlineUsers}
        </div>
      </div>
    </div>
  );
};

export default Chat;
