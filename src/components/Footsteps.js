import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as Footstep1 } from '../Media/ft1.svg';
import { ReactComponent as Footstep2 } from '../Media/ft2.svg';

const Footsteps = () => {
    const [footsteps, setFootsteps] = useState([]);
    const lastScrollY = useRef(window.scrollY);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const totalHeight = document.documentElement.scrollHeight;

            // Increase the ratio to create more footsteps for the same amount of scroll
            const ratio = 100; // Adjust this value to increase/decrease density of footsteps
            const newFootstepCount = Math.floor((currentScrollY / totalHeight) * ratio);

            if (newFootstepCount > footsteps.length) {
                // Add footsteps
                const newFootsteps = Array.from({ length: newFootstepCount - footsteps.length }, (_, i) => i + footsteps.length).map(index => ({
                    id: `footstep-${index}`,
                    yPos: `${(5+ windowHeight / ratio) * index}px`,
                    xPos: `${getZigzagXPosition(index)}%`,
                    Component: index % 2 === 0 ? Footstep1 : Footstep2
                }));

                setFootsteps([...footsteps, ...newFootsteps]);
            } else if (newFootstepCount < footsteps.length) {
                // Remove footsteps
                setFootsteps(footsteps.slice(0, newFootstepCount));
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [footsteps]);


    return (
        <div className="footsteps-container">
            {footsteps.map(footstep => {
                const FootstepSVG = footstep.Component;
                return (
                    <FootstepSVG
                        key={footstep.id}
                        className="footstep"
                        style={{ top: footstep.yPos, left: footstep.xPos }}
                    />
                );
            })}
        </div>
    );
};

const getZigzagXPosition = (index) => {
    const waveAmplitude = 50; // Increased range for zigzag to cover full width
    const waveFrequency = 0.5; // Adjust frequency for more gradual zigzag
    // The sine function will oscillate between -1 and 1, so by adding 50 and multiplying
    // the amplitude by 2, we can cover the range from 0% to 100% (full width)
    return 50 + waveAmplitude * Math.sin(index * waveFrequency) * 2;
};

export default Footsteps;
