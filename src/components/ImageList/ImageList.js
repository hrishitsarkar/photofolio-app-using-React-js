import { useState,useEffect } from 'react';
import back from './back.png';
import searchimg from './search.png'
import cross from './cross.png'
import {toast} from 'react-toastify'
import ImageForm from '../ImageForm/ImageForm';
import Spinner from 'react-spinner-material';
function ImageList(props){
    const [search,setSearch] = useState(false);
    const {album,outsideAlbum,addImgHandler,imageToggler,addImageToDB,images,setLoading,getImages,loading} = props;
    
    useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{
            getImages();
            setLoading(false)
        },1000)
        toast.success("Images fetched successfully")
        
  },[])
    const showSearch = () => {
        setSearch(!search);
    }
    return (
        <>  {
            imageToggler ? <div className='flex justify-center items-center'> 
            <ImageForm addImageToDB={addImageToDB} album={album} />
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
                placeholder='Search an image'
                className='w-[300px] h-[40px] placeholder: p-2 mx-2'
                 />
                
                <img 
                src={cross}
                className='w-[25px] h-[25px]'
                onClick={showSearch}
                />
                </div> }
                <button className={imageToggler ? "rounded-full border-[3px] font-bold p-2 hover:shadow-lg shadow-red-500/50 bg-red-700 border-zinc-950 text-white" : "rounded-full  border-[3px] p-2 border-red-500 font-bold hover:bg-black hover:text-white"}
                onClick={addImgHandler}>{imageToggler ? "Cancel" : "Add image"}</button>
            </section>
            {loading ? <div className='w-full h-[400px] flex items-center justify-center'><Spinner radius={120} color={"#333"} stroke={2} visible={true} /></div>
             : <section className='w-full flex flex-wrap items-center justify-around'>
                {images.map((image,i) => {
                    return (
                        <div className='w-[200px] h-[200px] flex flex-wrap items-center justify-around ease-in-out duration-300 opacity-75 hover:w-[300px] hover:h-[300px] hover:opacity-100 ' key={i}>
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