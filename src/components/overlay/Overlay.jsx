import React from "react";
import './Overlay.css';
import Form from '../form/Form';
import Button from "../button/Button";

function Overlay(props){
    
    
    const overlayRef = React.useRef()

    React.useEffect(()=>{
        if (!props.isOpen) return
        const closeByClick = (e) => {
            if (e.target.classList.contains('overlay')) props.functions.closeAllOverlays()
        }
        const closeByKey = (e) => {
            if (e.key === 'Escape') props.functions.closeAllOverlays()
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
                {props.forms.map((form, i) => {
                return (<div className={form.isOpen ? "overlay__form overlay__element overlay__element_opened" : "overlay__form overlay__element"} key={'form-' + i}>
                    <Form form={form} functions={props.functions}/>
                    <Button type="button" className="overlay__button overlay__button_type_close button" onClick={props.functions.closeAllOverlays}></Button>
                    </div>)
                })}
                {props.children}
            </div>
        )
}

export default Overlay