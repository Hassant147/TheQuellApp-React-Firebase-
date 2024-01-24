import React from 'react';
import Marquee from 'react-fast-marquee';

const images = [
    'https://source.unsplash.com/random',
    'https://source.unsplash.com/random',
    'https://source.unsplash.com/random',
    'https://source.unsplash.com/random',
];

const ImageScrollComponent = () => {
    return (
        <div className='text-center'>
            <h1 className="font-manrope text-2xl font-bold text-gray-700">Meet Q</h1>
            <p className="text-gray-500 mt-2 w-4/5 lg:w-3/6 mx-auto text-center font-semibold font-manrope mb-5">One platform, limitless connections. Simplify communication and boost
                productivity across multiple channels with ease.</p>
            <div className=' bg-color text-8xl'>
                <Marquee speed={50} play={true} loop={0} pauseOnHover={true} gradient={false} gradientColor='#F5F5FA' gradientWidth={40} direction="right">
                    {images.map((src, index) => (
                        <div className='rounded-xl p-3 mr-6 bg-slate-200'
                            key={index}
                            style={{
                                display: 'inline-block',
                                // Adjusting vertical position using margin
                                marginTop: index % 2 === 0 ? '50px' : '0px',
                            }}
                        >
                            <img className='gallery-item'
                                src={src}
                                alt={`Gallery item ${index}`}
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
            <style>
                {`
                    .gallery-item {
                        width: 364px;
                        height: 413px;
                        object-fit: cover;
                    }

                    @media (max-width: 800px) {
                        .gallery-item {
                            width: 200px; /* Adjust this value as needed for mobile devices */
                            height: 200px;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default ImageScrollComponent;
