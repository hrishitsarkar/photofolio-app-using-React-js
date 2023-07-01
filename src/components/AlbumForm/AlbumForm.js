import { useRef } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AlbumForm(props) {
    const {addAlbum} = props;
    const inputAlbumRef = useRef();
    const submitHandler = () => {
        const album = {
            name : inputAlbumRef.current.value
        }
        addAlbum(album);
        clearInput();
        
    }
    
    const clearInput = ()=>{
            inputAlbumRef.current.value = "";
            inputAlbumRef.current.focus();
    }
    return (
        
        <>
            <section className="w-full flex justify-center items-center ">

                <div className=" w-[60%] shadow-2xl flex flex-col bg-slate-100 items-center" >
                    <h1 className="m-5 font-bold text-[2rem]">Create an album</h1>
                    <div className=" w-[40%]  bg-slate-100 flex flex-row  h-[200px] flex-wrap rounded-lg justify-around items-center ">
                    <input ref={inputAlbumRef} type="text" placeholder="Album Name" className="w-[450px] h-[50px] rounded-full focus:outline-none focus:ring focus:ring-violet-300 placeholder:text-slate-400 text-[1.3rem] py-2 pl-9 pr-3" required />
                    <button className="bg-sky-500 hover:bg-sky-700 rounded-lg w-[100px] h-[50px] text-[1.2rem] text-white font-bold" onClick={clearInput}>
                        Clear
                    </button>
                    <button className="bg-violet-500 hover:bg-violet-600 rounded-lg active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 w-[100px] h-[50px] text-[1.2rem] text-white font-bold" onClick={submitHandler}>
                        Create
                    </button>
                    </div>
                </div>
                
            </section>
        </>
    )
}

export default AlbumForm;