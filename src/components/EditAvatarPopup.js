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
        name="dashImage"
        header="Change profile picture"
        inputs={[
          {
            type: "url",
            placeHolder: "Avatar Image Link",
            name: "avatar",
            id: "dash-image",
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
