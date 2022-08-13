import React from "react";
import "../blocks/Overlay.css";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Overlay(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const overlayRef = React.useRef(null);

  React.useEffect(() => {
    props.setFormState({
      name: currentUser.name,
      about: currentUser.about,
    });
  }, [currentUser]);

  return (
    <div
      className={props.isOpen ? "overlay overlay_opened" : "overlay"}
      ref={overlayRef}
      onClick={props.onClick}
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
            value: props.formState.name,
          },
          {
            type: "text",
            placeHolder: "About",
            name: "about",
            minLength: 2,
            maxLength: 200,
            id: "dash-subtitle",
            value: props.formState.about,
          },
        ]}
        buttonText="Save"
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

export default Overlay;
