
import photo from './2991131.png'
function Nav(){
    return (
        <>
    <nav className="fixed top-0 z-[100] w-full h-[80px] bg-gradient-to-r from-indigo-500 flex flex-row justify-start p-[40px] items-center">
    <img 
    src={photo}
    className='w-[3rem] cursor-pointer h-[3rem] shadow-2xl mx-[10px]'
    alt='nav-icon'
    />
    <h1 className='font-bold text-2xl hover:text-white cursor-pointer mx-[10px]'>PhotoFolio by Hrishit</h1>

    </nav>
        </>
    )
}

export default Nav;