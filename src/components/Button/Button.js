import React from "react";
import "./Button.css"


function Button(props) {
    const target = props.newtab ? "_blank" : "";

    return (
        <a className="button-container" href={props.href} target={target}>
            {props.name}
        </a>
    )
}

export default Button;