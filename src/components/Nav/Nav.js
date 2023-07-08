
import photo from './2991131.png'
function Nav(props) {
    //destructuring for conditional render
    const { carouselToggler } = props;
    return (
        <>
            {/* nav tag contains the nav items */}
            <nav className={carouselToggler ? "blur-lg top-0 w-full h-[80px] bg-gradient-to-r from-indigo-500 flex flex-row justify-start p-[40px] items-center" : "top-0 w-full h-[80px] bg-gradient-to-r from-indigo-500 flex flex-row justify-start p-[40px] items-center"}>
                {/* <div className='w-[20%] flex flex-row'>
                <a href='/'> */}
                <img
                    src={photo}
                    className='w-[3rem] cursor-pointer h-[3rem] shadow-2xl mx-[10px]'
                    alt='nav-icon'
                />
                <h1 className='font-bold text-2xl hover:text-white cursor-pointer mx-[10px]' ><a href='/'>PhotoFolio by Hrishit</a></h1>
            {/* </a>
            </div> */}
            </nav>
        </>
    )
}

export default Nav;