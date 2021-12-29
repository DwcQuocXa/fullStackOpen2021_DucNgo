import React from "react";

export default function Notification({ message }) {
  if (!message.content && !message.type) {
    return null;
  }
  return (
    <div>
      <p className={message.type === "error" ? "error" : "noti"}>
        {message.content}
      </p>
    </div>
  );
}
