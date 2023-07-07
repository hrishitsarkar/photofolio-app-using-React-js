import left from './prev.png';
import right from './right.png'
import cross from './cross.png'
const Carousel = (props) => {

    const {carousel,setCarouselToggler} = props;
    console.log(carousel)
    return (
        <>
            <section className="w-full p-5 ease-in duration-300 h-full flex flex-row items-center justify-around relative">
                <img src={left}
                className='h-[20px] w-[20px]   ' />
                
                <img 
                    src={carousel.url}
                    className='w-[1024px] h-[568px] border-8 border-zinc-950 object-fill'
                />
                
                <img src={right}
                className='h-[20px] w-[20px]  ' />
                <img src={cross}
                className='h-[20px] w-[20px] absolute top-[-10px] right-[100px] scale-[1.5] rounded-full hover:scale-[2] hover:bg-red-600  '
                onClick={() => setCarouselToggler(false)} />
            </section>
        </>
    )
}
export default Carousel;