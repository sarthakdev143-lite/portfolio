const Header = () => {
    return (
        <header className="w-full h-fit flex justify-center sticky top-0 z-50 bg-white bg-opacity-0 mix-blend-difference transition-all duration-500 ease-in-out hover:backdrop-filter hover:backdrop-blur-lg">
            <nav className="bg-transparent transition-all duration-500 ease-in-out py-6 px-12 w-full h-fit flex items-center z-10">
                <ul className="list-none flex justify-between w-full items-center gap-6 flex-wrap">
                    <section className="flex flex-grow justify-center">
                        <li id='logo' className='cursor-hover max-h-[2.6rem] select-none overflow-y-hidden relative px-[0.45rem] group'>
                            <h1 className='first logo whitespace-nowrap min-h-[2.6rem] grid place-items-center text-clamp transition-all duration-300 text-white font-semibold text-shadow-white-glow mix-blend-difference transform group-hover:-translate-y-[2.6rem]'>Sarthak Parulekar</h1>
                            <h1 className='second logo whitespace-nowrap min-h-[2.6rem] grid place-items-center text-clamp transition-all duration-300 text-white font-semibold text-shadow-white-glow mix-blend-difference transform group-hover:-translate-y-[2.6rem]'>Sarthak Parulekar</h1>
                        </li>
                    </section>
                    <section className='text-black flex flex-grow justify-center gap-8'>
                        <a href="https://github.com/sarthakdev143" rel="noreferrer" target='_blank' className='cursor-hover text-[2rem] text-black bg-white w-[3.75rem] h-[3.75rem] grid place-items-center rounded-full transition-all duration-300 ease-in-out shadow-custom-white hover:shadow-custom-dual hover:scale-95'>
                            <li>
                                <i className='ri-github-fill'></i>
                            </li>
                        </a>
                        <a href="https://linkedin.com/in/sarthak-parulekar/" rel="noreferrer" target='_blank' className='cursor-hover text-[2rem] text-black bg-white w-[3.75rem] h-[3.75rem] grid place-items-center rounded-full transition-all duration-300 ease-in-out shadow-custom-white hover:shadow-custom-dual hover:scale-95'>
                            <li>
                                <i className='ri-linkedin-fill'></i>
                            </li>
                        </a>
                        <a href="https://instagram.com/_sarthak.parulekar" rel="noreferrer" target='_blank' className='cursor-hover text-[2rem] text-black bg-white w-[3.75rem] h-[3.75rem] grid place-items-center rounded-full transition-all duration-300 ease-in-out shadow-custom-white hover:shadow-custom-dual hover:scale-95'>
                            <li>
                                <i className='ri-instagram-line'></i>
                            </li>
                        </a>
                    </section>
                </ul>
            </nav>
        </header>
    )
}

export default Header;