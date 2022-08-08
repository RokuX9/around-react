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
          like={props.like}
          unlike={props.unlike}
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
