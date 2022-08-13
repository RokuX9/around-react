import React from "react";
import "../blocks/Overlay.css";
import PopupWithForm from "./PopupWithForm";

function Overlay(props) {
  const overlayRef = React.useRef(null);

  return (
    <div
      className={props.isOpen ? "overlay overlay_opened" : "overlay"}
      ref={overlayRef}
      onClick={props.onClick}
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
            value: props.formState.name,
          },
          {
            type: "url",
            placeHolder: "Location image URL",
            name: "link",
            id: "location-url",
            value: props.formState.url,
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
