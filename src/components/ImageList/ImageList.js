import { useState, useEffect, useRef } from 'react';
import back from './back.png';
import searchimg from './search.png'
import cross from './cross.png'
import { toast } from 'react-toastify'
import ImageForm from '../ImageForm/ImageForm';
import Spinner from 'react-spinner-material';
import edit from './edit.png'
import deleteIcon from './delete.png';
import sed from './sed.png';
import Carousel from '../Carousel/Carousel';
function ImageList(props) {
    //for the ref of the search field
    const searchRef = useRef("");
    
    //destructuring
    const {next,prev,index,setIndex,carousel,showCarousel,carouselToggler,setCarouselToggler,searchToggler,setSearchToggler,search,showSearch, update, setUpdate, setAddImageToggler, searchResults, setSearchResults, deleteImg, updateImg, album, outsideAlbum, addImgHandler, addImageToggler, addImageToDB, images, setLoading, getImages, loading } = props;
    //fetching all the images while the component mounts
    useEffect(() => {
        
        setLoading(true);
        setTimeout(() => {
            //getting the images
             getImages(album);
            

            setLoading(false)
        }, 1000)
        toast.success("Images fetched successfully")

    }, [])
    //to search an image
    const handleSearch = () => {
        const res = performSearch(searchRef.current.value);
        //toggling it true for conditional rendering
        setSearchToggler(true);
        //saving the filtered array inside state
        setSearchResults(res);

    }
    //filter the searches from the images array 
    const performSearch = (search) => {
        
        return images.filter(image => image ?  image.title.toLowerCase().includes(search.toLowerCase()) : undefined)
    }
    
    
    return (
        <> 
            {/*conditionally rendering ImageForm  */}
         {
            addImageToggler || update ? <div className='flex justify-center items-center'>
                <ImageForm carouselToggler={carouselToggler} addImageToggler={addImageToggler} setAddImageToggler={setAddImageToggler} update={update} updateImg={updateImg} setUpdate={setUpdate} setSearchResults={setSearchResults} addImageToDB={addImageToDB} album={album} />
            </div> : undefined
        }
        
            <section className={carouselToggler ? " hidden blur-sm w-full flex flex-row justify-around items-center p-10 flex-wrap " : "w-full flex flex-row justify-around items-center p-10 flex-wrap"}>
                <img
                    src={back}
                    className='w-[50px] cursor-pointer shadow-2xl'
                    onClick={outsideAlbum} />
                <h1 className='font-bold text-[2rem]'>{images.length > 0 ? `Images in ${album.name}` : `No images found in ${album.name}`} </h1>
                {!search ? <img
                    src={searchimg}
                    className='w-[25px] h-[25px]'
                    onClick={showSearch}
                /> : <div className='flex flex-row items-center'>
                    <input type='text'
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
                </div>}
                <button className={addImageToggler ? "rounded-full border-[3px] font-bold p-2 hover:shadow-lg shadow-red-500/50 bg-red-700 border-zinc-950 text-white" : " ease-in duration-300 rounded-full  border-[3px] p-2 border-red-500 font-bold hover:bg-black hover:text-white"}
                    onClick={addImgHandler}>{addImageToggler || update ? "Cancel" : "Add image"}</button>
            </section>
            {/* toggling to carousel component */}
            {carouselToggler ? <Carousel next={next} prev={prev} index={index} setIndex={setIndex} setCarouselToggler={setCarouselToggler} carousel={carousel} /> : undefined}
            {loading ? <div className='w-full h-[400px] flex items-center justify-center'><Spinner radius={120} color={"#333"} stroke={2} visible={true} /></div>
                : <section className={carouselToggler ? 'hidden' : 'w-full flex flex-wrap items-center justify-around'}>
                    {/* mapping images or searchResults array using the condition */}
                    {!searchToggler ? images.map((image, i) => {
                            
                        return (
                            <div key={i}>
                            <div>
                            
                            </div>
                            
                                {image !== undefined ? <div id='img-container' className={carouselToggler ? `blur-lg w-[200px] h-[200px] relative m-[100px] flex flex-wrap items-center justify-around ease-in-out duration-500 opacity-75 hover:scale-[1.5] hover:opacity-100` : `w-[200px] h-[200px] relative m-[100px] flex flex-wrap items-center justify-around ease-in-out duration-500 opacity-75 hover:scale-[1.5] hover:opacity-100`} >
                                <img
                                    src={edit}
                                    className='icons opacity-0 w-[20px] h-[20px] absolute  top-0 right-[30px] rounded-full hover:scale-[1.5]'
                                    onClick={() => setUpdate(image)}
                                />
                                <img
                                    src={deleteIcon}
                                    className='icons opacity-0 w-[20px] h-[20px] absolute  top-0 right-0 rounded-full hover:scale-[1.5]'
                                    onClick={() => deleteImg(image)}

                                />
                                <img src={image.url}
                                    className=' shadow-2xl m-5'
                                    onClick={() => showCarousel(image)}
                                />
                                <h1 className='text-2xl'>{image.title}</h1>
                            </div>
 :undefined}
                            
                            </div>
                            
                        ) 
                    }) :
                    
                        searchResults.map((image, i) => {
                            return (
                                <div key={i}>
                                    {image !== undefined ? <div id='search-img-container' className='w-[200px] h-[200px] m-[100px] flex flex-wrap items-center justify-around ease-in-out duration-500 opacity-75 hover:scale-[1.5] hover:opacity-100 ' key={i}>
                                    <img
                                        src={edit}
                                        className='icons opacity-0 w-[20px] h-[20px] absolute  top-0 right-[30px] rounded-full hover:scale-[1.5]'
                                        onClick={() => setUpdate(image)}
                                    />
                                    <img
                                        src={deleteIcon}
                                        className='icons opacity-0 w-[20px] h-[20px] absolute  top-0 right-0 rounded-full hover:scale-[1.5]'

                                        onClick={() => deleteImg(image)}
                                    />
                                    <img src={image.url}
                                        className=' shadow-2xl m-5'
                                        onClick={() => showCarousel(image)}
                                    />
                                    <h1 className='text-2xl'>{image.title}</h1>
                                </div>
 : undefined}
                                </div>
                                
                            )
                        })}
                </section>}

        </>
    )
}
export default ImageList