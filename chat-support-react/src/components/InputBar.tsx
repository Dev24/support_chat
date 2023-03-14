import React, { useState } from "react";

export const InputBar = ({
  send,
  endSession,
}: {
  send: (value: string) => void;
  endSession: () => void;
}) => {
  const [value, setValue] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send(value);
    setValue("");
  };

  return (
    <div className="inputBar">
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Message"
          value={value}
        />
        <div className="send">
          <button type="submit">Send</button>
        </div>
        <div className="send">
          <button type="button" onClick={() => endSession()}>
            End
          </button>
        </div>
      </form>
    </div>
  );
};
