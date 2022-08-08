import React from "react";
import "../blocks/Dash.css";
import Button from "./Button";

function Dash(props) {
  return (
    <section className="dash">
      <div
        className="dash__profile-image"
        style={{ backgroundImage: `url(${props.userData.avatar})` }}
      >
        <Button
          className="dash__button dash__button_type_edit-image"
          onClick={props.openDashImageOverlay}
        ></Button>
      </div>
      <div className="dash__text">
        <div className="dash__line">
          <h1 className="dash__user-title">{props.userData.name}</h1>
          <Button
            type="button"
            className="dash__button dash__button_type_edit-info"
            onClick={props.openDashInfoOverlay}
          ></Button>
        </div>
        <p className="dash__user-subtitle">{props.userData.about}</p>
      </div>
      <Button
        type="button"
        className=" dash__button dash__button_type_add-place"
        onClick={props.openAddLocationOverlay}
      ></Button>
    </section>
  );
}

export default Dash;
