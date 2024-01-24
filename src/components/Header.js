import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';

const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
};

const scrollWithOffset = (el, offset) => {
    const start = window.pageYOffset;
    const elementPosition = el.offsetTop - offset;
    const distance = elementPosition - start;
    const duration = 800;
    let startTime = null;

    const animation = currentTime => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const next = easeInOutQuad(timeElapsed, start, distance, duration);
        window.scrollTo(0, next);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
};

const Header = () => {
    const headerHeight = 100; // Adjust this value based on your header's height
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setHasScrolled(offset > window.innerHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={`fixed top-0 left-0 w-full z-30 transition ease-in-out duration-300 ${hasScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-7">
                <div className="flex justify-between items-center">
                    <div className="text-xl font-bold">LOGO</div>
                    <div className="md:hidden" onClick={toggleMenu}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </div>
                    <nav className={`fixed inset-0 lg:relative transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:pt-0 pt-16 h-1/3 lg:h-auto  lg:translate-x-0 bg-white opacity-95 z-40 transition-transform duration-300  lg:flex lg:flex-row lg:bg-transparent lg:opacity-100`}>
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:h-auto lg:space-y-0 space-y-5 lg:space-x-16 w-full">
                            <button onClick={toggleMenu} className="absolute top-4 right-4 lg:hidden">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            <HashLink to="/#meet-q" scroll={el => scrollWithOffset(el, headerHeight)}
                                className="hover:text-gray-600 textStyle" onClick={toggleMenu}>Meet Q</HashLink>
                            <HashLink to="/#how-it-works" scroll={el => scrollWithOffset(el, headerHeight)}
                                className="hover:text-gray-600 textStyle" onClick={toggleMenu}>How it works</HashLink>
                            <HashLink to="/#what-can-q-do" scroll={el => scrollWithOffset(el, headerHeight)}
                                className="hover:text-gray-600 textStyle" onClick={toggleMenu}>What Can Q do?</HashLink>
                            <HashLink to="/#faq" scroll={el => scrollWithOffset(el, headerHeight)}
                                className="hover:text-gray-600 textStyle" onClick={toggleMenu}>FAQ</HashLink>
                            <HashLink to="/#blogs" scroll={el => scrollWithOffset(el, headerHeight)}
                                className="hover:text-gray-600 textStyle" onClick={toggleMenu}>Blogs</HashLink>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
