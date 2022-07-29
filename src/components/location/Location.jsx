import React from "react";
import './Location.css';
import Button from "../button/Button";
import Locations from "../locations/Locations";

function Location(props){
    const openImageOverlay = () => {
        props.functions.setImageOverlayData({name: props.data.name, link: props.data.link})
        props.functions.openImageOverlay()
    }
    const openDeleteLocationOverlay = () => {
        props.functions.setDeleteLocationData({id: props.data._id})
        props.functions.openDeleteLocationOverlay()
    }
    const isUserLiked = props.data.likes.find(user => {
        return user._id === props.user.id
    })

    const updateLocationState = (newState) => {
        const copyArray = props.locationsData
        copyArray.splice(props.locationIndex, 1, newState)
        props.functions.setLocationsData([...copyArray])
    }

    const handleLike = () => {
        if (!isUserLiked) {
            props.functions.like(props.data._id).then(res => updateLocationState(res)).catch(err => console.log(err))
        } else {
            props.functions.unlike(props.data._id).then(res => updateLocationState(res)).catch(err => console.log(err))
        }
    }

    return (
        <div className="locations__card location" key={props.data._id}>
            <Button type="button" className={props.isOwner ? "location__button location__button_type_delete" : "location__button location__button_type_delete button_hidden"} onClick={openDeleteLocationOverlay}></Button>
            <img src={props.data.link} alt={props.data.name + " image"} className="location__image" onClick={openImageOverlay} />
            <div className="location__row">
                <h2 className="location__title">{props.data.name}</h2>
                <div className="location__like-container">
                    <Button type="button" className={isUserLiked ? "location__button location__button_type_like location__button_type_like_active" : "location__button location__button_type_like"} onClick={handleLike}></Button>
                    <p className="location__like-number">{props.data.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Location