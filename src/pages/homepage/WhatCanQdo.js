import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const Card = ({ title, content, imageSrc }) => {
    return (
        <div className="flip-container p-3 bg-color rounded-2xl shadow-custom hover:bg-white transform transition duration-1000 ease-in-out ">
            <div className="flipper">
                <div className="front">
                    <img src={imageSrc} alt="icon" className="h-40 w-full rounded-md" />
                    <div className="font-manrope text-lg font-medium text-gray-700 mt-5">{title}</div>

                </div>
                <div className="back text-center px-12 py-16">
                    <p className=" font-manrope text-gray-500 text-sm mt-1">{content}</p>
                </div>
            </div>
        </div>
    );
};

const SimpleCard = ({ title, content, imageSrc }) => {
    return (
        <div className="p-3 bg-color rounded-2xl mb-7">
            <img src={imageSrc} alt="icon" className="h-40 w-full rounded-md" />
            <div className="text-center px-8 py-4">
                <div className="font-manrope text-lg font-medium text-gray-700 mt-5">{title}</div>
                <p className="font-manrope text-gray-500 text-sm mt-1">{content}</p>
            </div>
        </div>
    );
};



const WhatcanQDo = () => {

    const cards = [
        { imageSrc: "https://source.unsplash.com/random", title: 'Lorem Ipsum', content: 'Creating taglines for a chatbot involves encapsulating its unique features, capabilities, and personality in a short, catchy phrase. Here are a few taglines that could fit different types of chatbots.' },
        { imageSrc: 'https://source.unsplash.com/random', title: 'Lorem Ipsum', content: 'Creating taglines for a chatbot involves encapsulating its unique features, capabilities, and personality in a short, catchy phrase. Here are a few taglines that could fit different types of chatbots.' },
        { imageSrc: 'https://source.unsplash.com/random', title: 'Lorem Ipsum', content: 'Creating taglines for a chatbot involves encapsulating its unique features, capabilities, and personality in a short, catchy phrase. Here are a few taglines that could fit different types of chatbots.' },
        { imageSrc: 'https://source.unsplash.com/random', title: 'Lorem Ipsum', content: 'Creating taglines for a chatbot involves encapsulating its unique features, capabilities, and personality in a short, catchy phrase. Here are a few taglines that could fit different types of chatbots.' },
        { imageSrc: 'https://source.unsplash.com/random', title: 'Lorem Ipsum', content: 'Creating taglines for a chatbot involves encapsulating its unique features, capabilities, and personality in a short, catchy phrase. Here are a few taglines that could fit different types of chatbots.' },
        { imageSrc: 'https://source.unsplash.com/random', title: 'Lorem Ipsum', content: 'Creating taglines for a chatbot involves encapsulating its unique features, capabilities, and personality in a short, catchy phrase. Here are a few taglines that could fit different types of chatbots.' },
    ];

    return (
        <div className="relative w-full lg:w-5/6 mx-auto mb-24 lg:mb-28 text-center">
            <h1 className="font-manrope text-2xl font-bold text-gray-700 mb-2">What can Q Do?</h1>
            <p className="font-manrope text-gray-500 font-semibold mb-10">Instant Content Generation with AI</p>
            <div className="lg:hidden w-4/5 mx-auto">
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                >
                    {cards.map((card, index) => (
                        <SwiperSlide key={index}>
                            <SimpleCard title={card.title} content={card.content} imageSrc={card.imageSrc} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* Custom Navigation Arrows */}
                <div className="swiper-button-next -translate-y-12">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right w-4 h-4">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </div>
                <div className="swiper-button-prev -translate-y-12">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left w-4 h-4">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </div>
            </div>
            <div className="hidden lg:block w-90 mx-auto"> {/* Original Card for larger screens */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 lg:gap-12 gap-8">
                    {cards.map((card, index) => (
                        <Card key={index} title={card.title} content={card.content} imageSrc={card.imageSrc} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhatcanQDo;