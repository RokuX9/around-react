import React from "react";
import "../blocks/Button.css";

function Button(props) {
  return (
    <button
      className={"button " + props.className}
      onClick={props.onClick}
      id={props.disabled ? "button_inactive" : ""}
    >
      {props.children}
    </button>
  );
}

export default Button;
