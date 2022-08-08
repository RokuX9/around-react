import React, { useState } from "react";
import "../blocks/App.css";
import Api from "../utils/api";
import { apiObject } from "../utils/constants";
import Header from "./Header";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";

const api = new Api(apiObject);
function App() {
  const [locationsData, setLocationsData] = React.useState([]);
  //const [isOpen, setIsOpen] = React.useState({mainOverlay: false, dashInfo: false, dashImage: false, deleteLocation: false, addLocation: false, imageOverlay: false });
  const [imageOverlayData, setImageOverlayData] = React.useState({
    name: "",
    link: "",
  });
  const [deleteLocationData, setDeleteLocationData] = React.useState({
    id: "",
  });
  const [addLocationData, setAddLocationData] = React.useState({
    name: "",
    link: "",
  });
  const [dashInfoData, setDashInfoData] = React.useState({
    name: "",
    about: "",
  });
  const [dashImageData, setDashImageData] = React.useState({ avatar: "" });
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
    id: "",
  });
  const [isMainPopupOpen, setIsMainPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditProfileImagePopupOpen, setIsEditProfileImagePopupOpen] =
    React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const closeAllOverlays = () => {
    //setIsOpen({...isOpen, mainOverlay: false, dashInfo: false, dashImage: false, deleteLocation: false, addLocation: false, imageOverlay: false })
    setIsMainPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditProfileImagePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
  };
  const openImageOverlay = () => {
    setIsImagePopupOpen(true);
  };
  const openDashInfoOverlay = () => {
    setDashInfoData({
      ...dashInfoData,
      name: currentUser.name,
      about: currentUser.about,
    });
    setIsEditProfilePopupOpen(true);
  };
  const openDashImageOverlay = () => {
    setIsEditProfileImagePopupOpen(true);
  };
  const openDeleteLocationOverlay = () => {
    setIsDeleteCardPopupOpen(true);
  };
  const openAddLocationOverlay = () => {
    setIsAddCardPopupOpen(true);
  };
  const submitDashInfo = (e) => {
    e.preventDefault();
    api
      .setUserInfo(dashInfoData)
      .then((res) => setCurrentUser(res))
      .then(closeAllOverlays)
      .catch(api.logError);
  };
  const submitDashImage = (e) => {
    e.preventDefault();
    api
      .changeProfilePicture(dashImageData)
      .then((res) => setCurrentUser(res))
      .then(closeAllOverlays)
      .catch(api.logError);
  };
  const submitDeleteLocation = (e) => {
    e.preventDefault();
    console.log(deleteLocationData);
    api
      .deleteCard(deleteLocationData)
      .then(
        setLocationsData(
          locationsData.filter(
            (location) => location._id !== deleteLocationData.id
          )
        )
      )
      .then(closeAllOverlays)
      .catch(api.logError);
  };
  const submitAddLocation = (e) => {
    e.preventDefault();
    api
      .addNewCard(addLocationData)
      .then((res) => setLocationsData([res, ...locationsData]))
      .then(closeAllOverlays)
      .catch(api.logError);
  };
  const updateLocationState = (newState, locationIndex) => {
    const copyArray = locationsData;
    if (locationsData[locationIndex]._id === newState._id) {
      copyArray.splice(locationIndex, 1, newState);
      setLocationsData([...copyArray]);
    }
  };
  const likeCard = (id, locationIndex) => {
    api
      .likeCard(id)
      .then((res) => updateLocationState(res, locationIndex))
      .catch((err) => console.log(err));
  };
  const unlikeCard = (id, locationIndex) => {
    api
      .unlikeCard(id)
      .then((res) => updateLocationState(res, locationIndex))
      .catch((err) => console.log(err));
  };

  const handleLikePress = (isLiked, id, index) => {
    if (!isLiked) {
      likeCard(id, index);
    } else {
      unlikeCard(id, index);
    }
  };

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([locations, info]) => {
        setCurrentUser({
          ...currentUser,
          name: info.name,
          about: info.about,
          avatar: info.avatar,
          id: info._id,
        });
        setLocationsData(locations);
      })
      .catch(api.logError);
  }, []);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />
          <Main
            setDashInfoData={setDashInfoData}
            openAddLocationOverlay={openAddLocationOverlay}
            openDashImageOverlay={openDashImageOverlay}
            openDashInfoOverlay={openDashInfoOverlay}
            handleLikePress={handleLikePress}
            openDeleteLocationOverlay={openDeleteLocationOverlay}
            setDeleteLocationData={setDeleteLocationData}
            setImageOverlayData={setImageOverlayData}
            openImageOverlay={openImageOverlay}
            locationsData={locationsData}
          ></Main>
          <Footer />
        </div>
        <ImagePopup
          isOpen={isImagePopupOpen}
          closeAllOverlays={closeAllOverlays}
          locationData={imageOverlayData}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          closeAllOverlays={closeAllOverlays}
          formState={dashInfoData}
          hasInitialState={true}
          setFormState={setDashInfoData}
          submit={submitDashInfo}
        />
        <EditAvatarPopup
          isOpen={isEditProfileImagePopupOpen}
          formState={dashImageData}
          hasInitialState={false}
          setFormState={setDashImageData}
          submit={submitDashImage}
          closeAllOverlays={closeAllOverlays}
        />
        <AddPlacePopup
          isOpen={isAddCardPopupOpen}
          formState={addLocationData}
          hasInitialState={false}
          setFormState={setAddLocationData}
          submit={submitAddLocation}
          closeAllOverlays={closeAllOverlays}
        />
        <DeletePlacePopup
          isOpen={isDeleteCardPopupOpen}
          formState={deleteLocationData}
          hasInitialState={false}
          setFormState={setDeleteLocationData}
          submit={submitDeleteLocation}
          closeAllOverlays={closeAllOverlays}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
