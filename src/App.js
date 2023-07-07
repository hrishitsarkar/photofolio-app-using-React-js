
import './App.css';
import Nav from '../src/components/Nav/Nav';
import AlbumList from './components/AlbumList/AlbumList';
import ImageList from './components/ImageList/ImageList';
import { useState,useEffect } from 'react';
import {db} from './firebaseInIt';
import { ToastContainer, toast } from 'react-toastify';
import { collection, addDoc,onSnapshot,doc, getDocs,deleteDoc,updateDoc,where,query, setDoc } from "firebase/firestore"; 
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [toggleAdd,setToggleAdd] = useState(false);
  const [albums,setAlbums] = useState([]);
  const [images,setImages] = useState([]);
  const [loading,setLoading] = useState(false);
  const [toggleComponent,setToggleComponent] = useState(false);
  const [album,setAlbum] = useState();
  const [addImageToggler,setAddImageToggler] = useState(false);
  const [searchResults,setSearchResults] = useState([]);
  const [update,setUpdate] = useState(null);
  const [search, setSearch] = useState(false);
  const [searchToggler, setSearchToggler] = useState(false);
  const [carouselToggler,setCarouselToggler] = useState(false);
  const [carousel,setCarousel] = useState();
  
  const updateImg = async (image) => {
    
    const docRef = doc(db,'images',image.id);

    await updateDoc(docRef,image);
    setSearchToggler(false)
    toast.success("Image updated successfully");

     
  }
  const deleteImg = async (image) => {
    await deleteDoc(doc(db, 'images', image.id));
    setSearchToggler(false)
  toast.success("Image deleted successfully");
  }
  const getData = async () => {
    const unsub = onSnapshot(collection(db, "albums"), (snapshot) => {
      const albums = snapshot.docs.map((doc)=>{
        return {
          id : doc.id,
          ...doc.data()
        }
      })
      
      setAlbums(albums);
      
      
  });
  }
  const showSearch = () => {
    if(!search){
        setSearch(true);
    }else{
        setSearchToggler(false);
        setSearch(false);
    }
    
    
}
  const getImages = async (album) => {
    const unsub = onSnapshot(collection(db, 'images'), (snapshot) => {
      const images = snapshot.docs.map((doc)=>{
        if(album.name === doc.data().albumName){
          return {
            id : doc.id,
            ...doc.data()
          }
        }
          
        
        
      })
      setImages(images.filter(image => image !== undefined));
      
      
  })
}
const deleteAlbum = async (album) => {
  
  await deleteDoc(doc(db, "albums", album.id));
  
  toast.success("Album deleted successfully")
  
}
  const addAlbumToggler = () => {
    setToggleAdd(!toggleAdd);
  }
   const addAlbum = async (album) => {
    let name = false;
    const allDocs = await getDocs(collection(db,'albums'));
   allDocs.docs.map((doc) => {
    if(doc.data().name === album.name){
      toast.error("Name already used");
      name = true;
    }
    
   })
   if(!name){
    const docRef = await addDoc(collection(db,'albums'),album);
  
    toast.success('Album added successfully')
   } 
  }
  const insideAlbum = (album) => {
    
    setToggleComponent(true);
    setAlbum(album);
    
  }
  const outsideAlbum = () => {
    
    setToggleComponent(false);
  }
  const addImgHandler = () => {
    
    setAddImageToggler(!addImageToggler);
    if(update){
      setAddImageToggler(false);
      setUpdate(null);
    }
    
  }

  const addImageToDB = async (image) => {
    let name = false;
    const allDocs = await getDocs(collection(db,'images'));
    
   allDocs.docs.map((doc) => {
    if(doc.data().title === image.title){
      toast.error("Title already used");
      name = true;
      
    }
    
   })
   if(!name){
    const docRef = await addDoc(collection(db, 'images'), image);
    image = {id : docRef.id , ...image}
    toast.success("Image added successfully");
   }
    
  }
  const showCarousel = (image) => {
    setCarousel(image);
    console.log('img',image)
    setCarouselToggler(true);

  }
  
  
  
  return (
    <>
    <Nav />
    <ToastContainer />
    
    
    <AlbumList carousel={carousel} showCarousel={showCarousel} carouselToggler={carouselToggler} setCarouselToggler={setCarouselToggler} searchToggler={searchToggler} setSearchToggler={setSearchToggler} showSearch={showSearch} search={search} setImages={setImages} toggleComponent={toggleComponent} update={update} setUpdate={setUpdate} setAddImageToggler={setAddImageToggler} searchResults={searchResults} setSearchResults={setSearchResults} deleteImg={deleteImg} updateImg={updateImg} getImages={getImages} images={images} addImageToDB={addImageToDB} insideAlbum={insideAlbum} album = {album} outsideAlbum={outsideAlbum} loading={loading} addImageToggler={addImageToggler} addImgHandler={addImgHandler} albums={albums} addAlbumToggler={addAlbumToggler} addAlbum={addAlbum} deleteAlbum={deleteAlbum} toggleAdd={toggleAdd} setLoading={setLoading} getData={getData} /> 
    </>
  );
}

export default App;
//<ImageList update={update} setUpdate={setUpdate}  setAddImageToggler={setAddImageToggler} searchResults={searchResults} setSearchResults={setSearchResults} deleteImg={deleteImg} updateImg={updateImg} loading={loading} getImages={getImages} setLoading={setLoading} images={images} addImageToDB={addImageToDB} album = {album} outsideAlbum={outsideAlbum} imageToggler={addImageToggler} addImgHandler={addImgHandler} /> : <AlbumList insideAlbum={insideAlbum} loading={loading} albums={albums} addAlbumToggler={addAlbumToggler} addAlbum={addAlbum} deleteAlbum={deleteAlbum} toggleAdd={toggleAdd} setLoading={setLoading} getData={getData} /> }