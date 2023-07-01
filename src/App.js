
import './App.css';
import Nav from '../src/components/Nav/Nav';
import AlbumList from './components/AlbumList/AlbumList';
import { useState,useEffect } from 'react';
import {db} from './firebaseInIt';
import { ToastContainer, toast } from 'react-toastify';
import { collection, addDoc,onSnapshot,doc } from "firebase/firestore"; 
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [toggleAdd,setToggleAdd] = useState(false);
  const [albums,setAlbums] = useState([]);
  useEffect(()=>{
        getData();
  },[])
  const getData = async () => {
    const unsub = onSnapshot(collection(db, "albums"), (snapshot) => {
      const albums = snapshot.docs.map((doc)=>{
        return {
          ...doc.data()
        }
      })
      console.log(albums)
      setAlbums(albums);
  });
  }
  const addAlbumToggler = () => {
    setToggleAdd(!toggleAdd);
  }
   const addAlbum = async (album) => {
    const docRef = await addDoc(collection(db,'albums'),album)
  // const newAlbum = [album,...albums];
  // console.log(newAlbum)
  //     setAlbums(newAlbum);
      toast.success('Album added')
  }
  
  return (
    <>
    <Nav />
    <AlbumList albums={albums} addAlbumToggler={addAlbumToggler} addAlbum={addAlbum} toggleAdd={toggleAdd}/>
    </>
  );
}

export default App;
