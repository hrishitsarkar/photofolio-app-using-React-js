
import image from './image.png'
import AlbumForm from '../AlbumForm/AlbumForm'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import cross from './cross.png'

import Spinner from 'react-spinner-material';
import ImageList from '../ImageList/ImageList';
function AlbumList(props) {
    const {carousel,showCarousel,carouselToggler,setCarouselToggler,searchToggler,setSearchToggler,search,showSearch,toggleComponent,update,setUpdate,setAddImageToggler,searchResults,setSearchResults,deleteImg,updateImg,getImages,images,addImageToDB,album,outsideAlbum,addImgHandler, addImageToggler, addAlbumToggler, toggleAdd, addAlbum, albums, loading, insideAlbum, setLoading, getData, deleteAlbum } = props;
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            getData();
            setLoading(false)
        }, 1000)
        toast.success("Albums fetched successfully")

    }, [])

    return (
        <>  
        {toggleComponent ? <ImageList carousel={carousel} showCarousel={showCarousel} carouselToggler={carouselToggler} setCarouselToggler={setCarouselToggler} searchToggler={searchToggler} setSearchToggler={setSearchToggler} search={search} showSearch={showSearch} update={update} setUpdate={setUpdate}  setAddImageToggler={setAddImageToggler} searchResults={searchResults} setSearchResults={setSearchResults} deleteImg={deleteImg} updateImg={updateImg} loading={loading} getImages={getImages} setLoading={setLoading} images={images} addImageToDB={addImageToDB} album = {album} outsideAlbum={outsideAlbum} addImageToggler={addImageToggler} addImgHandler={addImgHandler} /> : 
        <section className="w-full h-fit flex items-center justify-center flex-col">

                <h1 className='text-left mt-[30px] font-bold text-[3rem] cursor-pointer hover:tracking-[10px] ' >Your Albums</h1>
                {toggleAdd ? <AlbumForm addAlbum={addAlbum} /> : undefined}
                <button type="button" className={!toggleAdd ? "w-[120px] h-[50px] text-white font-bold text-[1.2rem] rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 m-5" : "w-[120px] h-[50px] text-white font-bold text-[1.2rem] rounded-full bg-red-500 m-5 hover:bg-orange-700 shadow-2xl"}
                    onClick={addAlbumToggler}>
                    {!toggleAdd ? "Add Album" : "Cancel"}
                </button>
                {loading ? <div className='w-full h-[400px] flex items-center justify-center'><Spinner radius={120} color={"#333"} stroke={2} visible={true} /></div> : <div className="w-[80%]  border-8 flex flex-wrap justify-around p-5">

                    {albums.map((album, i) => {
                        return (<div key={i} className='flex flex-col'>

                            <div  id='album-container' className=" shadow-2xl m-5 w-[150px] h-[150px] border-4 flex items-center justify-center flex-col hover:bg-lime-200 hover:border-slate-900 hover:scale-[1.1] relative "
                                >
                                <img
                                    src={cross}
                                    id='cross-img'
                                    className='w-[16px] h-[16px] text-right top-[-8px] absolute right-[-8px] hover:scale-[1.5] opacity-0'
                                    onClick={() => deleteAlbum(album)}
                                />

                                <img src={image}
                                    className='w-[100px] cursor-pointer'
                                    onClick={() => insideAlbum(album)}
                                />
                                <h1 className='font-bold cursor-pointer' onClick={() => insideAlbum(album)}>{album.name}</h1>
                            </div>
                        </div>
                        )
                    })}


                </div>
                }

            </section>
        }
        
            
        </>
    )
}

export default AlbumList;