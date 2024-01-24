import React, { useState, useEffect, useRef } from 'react';
import bgImage from '../../Media/bg1.svg';
import elements from '../../Media/elements.svg';
import sun from '../../Media/sun.svg';
import bgImageMobile from '../../Media/mbg.svg';

const HeroComponent = ({ setEnableScroll, setHeroComplete }) => {
    const [offsetY, setOffsetY] = useState(0);
    const heroSectionRef = useRef(null);
    const foregroundRef = useRef(null);
    const sunRef = useRef(null);

    // Check if the current screen size is mobile
    const isMobile = window.innerWidth < 1024;

    useEffect(() => {
        if (!isMobile) {
            // Function to handle the scroll event
            const handleHeroScroll = () => {
                const newOffsetY = heroSectionRef.current.scrollTop;
                const heroHeight = heroSectionRef.current.clientHeight;

                const maxScale = 1.3;
                const minScale = 1.1;
                const scale = maxScale - ((newOffsetY / heroHeight) * (maxScale - minScale));

                if (foregroundRef.current) {
                    foregroundRef.current.style.transform = `scale(${scale})`;
                }

                setOffsetY(newOffsetY);

                const isHeroComplete = newOffsetY >= heroHeight;
                setHeroComplete(isHeroComplete);
                setEnableScroll(isHeroComplete);

                if (sunRef.current) {
                    const sunPosition = -newOffsetY * 0.5;
                    sunRef.current.style.transform = `translateY(${sunPosition}px)`;
                }
            };

            // Check if the ref is attached to the DOM element
            const heroSection = heroSectionRef.current;
            if (heroSection) {
                heroSection.addEventListener('scroll', handleHeroScroll);
                // Return a cleanup function
                return () => heroSection.removeEventListener('scroll', handleHeroScroll);
            }
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            // Example: Automatically set hero as complete after 0 seconds
            const timer = setTimeout(() => {
                setHeroComplete(true);
                setEnableScroll(true);
            }, 0);

            return () => clearTimeout(timer);
        } else {
            // existing non-mobile logic...
        }
    }, [isMobile, setHeroComplete, setEnableScroll]);
    return (
        <>
            {!isMobile && (
                <div ref={heroSectionRef} className="hero-scroll-container">
                    <div
                        className="background-image"
                        style={{
                            scale: '1',
                            height: '200vh',
                            backgroundImage: `url(${bgImage})`,
                            backgroundPositionY: -offsetY * 0.5 + 'px',
                        }}
                    ></div>
                    <img
                        ref={sunRef}
                        src={sun}
                        alt="Sun"
                        className="sun-image"
                        style={{ position: 'absolute', bottom: '-130%', left: '40%', transform: 'translate(-50%, -50%)' }}
                    />
                    <div className="foreground-container">
                        <img
                            ref={foregroundRef}
                            src={elements}
                            alt="Foreground Elements"
                            className="foreground-image"
                        />
                    </div>
                    <div className="text-block">
                        <p>“TALK SMART”</p>
                        <p id='sm-txt'>Chatting Redefined – Effortless, Efficient, and Empowering</p>
                    </div>
                </div>
            )}
            {isMobile && (
                <div className="mobile-hero-container">
                    <img src={bgImageMobile} alt="Mobile Hero" className="mobile-hero-image" />
                </div>
            )}
        </>
    );
};

export default HeroComponent;
