import React from "react";
import '../blocks/Overlay.css';
import PopupWithForm from './PopupWithForm';
import Button from "./Button";
import ImagePopup from "./ImagePopup";

function Overlay(props){
    
    
    const overlayRef = React.useRef(null)

    React.useEffect(()=>{
        if (!props.isOpen) return
        const closeByClick = (e) => {
            if (e.target.classList.contains('overlay')) props.closeAllOverlays()
        }
        const closeByKey = (e) => {
            if (e.key === 'Escape') props.closeAllOverlays()
        }
        window.addEventListener('keydown', closeByKey)
        overlayRef.current.addEventListener('mousedown', closeByClick)
        return () => {
            window.removeEventListener('keydown', closeByKey)
            overlayRef.current.removeEventListener('mousedown', closeByClick)
        }
    },[props.isOpen])

    
        return (
            <div className={props.isOpen ? "overlay overlay_opened" : "overlay"} ref={overlayRef}>
                {props.children}
            </div>
        )
}

export default Overlay