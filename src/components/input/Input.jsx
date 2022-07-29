import React from "react";
import './Input.css';

function Input(props){
    const inputRef = React.useRef(null)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [showError, setShowError] = React.useState(false)
    
    const handleInput = () => {
        props.functions.setFormState({...props.formState, [props.name]: inputRef.current.value})
        if (inputRef.current.validity.valid) {
            setShowError(false)
            setErrorMessage("")
            props.functions.setFormValidation({...props.formValidation, [props.name]: true})
        } else { 
            setShowError(true)
            setErrorMessage(inputRef.current.validationMessage)
            props.functions.setFormValidation({...props.formValidation, [props.name]: false}) 
    }
    }
    React.useEffect(() => {
        (inputRef.current.validity.valid || Boolean(props.defaultValue)) ? props.functions.setFormValidation({...props.formValidation, [props.name]: true}) : props.functions.setFormValidation({...props.formValidation, [props.name]: false}) 
        props.functions.setFormState({...props.formState, [props.name]: inputRef.current.value})
        console.log(props.formValidation)

        return(() => {
            setErrorMessage("")
            setShowError(false)
        })
    },[props.isOpen])

    
    return (
        <>
            <input type={props.type} ref={inputRef} placeholder={props.placeholder} defaultValue={props.defaultValue} name={props.name} minLength={props.minLength} maxLength={props.maxLength} onChange={handleInput} className={"input " + props.className + (showError ? " input_error" : "")} id={props.id} required />
            <span className={showError ? "input-text-error input-text-error_active" : "input-text-error" }>{errorMessage}</span>
        </>
    )
}

export default Input