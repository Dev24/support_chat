import React from "react";
import { MessageProps } from "../model/MessageProps";

export const Message = ({
  key,
  message,
  isOwner = false,
}: {
  key: string;
  message: MessageProps;
  isOwner?: boolean;
}) => {
  return (
    <div className={`message ${isOwner ? "owner" : ""}`}>
      <div className="messageInfoWrapperv hidden md:block">
        <div className="messageInfo">
          <div className="name font-bold">{message.email}</div>
          <span>{message.created.toString()}</span>
        </div>
      </div>
      <div className="messageInfoWrapperv block md:hidden">
        <div className="messageInfo">
          <div className="name font-bold">
            {message.email.substring(0, 5)}...
          </div>
        </div>
      </div>

      <div className="messageContent">
        <p>{message.content}</p>
      </div>
    </div>
  );
};
