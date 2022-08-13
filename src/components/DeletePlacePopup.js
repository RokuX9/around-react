import React from "react";
import "../blocks/Overlay.css";
import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup(props) {
  const overlayRef = React.useRef(null);

  return (
    <div
      className={props.isOpen ? "overlay overlay_opened" : "overlay"}
      ref={overlayRef}
      onClick={props.onClick}
    >
      <PopupWithForm
        name="deleteLocation"
        header="Are you sure?"
        inputs={[
          {
            type: "hidden",
            name: "id",
            id: "location-id",
            value: props.formState.id,
          },
        ]}
        buttonText="Yes"
        isOpen={props.isOpen}
        formState={props.formState}
        initialState={props.initialState}
        setFormState={props.setFormState}
        submit={props.submit}
        closeAllOverlays={props.closeAllOverlays}
      />
    </div>
  );
}

export default DeletePlacePopup;
