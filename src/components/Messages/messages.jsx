import React from "react";
import ReactEmoji from "react-emoji";
import "./messages.css";

const Message = ({ message, pos }) => {
  const place = pos + " message-block";
  return (
    <>
      <div className={place}>{ReactEmoji.emojify(message)}</div>
    </>
  );
};

export default Message;
