import React, { useEffect } from "react";
import { chunk } from "lodash";

const App = () => {
  useEffect(() => {
    console.log("hello app");
    console.log(chunk);
  }, []);

  return <div className="app-wrapper"></div>;
};

export default App;
