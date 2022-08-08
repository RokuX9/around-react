import React from 'react';
import Dash from './Dash';
import Locations from './Locations';

function Main(props){
    return (
        <main>
            <Dash setDashInfoData={props.setDashInfoData} openAddLocationOverlay={props.openAddLocationOverlay} openDashImageOverlay={props.openDashImageOverlay} openDashInfoOverlay={props.openDashInfoOverlay} infoData={props.infoData} />
            <Locations unlike={props.unlike} like={props.like} openDeleteLocationOverlay={props.openDeleteLocationOverlay} setDeleteLocationData={props.setDeleteLocationData} setImageOverlayData={props.setImageOverlayData} openImageOverlay={props.openImageOverlay} locationsData={props.locationsData} user={props.infoData}/>
        </main>
    )
}

export default Main