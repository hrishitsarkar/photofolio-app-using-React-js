import { useState,useEffect, useRef } from 'react';
import back from './back.png';
import searchimg from './search.png'
import cross from './cross.png'
import {toast} from 'react-toastify'
import ImageForm from '../ImageForm/ImageForm';
import Spinner from 'react-spinner-material';
import edit from './edit.png'
import deleteIcon from './delete.png';
function ImageList(props){
    const [search,setSearch] = useState(false);
    const searchRef = useRef();
    const [searchToggler,setSearchToggler] = useState(false);
    const [searchResults,setSearchResults] = useState([]);
    const {updateImg,album,outsideAlbum,addImgHandler,imageToggler,addImageToDB,images,setLoading,getImages,loading} = props;
    const [update,setUpdate] = useState(null);
    useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{
            getImages();
            setLoading(false)
        },1000)
        toast.success("Images fetched successfully")
        
  },[])
  const handleSearch = () => {
    const res = performSearch(searchRef.current.value);
    
        setSearchToggler(true);
    
    setSearchResults(res);
  }
  const performSearch = (search) => {
        return images.filter(image => image.title.toLowerCase().includes(search.toLowerCase()))
  }
    const showSearch = () => {
        setSearch(!search);
    }
    
    
    return (
        <>  {
            imageToggler || update ? <div className='flex justify-center items-center'> 
            <ImageForm update={update} updateImg={updateImg} setUpdate = {setUpdate} setSearchResults={setSearchResults} addImageToDB={addImageToDB} album={album} />
            </div> : undefined
        }
            <section className="w-full flex flex-row justify-around items-center p-10 flex-wrap">
                <img 
                src={back}
                className='w-[50px] cursor-pointer shadow-2xl'
                onClick={outsideAlbum} />
                <h1 className='font-bold text-[2rem]'>{images.length === 0 ? `No images found in ${album.name}` : `Images in ${album.name}`} </h1>
                {!search ? <img 
                src={searchimg}
                className='w-[25px] h-[25px]'
                onClick={showSearch}
                /> : <div className='flex flex-row items-center'>
                <input type='search'
                ref={searchRef}
                placeholder='Search an image'
                className='w-[300px] h-[40px] placeholder: p-2 mx-2'
                onChange={handleSearch}
                 />
                
                <img 
                src={cross}
                className='w-[25px] h-[25px]'
                onClick={showSearch}
                />
                </div> }
                <button className={imageToggler ? "rounded-full border-[3px] font-bold p-2 hover:shadow-lg shadow-red-500/50 bg-red-700 border-zinc-950 text-white" : "rounded-full  border-[3px] p-2 border-red-500 font-bold hover:bg-black hover:text-white"}
                onClick={addImgHandler}>{imageToggler || update ? "Cancel" : "Add image"}</button>
            </section>
            {loading ? <div className='w-full h-[400px] flex items-center justify-center'><Spinner radius={120} color={"#333"} stroke={2} visible={true} /></div>
             : <section className='w-full flex flex-wrap items-center justify-around'>
                
                {!searchToggler ? images.map((image,i) => {
                    return (
                        <div id='img-container' className='w-[200px] h-[200px] relative m-[100px] flex flex-wrap items-center justify-around ease-in-out duration-500 opacity-75 hover:scale-[1.5] hover:opacity-100 ' key={i}>
                        <img 
                            src={edit}
                            className='icons opacity-0 w-[20px] h-[20px] absolute  top-0 right-[30px] rounded-full hover:scale-[1.5]'
                            onClick={() => setUpdate(image,album)}
                        />
                        <img 
                            src={deleteIcon}
                            className='icons opacity-0 w-[20px] h-[20px] absolute  top-0 right-0 rounded-full hover:scale-[1.5]'
                        />
                        <img  src={image.url} 
                            className=' shadow-2xl m-5'
                        />
                        <h1 className='text-2xl'>{image.title}</h1>
                        </div>
                    
                    )
                }) : 
                searchResults.map((image,i) => {
                    return (
                        <div className='w-[200px] h-[200px] m-[100px] flex flex-wrap items-center justify-around ease-in-out duration-500 opacity-75 hover:scale-[1.5] hover:opacity-100 ' key={i}>
                        <img  src={image.url} 
                            className=' shadow-2xl m-5'
                        />
                        <h1 className='text-2xl'>{image.title}</h1>
                        </div>
                    
                    )
                })}
            </section>}
            
        </>
    )
}
export default ImageList