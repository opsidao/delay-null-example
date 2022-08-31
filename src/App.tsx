import React from "react";
import logo from "./logo.svg";
import "./App.css";

interface IProps {
  callback: (arg: number) => void;
}

function App({ callback }: IProps) {
  const runCallback = React.useCallback(() => {
    callback(0);

    // We need to have this second call to happen in the next event loop.
    setTimeout(() => callback(1), 0);
  }, [callback]);

  return <button onClick={runCallback} />;
}

export default App;
