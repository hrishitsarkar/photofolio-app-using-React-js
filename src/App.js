
import './App.css';
import Nav from '../src/components/Nav/Nav';
import AlbumList from './components/AlbumList/AlbumList';
import ImageList from './components/ImageList/ImageList';
import { useState,useEffect } from 'react';
import {db} from './firebaseInIt';
import { ToastContainer, toast } from 'react-toastify';
import { collection, addDoc,onSnapshot,doc, getDocs,deleteDoc } from "firebase/firestore"; 
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [toggleAdd,setToggleAdd] = useState(false);
  const [albums,setAlbums] = useState([]);
  const [images,setImages] = useState([]);
  const [loading,setLoading] = useState(false);
  const [toggleComponent,setToggleComponent] = useState(false);
  const [album,setAlbum] = useState();
  const [addImageToggler,setAddImageToggler] = useState(false);
  
  
  const getData = async () => {
    const unsub = onSnapshot(collection(db, "albums"), (snapshot) => {
      const albums = snapshot.docs.map((doc)=>{
        return {
          id : doc.id,
          ...doc.data()
        }
      })
      console.log(albums)
      setAlbums(albums);
      
      
  });
  }
  const getImages = async () => {
    const unsub = onSnapshot(collection(db, album.name), (snapshot) => {
      const images = snapshot.docs.map((doc)=>{
        return {
          id : doc.id,
          ...doc.data()
        }
      })
      setImages(images);
      
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
  }

  const addImageToDB = async (image) => {
    const docRef = await addDoc(collection(db, album.name), image);
    toast.success("Image added successfully");
  }
  
  return (
    <>
    <Nav />
    <ToastContainer />
    
    {toggleComponent ? <ImageList loading={loading} getImages={getImages} setLoading={setLoading} images={images} addImageToDB={addImageToDB} album = {album} outsideAlbum={outsideAlbum} imageToggler={addImageToggler} addImgHandler={addImgHandler} /> : <AlbumList insideAlbum={insideAlbum} loading={loading} albums={albums} addAlbumToggler={addAlbumToggler} addAlbum={addAlbum} deleteAlbum={deleteAlbum} toggleAdd={toggleAdd} setLoading={setLoading} getData={getData} /> }
    
    </>
  );
}

export default App;
