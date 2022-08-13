import React from "react";
import Button from "./Button";
import "../blocks/Form.css";
import Input from "./Input";

function PopupWithForm(props) {
  const [formValidation, setFormValidation] = React.useState(
    props.inputs.reduce((prev, curr) => {
      return { ...prev, [curr.name]: true };
    }, {})
  );
  const [disableButton, setDisableButton] = React.useState(true);
  const renderInput = (input) => {
    const setFormState = (name, value) => {
      props.setFormState({ ...props.formState, [name]: value });
    };
    const setValidation = (name, isValid) => {
      setFormValidation({ ...formValidation, [name]: isValid });
    };
    switch (input.type) {
      case "text":
        return (
          <Input
            type="text"
            isOpen={props.isOpen}
            placeholder={input.placeHolder}
            name={input.name}
            minLength={input.minLength}
            maxLength={input.maxLength}
            onChange={setFormState}
            value={input.value}
            className="form__input"
            id={input.id}
            setValidation={setValidation}
            setFormState={setFormState}
            required
          />
        );
      case "url":
        return (
          <Input
            type="url"
            isOpen={props.isOpen}
            placeholder={input.placeHolder}
            name={input.name}
            onChange={setFormState}
            value={input.value}
            className="form__input"
            id={input.id}
            setValidation={setValidation}
            setFormState={setFormState}
            required
          />
        );
      case "hidden":
        return (
          <Input
            type="hidden"
            isOpen={props.isOpen}
            name={input.name}
            className="form__input"
            id={input.id}
            setValidation={setValidation}
            setFormState={setFormState}
            required
          />
        );
    }
  };

  const formRef = React.useRef(null);
  const setButtonDisabled = React.useCallback(() => {
    Object.values(formValidation).every((element) => element === true)
      ? setDisableButton(false)
      : setDisableButton(true);
  }, [props.isOpen, formValidation]);

  React.useEffect(() => {
    if (props.isOpen) {
      setButtonDisabled();
      return;
    }
    props.setFormState(props.initialState);
    formRef.current.reset();
  }, [props.isOpen]);

  React.useEffect(() => {
    setButtonDisabled();
  }, [formValidation]);

  const submit = (e) => {
    disableButton ? e.preventDefualt() : props.submit(e);
  };

  return (
    <div
      className={
        props.isOpen
          ? "overlay__form overlay__element overlay__element_opened"
          : "overlay__form overlay__element"
      }
    >
      <form name="dash-form" ref={formRef} className="form" onSubmit={submit}>
        <h2 className="form__title">{props.header}</h2>
        <fieldset className="form__inputs">
          {props.inputs.map((input, i) => {
            return (
              <div className="form__row" key={input.name + "-" + i}>
                {renderInput(input)}
              </div>
            );
          })}
        </fieldset>
        <Button
          type="submit"
          disabled={disableButton}
          className="form__button form__button_type_save button"
        >
          {props.buttonText}
        </Button>
      </form>
      <Button
        type="button"
        className="overlay__button overlay__button_type_close button"
        onClick={props.closeAllOverlays}
      ></Button>
    </div>
  );
}

export default PopupWithForm;
