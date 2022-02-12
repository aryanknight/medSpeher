import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./messages.css";

const Message = ({ message, pos }) => {
  const place = pos + " message-block";
  return (
    <>
      <div className={place}>{message}</div>
    </>
  );
};

export default Message;
