import React from "react";
import "../blocks/Location.css";
import Button from "./Button";

function Card(props) {
  const openImageOverlay = () => {
    props.setImageOverlayData({ name: props.data.name, link: props.data.link });
    props.openImageOverlay();
  };
  const openDeleteLocationOverlay = () => {
    props.setDeleteLocationData({ id: props.data._id });
    props.openDeleteLocationOverlay();
  };
  const isUserLiked = props.data.likes.find((user) => {
    return user._id === props.user.id;
  });

  const handleLike = () => {
    if (!isUserLiked) {
      props.like(props.data._id, props.locationIndex);
    } else {
      props.unlike(props.data._id, props.locationIndex);
    }
  };

  return (
    <div className="locations__card location" key={props.data._id}>
      <Button
        type="button"
        className={
          props.isOwner
            ? "location__button location__button_type_delete"
            : "location__button location__button_type_delete button_hidden"
        }
        onClick={openDeleteLocationOverlay}
      ></Button>
      <img
        src={props.data.link}
        alt={props.data.name + " image"}
        className="location__image"
        onClick={openImageOverlay}
      />
      <div className="location__row">
        <h2 className="location__title">{props.data.name}</h2>
        <div className="location__like-container">
          <Button
            type="button"
            className={
              isUserLiked
                ? "location__button location__button_type_like location__button_type_like_active"
                : "location__button location__button_type_like"
            }
            onClick={handleLike}
          ></Button>
          <p className="location__like-number">{props.data.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
