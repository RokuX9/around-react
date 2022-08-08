import React from "react";
import "../blocks/App.css";
import api from "../utils/api";
import Header from "./Header";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [cards, setCards] = React.useState([]);
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
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditProfileImagePopupOpen, setIsEditProfileImagePopupOpen] =
    React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const closeAllOverlays = () => {
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
        setCards(
          cards.filter((location) => location._id !== deleteLocationData.id)
        )
      )
      .then(closeAllOverlays)
      .catch(api.logError);
  };
  const submitAddLocation = (e) => {
    e.preventDefault();
    api
      .addNewCard(addLocationData)
      .then((res) => setCards([res, ...cards]))
      .then(closeAllOverlays)
      .catch(api.logError);
  };
  const updateLocationState = (newState, locationIndex) => {
    const copyArray = cards;
    if (cards[locationIndex]._id === newState._id) {
      copyArray.splice(locationIndex, 1, newState);
      setCards([...copyArray]);
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
        setCards(locations);
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
            locationsData={cards}
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
