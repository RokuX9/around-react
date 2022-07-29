import React from "react";
import './Locations.css';
import Location from '../location/Location'

function Locations(props) {   
    
    return (
        <div className="locations">
                {props.locationsData.length > 0 ? 
                props.locationsData.map((location, i) => {
                return (<Location data={location} locationIndex={i} locationsData={props.locationsData} user={props.user} isOwner={props.user.id === location.owner._id ? true : false} functions={props.functions} key={location._id}/>)
                }) : ""}
            </div>
        )
    
}

export default Locations