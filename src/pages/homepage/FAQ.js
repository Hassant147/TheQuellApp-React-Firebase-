import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const ExpandIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const CollapseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
);

const FaqItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div
            className={`lg:mb-10 mb-6 lg:py-8 py-4 lg:px-10 px-5 lg:rounded-md rounded-xl shadow-custom ${isOpen ? 'bg-white' : 'bg-color hover:bg-white'} 
          transition duration-300 ease-in-out cursor-pointer`}
            onClick={onClick}
        >
            <div className="flex">
                <p className="font-manrope text-lg font-semibold text-gray-700 flex-1 text-left">
                    {question}
                </p>
                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-color">
                    {isOpen ? <CollapseIcon /> : <ExpandIcon />}
                </div>
            </div>
            <div className={`${isOpen ? 'mt-2 text-gray-500' : 'hidden'} text-left`}>
                {answer}
            </div>
        </div>
    );
};

const FaqSection = () => {
    const [openItemIndex, setOpenItemIndex] = useState(null);
    const faqs = [
        {
            question: 'What is Webflow and why is it the best website builder?',
            answer: 'Webflow is a professional drag and drop tool built for designing websites using responsive web design best practices. It allows users to design, build, and launch websites visually, without writing code.'
        }, {
            question: 'What is Webflow and why is it the best website builder?',
            answer: 'Webflow is a professional drag and drop tool built for designing websites using responsive web design best practices. It allows users to design, build, and launch websites visually, without writing code.'
        }, {
            question: 'What is Webflow and why is it the best website builder?',
            answer: 'Webflow is a professional drag and drop tool built for designing websites using responsive web design best practices. It allows users to design, build, and launch websites visually, without writing code.'
        }, {
            question: 'What is Webflow and why is it the best website builder?',
            answer: 'Webflow is a professional drag and drop tool built for designing websites using responsive web design best practices. It allows users to design, build, and launch websites visually, without writing code.'
        },
    ];

    const handleItemClick = index => {
        setOpenItemIndex(index === openItemIndex ? null : index);
    };

    return (
        <div className="lg:mb-28 mb-24 mx-auto w-3/5 text-center">
            <h1 className="font-manrope text-2xl font-bold text-gray-700 mb-10">FAQ</h1>
            {faqs.map((faq, index) => (
                <FaqItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={index === openItemIndex}
                    onClick={() => handleItemClick(index)}
                />
            ))}
        </div>
    );
};

export default FaqSection;
