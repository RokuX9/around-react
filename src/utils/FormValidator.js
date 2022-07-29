export class FormValidator{
    constructor(validationObject, formElement){
        this._formSelector = validationObject.formSelector;
        this._inputSelector = validationObject.inputSelector;
        this._submitButtonSelector = validationObject.submitButtonSelector;
        this._inactiveButtonClass = validationObject.inactiveButtonClass;
        this._inputErrorClass = validationObject.inputErrorClass;
        this._errorClass = validationObject.errorClass;
        this._formElement = formElement;

        this._inputList = Array.from(this._formElement.querySelectorAll(`.${this._inputSelector}`))
        this._buttonElement = this._formElement.querySelector(`.${this._submitButtonSelector}`)
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.add(this._inputErrorClass)
        errorElement.textContent = errorMessage
        errorElement.classList.add(this._errorClass)
    }

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.remove(this._inputErrorClass)
        errorElement.textContent = ""
        errorElement.classList.remove(this._errorClass)
    }

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage).bind(this)
        } else {
            this._hideInputError(inputElement).bind(this)
        }
    }

    _hasInvalidInput = (inputList) => {
        return inputList.some(inputElement => !inputElement.validity.valid)
    }

    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList).bind(this)){
            buttonElement.classList.add(this._inactiveButtonClass)
            buttonElement.setAttribute("disabled", true)
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass)
            buttonElement.removeAttribute("disabled")
        }
    }

    _setEventListeners = () => {

        this._toggleButtonState(this._inputList, this._buttonElement).bind(this)
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement).bind(this)
                this._toggleButtonState(this._inputList, this._buttonElement).bind(this)
            })
        })
    }
    enableValidation = () => {
        console.log(this)
            this._formElement.addEventListener("submit", (e) => {
                e.preventDefault()
            })  
            this._setEventListeners().bind(this)
    }
    clearValidation = () => {
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement)
        })
        this._toggleButtonState(this._inputList, this._buttonElement).bind(this)
    }

}

