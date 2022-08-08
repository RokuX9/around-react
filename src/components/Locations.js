import React from "react";
import "../blocks/Locations.css";
import Card from "./Card";

function Locations(props) {
  return (
    <div className="locations">
      {props.locationsData.map((location, i) => (
        <Card
          data={location}
          locationIndex={i}
          handleLikePress={props.handleLikePress}
          setImageOverlayData={props.setImageOverlayData}
          openImageOverlay={props.openImageOverlay}
          setDeleteLocationData={props.setDeleteLocationData}
          openDeleteLocationOverlay={props.openDeleteLocationOverlay}
          locationsData={props.locationsData}
          key={location._id}
        />
      ))}
    </div>
  );
}

export default Locations;
