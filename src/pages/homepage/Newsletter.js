import React, { useState } from 'react';

const NewsletterSubscription = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!emailRegex.test(email)) {
            setMessage('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);
        setMessage('');

        try {
            // Update the URL with your Google Script URL
            const scriptURL = 'https://script.google.com/macros/s/AKfycbxP7oa438nDGaKrPJHD1PXELjv9LrAJE8gFdyfLdnIPwJk0ffVuxpEVAjrm0_lKner7/exec';
            const formData = new FormData();
            formData.append('email', email);

            const response = await fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                body: formData,
            });

            // Since we're using 'no-cors', we won't get a success response
            setEmail('');
            setShowModal(true); // Show modal on success
        } catch (error) {
            setMessage('An error occurred while submitting your email. Please try again.');
        }

        setIsSubmitting(false);
    };

    // Modal component
    const Modal = ({ onClose }) => {
        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                <div className="modal-enter modal-enter-active bg-white rounded-lg shadow p-6 m-4 max-w-sm max-h-full text-center">
                    <h2 className="text-2xl font-semibold">Success!</h2>
                    <p className="my-4">Thank you for subscribing to our newsletter!</p>
                    <button
                        onClick={onClose}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="lg:mb-20 mb-10 text-left mx-auto w-5/6 p-6 lg:p-28 bg-color rounded-xl shadow-custom hover:bg-white hover:scale-105 transform transition duration-500 ease-in-out">
            <h2 className='text-3xl lg:text-5xl mb-4 lg:mb-0 w-full' style={{ color: '#5B5B5B', fontFamily: 'Poppins, sans-serif', fontStyle: 'normal', fontWeight: '400', lineHeight: '115%', letterSpacing: '0.647px' }}>
                Subscribe to Our Newsletter
            </h2>
            <p className='text-base lg:text-lg mb-4 w-full' style={{ color: '#999', fontFamily: 'Poppins, sans-serif', fontStyle: 'normal', fontWeight: '400', lineHeight: '160%', letterSpacing: '0.174px' }}>
                Get weekly update about our product on your email, no spam guaranteed we promise 👍
            </p>
            {message && <p className="text-sm mt-2">{message}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row justify-between items-center mt-4">
                <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 mb-4 lg:mb-0 mr-0 lg:mr-4 p-4 border border-gray-300 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                />
                <button
                    type="submit"
                    className="bg-violet-500 text-white px-4 py-2 rounded shadow hover:bg-purple-700 disabled:opacity-50"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'SUBSCRIBE'}
                </button>
            </form>
            {showModal && <Modal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default NewsletterSubscription;
