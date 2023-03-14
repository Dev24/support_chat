import React, { useEffect } from "react";

export const ScrollToBottom = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  useEffect(() =>
    document?.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    })
  );
  return <div id={id}>{children}</div>;
};
