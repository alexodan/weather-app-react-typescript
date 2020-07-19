import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Card from "./components/Card";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Done!</h1>
      <Card />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
