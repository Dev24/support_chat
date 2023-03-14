import React from "react";
import { MessageProps } from "../model/MessageProps";
import { ThreadInfoProps } from "../model/ThreadInfoProps";
import { Message } from "./Message";
import { ScrollToBottom } from "./ScrollToBottom";

export const Thread = ({
  threadInfo,
  messages,
}: {
  threadInfo: ThreadInfoProps;
  messages: MessageProps[];
}) => (
  <div className="thread">
    <ScrollToBottom id="thread-messages">
      {messages.map((message, index) => (
        <Message
          key={`msg-${index}`}
          message={message}
          isOwner={threadInfo.email === message.email}
        />
      ))}
    </ScrollToBottom>
  </div>
);
