import React from "react";
import "../blocks/ImageOverlay.css";
import Button from "./Button";

function ImagePopup(props) {
  return (
    <div
      className={
        props.overlayOpened
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
        onClick={props.functions.closeAllOverlays}
      ></Button>
    </div>
  );
}

export default ImagePopup;
