import React from "react";
import Marquee from "react-fast-marquee";

const textStyle = {
    color: 'rgba(67, 67, 67, 0.51)',
    textAlign: 'center',
    fontFamily: 'Manrope, sans-serif', // Include a fallback font
    fontStyle: 'normal',
    fontWeight: '800',
    lineHeight: 'normal'
};

const ScrollingText = () => {
    return (
        <div className="lg:mb-28 mb-24 bg-color lg:mt-10 lg:text-66 text-46">
            <Marquee
                play={true}
                pauseOnHover={true}
                speed={50}
                direction="left"
                delay={0}
                loop={0}
                gradient={false}
                gradientColor='#F5F5FA'
                gradientWidth={100}
                style={textStyle}
            >
                This is a sample text that will scroll infinitely. Hover to pause.      
                This is a sample text that will scroll infinitely. Hover to pause.
            </Marquee>
            <style>
                {`
                    @media (max-width: 768px) {
                        .text-46 {
                            font-size: 30px; /* Adjust this value as needed for mobile devices */
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default ScrollingText;
