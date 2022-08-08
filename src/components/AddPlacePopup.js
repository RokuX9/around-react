import React from "react";
import "../blocks/Overlay.css";
import PopupWithForm from "./PopupWithForm";

function Overlay(props) {
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
      <PopupWithForm
        name="addLocation"
        header="New Place"
        inputs={[
          {
            type: "text",
            placeHolder: "Location Name",
            name: "name",
            minLength: 1,
            maxLength: 30,
            id: "location-name",
          },
          {
            type: "url",
            placeHolder: "Location image URL",
            name: "link",
            id: "location-url",
          },
        ]}
        buttonText="Save"
        isOpen={props.isOpen}
        formState={props.formState}
        hasInitialState={props.hasInitialState}
        setFormState={props.setFormState}
        submit={props.submit}
        closeAllOverlays={props.closeAllOverlays}
      />
    </div>
  );
}

export default Overlay;
