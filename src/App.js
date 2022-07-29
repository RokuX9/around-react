import React from 'react'
import './App.css';
import Api from './utils/Api'
import { ApiObject } from './utils/constants';
import Header from './components/header/Header';
import Dash from './components/dash/Dash';
import Footer from './components/footer/Footer';
import Overlay from './components/overlay/Overlay';
import Locations from './components/locations/Locations';
import ImageOverlay from './components/imageOverlay/ImageOverlay';

function App() {
  const api = new Api(ApiObject)
  const [locationsData, setLocationsData] = React.useState([])
  const [isOpen, setIsOpen] = React.useState({mainOverlay: false, dashInfo: false, dashImage: false, deleteLocation: false, addLocation: false, imageOverlay: false });
  const [imageOverlayData, setImageOverlayData] = React.useState({name: "", link: ""})
  const [deleteLocationData, setDeleteLocationData] = React.useState({id: ""})
  const [addLocationData, setAddLocationData] = React.useState({name: "", link: ""})
  const [dashInfoData, setDashInfoData] = React.useState({name: "", about: ""})
  const [dashImageData, setDashImageData] = React.useState({avatar: ""})
  const [dashData, setDashData] = React.useState({name: "", about: "", avatar: "", id: ""})
  const closeAllOverlays = () => {
    setIsOpen({...isOpen, mainOverlay: false, dashInfo: false, dashImage: false, deleteLocation: false, addLocation: false, imageOverlay: false })
  }
  const openImageOverlay = () => {
    setIsOpen({...isOpen, mainOverlay: true, imageOverlay: true})
  }
  const openDashInfoOverlay = () => {
    setDashInfoData({...dashInfoData, name: dashData.name, about: dashData.about})
    setIsOpen({...isOpen, mainOverlay: true, dashInfo: true})
  }
  const openDashImageOverlay = () => {
    setIsOpen({...isOpen, mainOverlay: true, dashImage: true})
  }
  const openDeleteLocationOverlay = () => {
    setIsOpen({...isOpen, mainOverlay: true, deleteLocation: true})
  }
  const openAddLocationOverlay = () => {
    setIsOpen({...isOpen, mainOverlay: true, addLocation: true})
  }
  const submitDashInfo = (e) => {
    e.preventDefault()
    api.setUserInfo(dashInfoData).then(res => setDashData(res)).finally(closeAllOverlays)
  }
  const submitDashImage = (e) => {
    e.preventDefault()
    api.changeProfilePicture(dashImageData).then(res => setDashData(res)).finally(closeAllOverlays)
  }
  const submitDeleteLocation = (e) => {
    e.preventDefault()
    api.deleteCard(deleteLocationData).then(res => {
      setLocationsData(locationsData.filter(location => location._id !== deleteLocationData.id))
    }).finally(closeAllOverlays)
  }
  const submitAddLocation = (e) => {
    e.preventDefault()
    api.addNewCard(addLocationData).then(res => setLocationsData([res, ...locationsData])).finally(closeAllOverlays)
  }

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()]).then(([locations, info]) => {
      setDashData({...dashData, name: info.name, about: info.about, avatar: info.avatar, id: info._id})
      setLocationsData(locations)
    })
  },[])
  
  

  return (
    <div className="App">
      <div className="page">
        <Header />
        <main>
            <Dash functions={{openDashInfoOverlay, openDashImageOverlay, openAddLocationOverlay, setDashInfoData}} infoData={dashData} />
            <Locations functions={{openImageOverlay, setImageOverlayData, setDeleteLocationData, openDeleteLocationOverlay, like: api.likeCard, unlike: api.unlikeCard, setLocationsData}} locationsData={locationsData} user={dashData}/>
        </main>
        <Footer />
      </div>
      <Overlay forms={[{
        name: 'dashInfo',
        header: 'Edit Profile',
        inputs: [{type: 'text', placeHolder: 'Name', name: 'name', minLength: 2, maxLength: 40, id: 'dash-name'},
        {type: 'text', placeHolder: 'About', name: 'about', minLength: 2, maxLength: 200, id: 'dash-subtitle'}],
        buttonText: 'Save',
        isOpen: isOpen.dashInfo,
        formState: dashInfoData,
        hasInitialState: true,
        setFormState: setDashInfoData,
        submit: submitDashInfo
      },{
        name: 'dashImage',
        header: 'Change profile picture',
        inputs: [{type: 'url', placeHolder: 'Avatar Image Link', name: 'avatar', id: 'dash-image'}],
        buttonText: 'Save',
        isOpen: isOpen.dashImage,
        formState: dashImageData,
        hasInitialState: false,
        setFormState: setDashImageData,
        submit: submitDashImage
      },{
        name: 'addLocation',
        header: 'New Place',
        inputs: [{type: 'text', placeHolder: 'Location Name', name: 'name', minLength: 1, maxLength: 30, id: 'location-name'},
        {type: 'url', placeHolder: 'Location image URL', name: 'link', id: 'location-url'}],
        buttonText: 'Save',
        isOpen: isOpen.addLocation,
        formState: addLocationData,
        hasInitialState: false,
        setFormState: setAddLocationData,
        submit: submitAddLocation
      },{
        name: 'deleteLocation',
        header: 'Are you sure?',
        inputs: [{type: 'hidden', name: 'id', id: 'location-id'}],
        buttonText: 'Yes',
        isOpen: isOpen.deleteLocation,
        formState: deleteLocationData,
        hasInitialState: false,
        setFormState: setDeleteLocationData,
        submit: submitDeleteLocation
      }]} isOpen={isOpen.mainOverlay} functions={{closeAllOverlays}}><ImageOverlay overlayOpened={isOpen.imageOverlay} locationData={imageOverlayData} functions={{closeAllOverlays}} /></Overlay>
    </div>
  );
}

export default App;
