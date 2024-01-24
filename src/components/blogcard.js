import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FaFacebook, FaLinkedinIn, FaShareAlt, FaReddit } from 'react-icons/fa'; // Assuming you're using react-icons
import { FaXTwitter } from "react-icons/fa6";

const truncateHtmlContent = (htmlContent, maxLength) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    let textContent = tempDiv.textContent || tempDiv.innerText || '';

    if (textContent.length > maxLength) {
        textContent = textContent.substr(0, maxLength) + '...';
    }
    return textContent;
};


const BlogCard = ({ blog }) => {
    const navigate = useNavigate();
    const formattedDate = blog.createdAt ? format(blog.createdAt.toDate(), 'dd MMM, yyyy') : '';

    // Determine the maximum length based on screen width
    const [maxContentLength, setMaxContentLength] = useState(window.innerWidth > 768 ? 300 : 150);
    const contentPreview = blog.content ? truncateHtmlContent(blog.content, maxContentLength) : '';

    useEffect(() => {
        const handleResize = () => {
            setMaxContentLength(window.innerWidth > 1100 ? 300 : 150);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const goToBlogDetail = () => {
        navigate(`/blog/${blog.id}`);
    };


    // for dialog box of share button
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [blogUrl, setBlogUrl] = useState('');

    const handleShareClick = () => {
        const domainUrl = 'https://thequellapp.com/blog';
        const blogPath = `/${blog.id}`; // Use blog.id instead of latestPost.id
        const fullUrl = `${domainUrl}${blogPath}`;

        setBlogUrl(fullUrl);
        navigator.clipboard.writeText(fullUrl).then(() => {
            setIsDialogVisible(true);
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    };



    const renderShareDialog = () => {
        return (
            isDialogVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-semibold mb-2">Link Copied!</h3>
                        <p>You can share this blog now:</p>
                        <p className="text-blue-500 break-all">{blogUrl}</p>
                        <button
                            onClick={() => setIsDialogVisible(false)}
                            className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )
        );
    };

    // Creating Share Links
    const createShareLink = (platform) => {
        const postUrl = encodeURIComponent(blogUrl);
        switch (platform) {
            case 'facebook':
                return `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`;
            case 'twitter':
                return `https://twitter.com/intent/tweet?url=${postUrl}`;
            case 'linkedin':
                return `https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}`;
            case 'reddit':
                return `https://reddit.com/submit?url=${postUrl}`;
            default:
                return '#';
        }
    };

    return (
        <div className="bg-color rounded-xl overflow-hidden shadow-bcustom flex flex-col justify-between h-full">
            {/* Clickable Image */}
            <div onClick={goToBlogDetail} className="cursor-pointer">
                <img className="w-full object-cover" style={{ height: '200px' }} src={blog.imageUrl} alt="Blog" />
            </div>
            <div className="p-6 flex-1">
                <div className="text-gray-600 text-xs mb-2">{formattedDate} | {blog.minutesRead} Mins</div>
                <h3 onClick={goToBlogDetail} className="text-lg font-semibold mb-3 cursor-pointer">{blog.title}</h3>
                <p className="text-gray-700 text-base">
                    {contentPreview}
                    <span onClick={goToBlogDetail} className="text-blue-500 hover:text-blue-700 cursor-pointer">Read More</span>
                </p>
            </div>
            <div className="flex justify-between items-center p-4 border-t">
                <div className="flex items-center gap-x-2">
                    {/* Share Icons */}
                    <a href={createShareLink('facebook')} target="_blank" rel="noopener noreferrer" className="text-gray-600">
                        <FaFacebook />
                    </a>
                    <a href={createShareLink('twitter')} target="_blank" rel="noopener noreferrer" className="text-gray-600">
                        <FaXTwitter />
                    </a>
                    <a href={createShareLink('linkedin')} target="_blank" rel="noopener noreferrer" className="text-gray-600">
                        <FaLinkedinIn />
                    </a>
                    <a href={createShareLink('reddit')} target="_blank" rel="noopener noreferrer" className="text-gray-600">
                        <FaReddit />
                    </a>
                </div>
                {/* Share Button */}
                <div onClick={handleShareClick} className="flex items-center space-x-1 cursor-pointer text-gray-600">
                    <FaShareAlt />
                    <span>Share</span>
                </div>
            </div>
            {renderShareDialog()} {/* Call the function here */}

        </div>
    );
};

export default BlogCard;
