import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Done!</h1>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
