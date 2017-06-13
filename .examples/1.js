import React from "react";
import ReactDOM from "react-dom";

function wrap(name, key) {
  return name + " (Ctrl+" + key + ")";
}
var names = ["Alice", "Bob", "John"];
var element = (
  <ul
    className="styledList"
    style={{fontSize: 16}}>
    {
      names.map(function(name, key) {
        return <li>{wrap(name, key)}</li>;
      })
    }
  </ul>
);

ReactDOM.render(
  element,
  document.getElementById("container")
);
