import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="   py-10">
            <div className="bg-color shadow-custom container mx-auto px-4 py-14 w-5/6 rounded-md">
                {/* Container for the icons and text links */}
                <div className="flex flex-col items-center">
                    {/* Social Media Icons */}
                    <div className="flex justify-center space-x-4 mb-4">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FaFacebookF className="text-gray-600 hover:text-blue-600" size={20} />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FaInstagram className="text-gray-600 hover:text-pink-600" size={20} />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <FaTwitter className="text-gray-600 hover:text-blue-400" size={20} />
                        </a>
                    </div>
                    {/* Text Links */}
                    <div className="flex flex-wrap justify-center space-x-4">
                        <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
                        <a href="/terms-of-use" className="text-gray-600 hover:text-gray-900">Terms of Use</a>
                        <a href="/privacy-policy" className="text-gray-600 hover:text-gray-900">Privacy Policy</a>
                        <a href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
