import React from "react";
import "./Dash.css";
import Button from "../button/Button";

function Dash(props) {
    

    return (
        <section className="dash">
            <div className="dash__profile-image" style={{backgroundImage: `url(${props.infoData.avatar})`}}><Button className="dash__button dash__button_type_edit-image button" onClick={props.functions.openDashImageOverlay} ></Button></div>
            <div className="dash__text">
                <div className="dash__line">
                    <h1 className="dash__user-title">{props.infoData.name}</h1>
                    <Button type="button" className="dash__button dash__button_type_edit-info button" onClick={props.functions.openDashInfoOverlay} ></Button>
                </div>
                <p className="dash__user-subtitle">{props.infoData.about}</p>
            </div>
            <Button type="button" className=" dash__button dash__button_type_add-place button" onClick={props.functions.openAddLocationOverlay}></Button>
        </section>
        )
}

export default Dash