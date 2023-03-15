import React, { useState } from "react";
import PropTypes from "prop-types";
import { createThreadInfo, ThreadInfoProps } from "../model/ThreadInfoProps";

interface Props {
  setSubject: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setInitMessage: React.Dispatch<React.SetStateAction<string>>;
  handleRegister: () => void;
}

export const Register = ({
  register,
}: {
  register: (threadInfo: ThreadInfoProps) => void;
}) => {
  const [subject, setSubject] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [initMessage, setInitMessage] = useState<string>("");

  const handleSubjectChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setSubject(e.target.value);
  };
  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };
  const handleInitMessageChange: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = (e) => {
    setInitMessage(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    register(createThreadInfo(email, subject, initMessage));
  };

  return (
    <div className="container h-full px-6 py-24 bg-blue-100 ">
      <div className="formWrapper border-blue-300 rounded-lg bg-white py-6 px-6">
        <div className="logo">Chat with Support Team</div>
        <div className="md:w-10/12 lg:ml-6 lg:w-10/12">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="subject"
                >
                  Subject
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  required
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={handleSubjectChange}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="email"
                >
                  Email
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  required
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="message"
                >
                  Message
                </label>
              </div>
              <div className="md:w-2/3">
                <textarea
                  required
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="message"
                  value={initMessage}
                  onChange={handleInitMessageChange}
                />
              </div>
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                <button
                  className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Chat
                </button>
              </div>
            </div>
          </form>

          {/* <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label htmlFor="subject">Subject</label>
                            <input required type="text" id="subject" value={subject} onChange={handleSubjectChange} />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label htmlFor="email">Email</label>
                            <input required type="email" id="email" value={email} onChange={handleEmailChange} />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label htmlFor="message">Message</label>
                            <input required type="textarea" id="message" value={initMessage} onChange={handleInitMessageChange} />
                        </div>
                    </div>
                    <button type="submit">Chat</button>
                </form> */}
        </div>
      </div>
    </div>
  );
};
