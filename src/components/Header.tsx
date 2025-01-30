const Header = () => {
    return (
        <header className="w-full h-fit flex justify-center sticky top-0 z-50 bg-white bg-opacity-0 mix-blend-difference transition-all duration-1000 ease-in-out hover:backdrop-filter hover:backdrop-blur-md">
            <nav className="bg-transparent transition-all duration-500 ease-in-out py-4 sm:py-6 px-4 sm:px-12 w-full h-fit flex items-center z-10">
                <ul className="list-none flex flex-col sm:flex-row justify-between max-w-[80rem] w-full mx-auto items-center sm:gap-6">
                    <section className="flex justify-center w-full sm:w-auto">
                        <li id='logo' className='cursor-hover max-h-[2.6rem] select-none overflow-y-hidden relative px-[0.45rem] group'>
                            <h1 className='first logo whitespace-nowrap min-h-[2.6rem] grid place-items-center text-2xl sm:text-clamp transition-all duration-300 text-white font-semibold text-shadow-white-glow mix-blend-difference transform group-hover:-translate-y-[2.6rem]'>
                                Sarthak Parulekar
                            </h1>
                            <h1 className='second logo whitespace-nowrap min-h-[2.6rem] grid place-items-center text-2xl sm:text-clamp transition-all duration-300 text-white font-semibold text-shadow-white-glow mix-blend-difference transform group-hover:-translate-y-[2.6rem]'>
                                Sarthak Parulekar
                            </h1>
                        </li>
                    </section>
                    <section className='text-black flex justify-center gap-4 sm:gap-8 mt-4 sm:mt-0'>
                        <a
                            href="https://github.com/sarthakdev143"
                            rel="noreferrer"
                            target='_blank'
                            className='cursor-hover text-2xl sm:text-[2rem] text-black bg-white w-12 h-12 sm:w-[3.75rem] sm:h-[3.75rem] grid place-items-center rounded-full transition-all duration-300 ease-in-out shadow-custom-white hover:shadow-custom-dual hover:scale-95'
                        >
                            <li>
                                <i className='ri-github-fill'></i>
                            </li>
                        </a>
                        <a
                            href="https://linkedin.com/in/sarthak-parulekar/"
                            rel="noreferrer"
                            target='_blank'
                            className='cursor-hover text-2xl sm:text-[2rem] text-black bg-white w-12 h-12 sm:w-[3.75rem] sm:h-[3.75rem] grid place-items-center rounded-full transition-all duration-300 ease-in-out shadow-custom-white hover:shadow-custom-dual hover:scale-95'
                        >
                            <li>
                                <i className='ri-linkedin-fill'></i>
                            </li>
                        </a>
                        <a
                            href="https://instagram.com/_sarthak.parulekar"
                            rel="noreferrer"
                            target='_blank'
                            className='cursor-hover text-2xl sm:text-[2rem] text-black bg-white w-12 h-12 sm:w-[3.75rem] sm:h-[3.75rem] grid place-items-center rounded-full transition-all duration-300 ease-in-out shadow-custom-white hover:shadow-custom-dual hover:scale-95'
                        >
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