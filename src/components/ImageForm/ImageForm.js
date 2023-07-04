import { useRef } from "react";

import { collection, addDoc } from "firebase/firestore"; 
const ImageForm = (props) => {
    const { album , addImageToDB} = props;
    const albumName = album.name;
    const titleRef = useRef();
    const urlRef = useRef();
    const clearInput = ()=>{
        titleRef.current.value = "";
        urlRef.current.value = "";
        titleRef.current.focus();
}
const addImage = async () => {

   const image = {
    albumName : albumName,
    title : titleRef.current.value,
    url : urlRef.current.value
   }
   addImageToDB(image);
   clearInput();


}
    return (
        <>
            <section className="w-[50%] bg-slate-200 flex items-center justify-around rounded-lg m-5 p-5 flex-col">
                <h1 className="font-bold text-[2rem] m-2 ">Add image to {album.name}</h1>
                <input type="text" placeholder="Title"
                    className="w-[90%] p-2 rounded-full m-5 "
                    ref={titleRef}
                />
                <input type="text" placeholder="Image URL"
                    className="w-[90%] p-2 rounded-full m-5 "
                    ref={urlRef}
                />
                <div className="flex flex-wrap flex-row items-center justify-center">
                <button className="m-5 rounded-full  border-[3px] p-2 border-blue-500 font-bold hover:bg-black hover:text-white hover:text-[1.5rem] ease-in duration-300"
                onClick={clearInput}
                >Clear</button>
                <button className=" m-5 rounded-full  border-[3px] p-2 border-red-500 font-bold hover:bg-black hover:text-white hover:text-[1.5rem] ease-in duration-300"
                onClick={addImage}
                >Add</button>
                </div>

            </section>
        </>
    )
}

export default ImageForm;