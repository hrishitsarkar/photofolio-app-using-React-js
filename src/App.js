
import './App.css';
import Nav from '../src/components/Nav/Nav';
import AlbumList from './components/AlbumList/AlbumList';
import ImageList from './components/ImageList/ImageList';
import { useState, useEffect } from 'react';
import { db } from './firebaseInIt';
import { ToastContainer, toast } from 'react-toastify';
import { collection, addDoc, onSnapshot, doc, getDocs, deleteDoc, updateDoc, where, query, setDoc } from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  //all the hooks
  //it toggles add album button
  const [toggleAdd, setToggleAdd] = useState(false);
  //saving the albums, which are being fetched from database to the state
  const [albums, setAlbums] = useState([]);
  //saving the images, which are being fetched from database to the state
  const [images, setImages] = useState([]);
  //conditionally rendering spinner using loading
  const [loading, setLoading] = useState(false);
  //it is used to toggle component from AlbumList to ImageList
  const [toggleComponent, setToggleComponent] = useState(false);
  //saving a individual album in state
  const [album, setAlbum] = useState();
  //toggles the add image button and conditionally renders ImageForm
  const [addImageToggler, setAddImageToggler] = useState(false);
  //saving the array of images while searching in the state
  const [searchResults, setSearchResults] = useState([]);
  //saving the image to be updated in the state
  const [update, setUpdate] = useState(null);
  //toggling the search button for conditional rendering
  const [search, setSearch] = useState(false);
  //it is used to conditionally render from images array or searchResults array
  const [searchToggler, setSearchToggler] = useState(false);
  //toggles the carousel component
  const [carouselToggler, setCarouselToggler] = useState(false);
  //it is a copy of images array inside a particular album
  const [carousel, setCarousel] = useState([]);
  //it is used to render a particular index inside carousel and used in prev,next 
  const [index, setIndex] = useState(0);


  //used to update image in database
  const updateImg = async (image) => {
    //update operation
    const docRef = doc(db, 'images', image.id);
    await updateDoc(docRef, image);
    //closing the search button if open
    setSearch(false)
    //rendering the images array by changing the searchToggler which is being used in conditional rendering
    setSearchToggler(false)
    //toast message for success
    toast.success("Image updated successfully");


  }
  //used to delete image from database
  const deleteImg = async (image) => {
    //delete operation
    await deleteDoc(doc(db, 'images', image.id));
    //rendering the images array by changing the searchToggler which is being used in conditional rendering
    setSearchToggler(false)
    //toast message for success
    toast.success("Image deleted successfully");
  }

  //this function is used to get all the albums from database
  const getData = async () => {
    //fetching
    const unsub = onSnapshot(collection(db, "albums"), (snapshot) => {
      const albums = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      //saving the fetched albums inside state to render
      setAlbums(albums);


    });
  }
  //toggles the search button
  const showSearch = () => {
    if (!search) {
      setSearch(true);
    } else {
      setSearchToggler(false);
      setSearch(false);
    }


  }
  //to get all the images inside of a particular album
  const getImages = async (album) => {
    //fetching
    const unsub = onSnapshot(collection(db, 'images'), (snapshot) => {

      const images = snapshot.docs.map((doc) => {
        if (album.name === doc.data().albumName) {
          return {
            id: doc.id,
            ...doc.data()
          }
        }



      })

      //the images array was populated with image object along with undefined ,to exclude undefined filter method was used
      setImages(images.filter(image => image !== undefined));

    })
  }
  //to delete albums along with images
  const deleteAlbum = async (album) => {
    //operation of deleting albums
    await deleteDoc(doc(db, "albums", album.id));
    //fething all the images which are inside the album
    const q = query(collection(db, "images"), where("albumName", "==", album.name));
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map(async (d) => {
      //deleting the images
      await deleteDoc(doc(db, "images", d.id));
    })
    //toast success message
    toast.success("Album deleted successfully along with images")

  }
  //toggles the add album button and renders the AlbumForm component
  const addAlbumToggler = () => {
    setToggleAdd(!toggleAdd);
  }
  //adding an album to the database
  const addAlbum = async (album) => {
    let name = false;
    const allDocs = await getDocs(collection(db, 'albums'));
    allDocs.docs.map((doc) => {
      //album name should not be duplicate
      if (doc.data().name === album.name) {
        toast.error("Name already used");
        name = true;
      }

    })

    if (!name) {
      //adding operation
      const docRef = await addDoc(collection(db, 'albums'), album);

      toast.success('Album added successfully')
    }
  }
  //toggle to go inside an album
  const insideAlbum = (album) => {

    setToggleComponent(true);
    setAlbum(album);

  }
  //toggle to go outside of an album using back arrow button
  const outsideAlbum = () => {

    setToggleComponent(false);
  }
  //adding an image
  const addImgHandler = () => {
    //toggling the button add image
    setAddImageToggler(!addImageToggler);
    //if anything inside update toggle the button and set the state of update to null
    if (update) {
      setAddImageToggler(false);
      setUpdate(null);
    }

  }
  //add image to database
  const addImageToDB = async (image) => {
    let name = false;
    //getting all images
    const allDocs = await getDocs(collection(db, 'images'));
    //checking if title is same
    allDocs.docs.map((doc) => {
      if (doc.data().title === image.title) {
        toast.error("Title already used");
        name = true;

      }

    })
    if (!name) {
      //adding a image 
      const docRef = await addDoc(collection(db, 'images'), image);
      image = { id: docRef.id, ...image }
      toast.success("Image added successfully");
    }

  }
  //to toggle the carousel
  const showCarousel = (image) => {
    //getting the index to save the index inside state
    const ind = images.indexOf(image);
    //copying images array to carousel
    setCarousel([...images]);
    //toggling to the carousel component
    setCarouselToggler(true);
    //saving the index inside state to render
    setIndex(ind);



  }

  //to go to prev image inside carousel
  const prev = () => {

    setIndex((prevState) => {
      //decreasing index
      return prevState - 1;
    })
    if (index === 0) {
      //if index becomes 0 the making it last index
      setIndex(carousel.length - 1);
    }
  }
  //to go to next image inside carousel
  const next = () => {

    setIndex((prevState) => {
      //increasing index
      return prevState + 1;
    })
    //if last index then making it 0th
    if (index === carousel.length - 1) {
      setIndex(0);
    }
  }


  return (
    <>
      {/* rendering Nav component */}
      <Nav carouselToggler={carouselToggler} getData={getData} />
      {/* ToastContainer for toast messages */}
      <ToastContainer />

      {/* rendering AlbumList component  */}
      <AlbumList next={next} prev={prev} index={index} setIndex={setIndex} carousel={carousel} showCarousel={showCarousel} carouselToggler={carouselToggler} setCarouselToggler={setCarouselToggler} searchToggler={searchToggler} setSearchToggler={setSearchToggler} showSearch={showSearch} search={search} setImages={setImages} toggleComponent={toggleComponent} update={update} setUpdate={setUpdate} setAddImageToggler={setAddImageToggler} searchResults={searchResults} setSearchResults={setSearchResults} deleteImg={deleteImg} updateImg={updateImg} getImages={getImages} images={images} addImageToDB={addImageToDB} insideAlbum={insideAlbum} album={album} outsideAlbum={outsideAlbum} loading={loading} addImageToggler={addImageToggler} addImgHandler={addImgHandler} albums={albums} addAlbumToggler={addAlbumToggler} addAlbum={addAlbum} deleteAlbum={deleteAlbum} toggleAdd={toggleAdd} setLoading={setLoading} getData={getData} />
    </>
  );
}

export default App;
