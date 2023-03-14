import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Home } from "./views/Home";
import { Register } from "./views/Register";
import { createThreadInfo, ThreadInfoProps } from "./model/ThreadInfoProps";

function App() {
  const [threadInfo, setThreadInfo] = useState<ThreadInfoProps>();

  const register = (threadInfo: ThreadInfoProps) => {
    console.log("Form submitted:", threadInfo.email);
    setThreadInfo(threadInfo);
  };

  return (
    <div className="App">
      {threadInfo ? (
        <Home threadInfo={threadInfo!} />
      ) : (
        <Register register={register} />
      )}
    </div>
  );

  const getContent = () => {
    //let myThreadInfo = createThreadInfo("abc@company.com", "hello", "Hi support, I'm interested in the latest news.");

    if (threadInfo) {
      return <Home threadInfo={threadInfo} />;
    }
    return <Register register={register} />;
  };
}

export default App;
