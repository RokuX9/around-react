import React from "react";
import "../blocks/ImageOverlay.css";
import Button from "./Button";

function ImagePopup(props) {
  const overlayRef = React.useRef(null);

  React.useEffect(() => {
    if (!props.isOpen) return;
    const closeByClick = (e) => {
      if (e.target.classList.contains("overlay")) props.closeAllOverlays();
    };
    const closeByKey = (e) => {
      if (e.key === "Escape") props.closeAllOverlays();
    };
    window.addEventListener("keydown", closeByKey);
    overlayRef.current.addEventListener("mousedown", closeByClick);
    return () => {
      window.removeEventListener("keydown", closeByKey);
      overlayRef.current.removeEventListener("mousedown", closeByClick);
    };
  }, [props.isOpen]);

  return (
    <div
      className={props.isOpen ? "overlay overlay_opened" : "overlay"}
      ref={overlayRef}
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
