import React from "react";
import "../blocks/Overlay.css";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Overlay(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const overlayRef = React.useRef(null);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  });

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
            defaultValue: name,
          },
          {
            type: "text",
            placeHolder: "About",
            name: "about",
            minLength: 2,
            maxLength: 200,
            id: "dash-subtitle",
            defaultValue: description,
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
