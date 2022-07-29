import React from "react";
import './Button.css';

function Button(props){
    return (
        <button style={props.disabled ? {backgroundColor: 'transparent', border: '1px solid rgba(0,0,0,.2)', color: 'rgba(0,0,0,.2)'} : {}} className={(props.disabled ? "button_inactive " : "") + "button " + props.className} onClick={props.onClick}>{props.children}</button>
    )
}

export default Button