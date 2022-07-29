export default class Api {
    constructor(options){
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _logResult(res){
        console.log(res)
        return res
    }

    _checkResponseStatus(res){
        if (res.ok){
            return res.json()
        } else {
            return Promise.reject(`Error stauts : ${res.status}`)
        }
    }

    logError(err){
        console.log(err)
    }

    getInitialCards = () => {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        }).then(this._checkResponseStatus)
    }

    getUserInfo(){
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        }).then(this._checkResponseStatus)
    }

    setUserInfo(data){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers : this._headers,
            body: JSON.stringify(data)
        }).then(this._checkResponseStatus)
    }

    addNewCard(data){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(this._checkResponseStatus)
    }

    deleteCard({id}){
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers
        }).then(this._checkResponseStatus)
    }

    likeCard = (id) => {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: "PUT",
            headers: this._headers
        }).then(this._checkResponseStatus)
    }

    unlikeCard = (id) => {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: "DELETE",
            headers: this._headers
        }).then(this._checkResponseStatus)
    }

    changeProfilePicture(data){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(this._checkResponseStatus)
    }

}