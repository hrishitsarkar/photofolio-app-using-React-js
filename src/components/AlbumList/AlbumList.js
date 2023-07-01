
import image from './image.png'
import AlbumForm from '../AlbumForm/AlbumForm'
import { useEffect } from 'react';
function AlbumList(props){
    const {addAlbumToggler,toggleAdd,addAlbum,albums} = props;
    

return (
    <>
    <section className="w-full h-fit flex items-center justify-center flex-col">
    
    <h1 className=' mt-[100px]  z-[50] font-bold text-[3rem] cursor-pointer hover:tracking-[10px] ' >Your Albums</h1>
    {toggleAdd ? <AlbumForm addAlbum={addAlbum} /> : undefined}
    <button type="button" className={!toggleAdd ? "w-[120px] h-[50px] text-white font-bold text-[1.2rem] rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 m-5" : "w-[120px] h-[50px] text-white font-bold text-[1.2rem] rounded-full bg-red-500 m-5" } 
    onClick={addAlbumToggler}>
  {!toggleAdd ? "Add Album" : "Cancel"}
</button>
    <div className="w-[80%]  border-8 flex flex-wrap justify-around p-5">
    
    {albums.map((album,i) => {
        return (
            <div key={i} className=" shadow-2xl m-5 w-[150px] h-[150px] border-4 flex items-center justify-center flex-col hover:bg-lime-200 hover:border-slate-900 hover:scale-125 ">
    <img src={image}
        className='w-[100px]'
    />
    <h1 className='font-bold'>{album.name}</h1>
    </div>

    )
    })}
    

    </div>

    </section>
    </>
)
}

export default AlbumList;