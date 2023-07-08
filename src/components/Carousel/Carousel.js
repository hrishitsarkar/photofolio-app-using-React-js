import left from './prev.png';
import right from './right.png'
import cross from './cross.png'
import styles from './Carousel.module.css';
const Carousel = (props) => {
    //destructuring
    const { next, prev, index, carousel, setCarouselToggler } = props;
    return (
        <>
            {/* rendering image from carousel array */}
            {carousel.map((c, i) => {
                if (i === index) {
                    return (
                        <section key={i} className="w-full p-5 ease-in duration-300 h-full flex flex-row items-center justify-around relative">
                            <img src={left}
                                className='h-[100px] w-[100px] hover:bg-slate-200 p-5'
                                onClick={prev}
                            />
                            
                            <img
                                src={c.url}
                                className={styles.carousel}
                            />
                            
                            <img src={right}
                                className='h-[100px] w-[100px] hover:bg-slate-200 p-5'
                                onClick={next}
                            />
                            <img src={cross}
                                className='h-[20px] w-[20px] absolute top-[-5px] right-[280px] scale-[1.5] rounded-full hover:scale-[2] hover:bg-red-600 max-[640px]:right-[80px] max-[768px]:right-[100px] max-[1024px]:right-[80px] max-[1280px]:right-[80px] max-[1536px]:right-[80px]'
                                onClick={() => setCarouselToggler(false)} />
                        </section>
                    )
                }
            })}


        </>
    )
}
export default Carousel;