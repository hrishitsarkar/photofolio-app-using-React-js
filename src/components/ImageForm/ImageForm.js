import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const ImageForm = (props) => {
    //destructuring
    const { carouselToggler, imageToggler, album, addImageToDB, setUpdate, updateImg, update, setAddImageToggler } = props;
    //saving album name
    const albumName = album.name;
    //ref of title field
    const titleRef = useRef();
    //ref of url field
    const urlRef = useRef();
    //while updating re-rendering
    useEffect(() => {
        if (!update) return;
        titleRef.current.value = update.title;
        urlRef.current.value = update.url;
    }, [update])
    // to clear the input fields and focus
    const clearInput = () => {
        titleRef.current.value = "";
        urlRef.current.value = "";
        titleRef.current.focus();
    }
    //adding an image
    const addImage = async () => {
        //checking if values are empty or not
        if (titleRef.current.value === "" || urlRef.current.value === "") {
            toast.error("Please fill out the fields");
            return;
        }
        //while update
        if (!update) {
            const image = {
                albumName: albumName,
                title: titleRef.current.value,
                url: urlRef.current.value
            }
            //adding the image to database
            addImageToDB(image);
            //clearing the input
            clearInput();
            return;
        }
        //while adding a fresh image
        const image = {
            id: update.id,
            albumName: albumName,
            title: titleRef.current.value,
            url: urlRef.current.value
        }
        //calling to update image in the database
        updateImg(image);
        //reseting update to null
        setUpdate(null);



    }

    return (
        <>
            {/* rendering conditionally */}
            {carouselToggler ? undefined : <section className="w-[50%] bg-slate-200 flex items-center justify-around rounded-lg m-5 p-5 flex-col">
                <h1 className="font-bold text-[2rem] m-2 ">{update ? `Update image to ${album.name}` : `Add image to ${album.name}`}</h1>
                <input type="text" placeholder="Title"
                    className="w-[90%] p-2 rounded-full m-5 focus:border-red-500 "
                    ref={titleRef}
                />
                <input type="text" placeholder="Image URL"
                    className="w-[90%] p-2 rounded-full m-5 "
                    ref={urlRef}
                />
                <div className="flex flex-wrap flex-row items-center justify-center">
                    <button className="m-5 rounded-full  border-[3px] p-2 border-blue-500 font-bold hover:bg-blue-500 hover:text-white hover:text-[1rem] ease-in duration-300"
                        onClick={clearInput}
                    >Clear</button>
                    <button className={update ? " m-5 rounded-full  border-[3px] p-2 border-black font-bold hover:bg-black hover:text-white hover:text-[1rem] ease-in duration-300" : " m-5 rounded-full  border-[3px] p-2 border-red-500 font-bold hover:bg-red-500 hover:text-white hover:text-[1rem] ease-in duration-300"}
                        onClick={addImage}
                    >{update ? "Update" : "Add"}</button>
                </div>

            </section>}

        </>
    )
}

export default ImageForm;