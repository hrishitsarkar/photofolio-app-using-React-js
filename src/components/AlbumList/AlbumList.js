
import image from './image.png'
import AlbumForm from '../AlbumForm/AlbumForm'
import { useEffect } from 'react';
import {toast} from 'react-toastify';
import cross from './cross.png'

import Spinner from 'react-spinner-material';
function AlbumList(props){
    const {addAlbumToggler,toggleAdd,addAlbum,albums,loading,insideAlbum,setLoading,getData,deleteAlbum} = props;
    useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{
            getData();
            setLoading(false)
        },1000)
        toast.success("Albums fetched successfully")
        
  },[])

return (
    <>
    <section className="w-full h-fit flex items-center justify-center flex-col">
    
    <h1 className='text-left mt-[30px] font-bold text-[3rem] cursor-pointer hover:tracking-[10px] ' >Your Albums</h1>
    {toggleAdd ? <AlbumForm addAlbum={addAlbum} /> : undefined}
    <button type="button" className={!toggleAdd ? "w-[120px] h-[50px] text-white font-bold text-[1.2rem] rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 m-5" : "w-[120px] h-[50px] text-white font-bold text-[1.2rem] rounded-full bg-red-500 m-5 hover:bg-orange-700 shadow-2xl" } 
    onClick={addAlbumToggler}>
  {!toggleAdd ? "Add Album" : "Cancel"}
</button>
    {loading ? <div className='w-full h-[400px] flex items-center justify-center'><Spinner radius={120} color={"#333"} stroke={2} visible={true} /></div> : <div className="w-[80%]  border-8 flex flex-wrap justify-around p-5">
    
    {albums.map((album,i) => {
        return (<div className='flex flex-col relative'>
            <img 
                src={cross}
                className='w-[10px] h-[10px] text-right top-0 absolute right-0 hover:scale-[1.5]'
                onClick={() => deleteAlbum(album)}
            />
            <div key={i} className=" shadow-2xl m-5 w-[150px] h-[150px] border-4 flex items-center justify-center flex-col hover:bg-lime-200 hover:border-slate-900 hover:scale-[1.1] "
            onClick={()=> insideAlbum(album)}>
            
    <img src={image}
        className='w-[100px]'
    />
    <h1 className='font-bold'>{album.name}</h1>
    </div>
    </div>
    )
    })}
    

    </div>
}
    
    </section>
    </>
)
}

export default AlbumList;