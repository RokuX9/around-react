import React from "react";
import './Form.css'
import Button from "../button/Button";
import Input from '../input/Input';

function Form (props){
    const validtionObject = props.form.inputs.reduce((prev, curr) => {
        return {...prev, [curr.name]: true}
    },{})
    const [formValidation, setFormValidation] = React.useState(validtionObject)
    const [disableButton, setDisableButton] = React.useState(true)
    const switchInputType = (input) => {
        const setFormState = (e) => {
            props.form.setFormState({...props.form.formState, [input.name]: e.target.value})
        }
        
        switch (input.type) {
            case 'text':
                return <Input type="text" isOpen={props.form.isOpen} formValidation={formValidation} formState={props.form.formState} placeholder={input.placeHolder} defaultValue={props.form.hasInitialState ? props.form.formState[input.name] : ""} name={input.name} minLength={input.minLength} maxLength={input.maxLength} onChange={setFormState} className="form__input" id={input.id} functions={{setFormValidation, setFormState: props.form.setFormState }} required />
            case 'url':
                return <Input type="url" isOpen={props.form.isOpen} formValidation={formValidation} formState={props.form.formState} placeholder={input.placeHolder} name={input.name} onChange={setFormState} className="form__input" id={input.id} functions={{setFormValidation, setFormState: props.form.setFormState }} required/>
            case 'hidden':
                return <Input type="hidden" isOpen={props.form.isOpen} formValidation={formValidation} formState={props.form.formState} name={input.name} className="form__input" id={input.id} functions={{setFormValidation, setFormState: props.form.setFormState }} required/>;
        }
    }

    const formRef = React.useRef(null)

    React.useEffect(() => {
        if (props.form.isOpen) {
            Object.values(formValidation).every(element => element === true) ? setDisableButton(false) : setDisableButton(true)
            return
        }
        formRef.current.reset()
    },[props.form.isOpen])

    React.useEffect(() => {
        Object.values(formValidation).every(element => element === true) ? setDisableButton(false) : setDisableButton(true)
    }, [formValidation])

    const submit = (e) => {
        disableButton ? e.preventDefualt() : props.form.submit(e)
    }

        return (
            <form name="dash-form" ref={formRef} className="form" onSubmit={submit}>
                <h2 className="form__title">{props.form.header}</h2>
                <fieldset className="form__inputs">
                    {props.form.inputs.map((input, i) => {
                        return (
                        <div className="form__row" key={input.name + "-" + i}>
                            {switchInputType(input)}
                        </div>
                        )
                    })}
                </fieldset>
                <Button type="submit" disabled={disableButton} className="form__button form__button_type_save button">{props.form.buttonText}</Button>
            </form>
        )
    
}

export default Form