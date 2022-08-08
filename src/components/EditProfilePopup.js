import React from "react";
import "../blocks/Overlay.css";
import PopupWithForm from "./PopupWithForm";
import Button from "./Button";
import ImagePopup from "./ImagePopup";

function Overlay(props) {
  const overlayRef = React.useRef(null);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

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
        name="dashInfo"
        header="Edit Profile"
        inputs={[
          {
            type: "text",
            placeHolder: "Name",
            name: "name",
            minLength: 2,
            maxLength: 40,
            id: "dash-name",
          },
          {
            type: "text",
            placeHolder: "About",
            name: "about",
            minLength: 2,
            maxLength: 200,
            id: "dash-subtitle",
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
