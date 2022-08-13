import React from "react";
import "../blocks/ImageOverlay.css";
import Button from "./Button";

function ImagePopup(props) {
  const overlayRef = React.useRef(null);

  return (
    <div
      className={props.isOpen ? "overlay overlay_opened" : "overlay"}
      ref={overlayRef}
      onClick={props.onClick}
    >
      <div
        className={
          props.isOpen
            ? "overlay__location overlay__element overlay__element_opened"
            : "overlay__location overlay__element"
        }
      >
        <img
          src={props.locationData.link}
          alt={props.locationData.name + " image"}
          className="overlay__image"
        />
        <p className="overlay__location-name">{props.locationData.name}</p>
        <Button
          type="button"
          className="overlay__button overlay__button_type_close button"
          onClick={props.closeAllOverlays}
        ></Button>
      </div>
    </div>
  );
}

export default ImagePopup;
