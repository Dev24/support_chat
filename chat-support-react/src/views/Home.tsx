import React, { useEffect, useState } from "react";
import { InputBar } from "../components/InputBar";
import { Thread } from "../components/Thread";
import io, { Socket } from "socket.io-client";
import { MessageProps, createMessage } from "../model/MessageProps";
import { ThreadInfoProps } from "../model/ThreadInfoProps";

export const Home = ({ threadInfo }: { threadInfo: ThreadInfoProps }) => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const send = (value: string) => {
    socket?.emit("message", createMessage(threadInfo.email, value));
  };

  const endSession = () => {
    socket?.emit("endSession", "");
    setTimeout(function () {
      window.location.replace("/");
    }, 5000);
  };

  useEffect(() => {
    if (!socket) {
      const newSocket = io("http://localhost:9000"); //"http://52.221.183.173");
      newSocket.auth = { email: threadInfo.email };
      setSocket(newSocket);
      newSocket.emit("initSession", threadInfo);
    }
  }, []);

  const messageListener = (message: MessageProps) => {
    setMessages([...messages, message]);
  };

  useEffect(() => {
    socket?.on("message", messageListener);
    return () => {
      socket?.off("message", messageListener);
    };
  }, [messageListener]);

  return (
    <div className="home container h-full px-6 py-4 bg-blue-100 ">
      <div className="chat border-blue-300 rounded-lg bg-white py-6 px-6">
        <div className="chatInfo">
          <div className="name font-bold">{threadInfo.email}</div>
          <div className="subject">- {threadInfo.subject}</div>
        </div>

        <Thread threadInfo={threadInfo} messages={messages} />
        <InputBar send={send} endSession={endSession} />
      </div>
    </div>
  );
};
