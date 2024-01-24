import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase'; // Adjust the path to your firebase.js file
import { collection, getDocs } from 'firebase/firestore';
import DOMPurify from 'dompurify';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const BlogCard = ({ image, date, title, description, id }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    const goToBlogDetail = () => {
        navigate(`/blog/${id}`);
    };

    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-color shadow-custom hover:bg-white hover:scale-105 transform transition duration-500 ease-in-out">
            <div className="px-4 py-4 flex flex-col">
                <img className="w-full rounded-lg mb-4" src={image} alt="Blog post" />
                <div className="flex justify-between items-center mb-4">
                    <div
                        className=" left-align-title"
                        style={{
                            color: '#707070', // Tailwind doesn't have a utility for this exact color
                            fontFamily: 'Poppins, sans-serif', // Include a fallback font
                            fontSize: '15px', // Specific font-size, use inline style
                            fontStyle: 'normal', // This is default, not needed in inline style
                            fontWeight: '500', // Tailwind's font-medium class applies 'font-weight: 500;'
                            lineHeight: '20.304px', // Specific line-height, use inline style
                            letterSpacing: '0.371px' // Specific letter-spacing, use inline style
                        }}
                    >
                        {title}
                    </div>
                    <div className="text-sm text-gray-500 whitespace-nowrap">{date}</div>
                </div>
                <div
                    className="lg:mb-2 text-gray-700 font-semibold left-align-title"
                    style={{
                        color: '#BFBFBF', // Use your specific color
                        fontFamily: 'Poppins, sans-serif', // Include a fallback font
                        fontSize: '18px', // Tailwind doesn't support this specific size out of the box
                        fontStyle: 'normal', // This is the default style, so it's not necessary to include
                        fontWeight: '600', // You can use Tailwind's font-semibold class for this
                        lineHeight: '28px', // Tailwind doesn't support this specific line height out of the box
                        letterSpacing: '0.371px' // Tailwind doesn't support this specific letter spacing out of the box
                    }}
                    dangerouslySetInnerHTML={{ __html: description }}
                >
                </div>
                <hr className="border-gray-300" />
                <button onClick={goToBlogDetail}
                    className="flex items-center mt-2 text-purple1 hover:text-violet-800 font-semibold py-2 text-sm">
                    Read More <span className="inline-block ml-2">→</span>
                </button>
            </div>
        </div>
    );
};

const BlogSection = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

    const handleClick = () => {
        navigate('/blogs'); // Navigate to /blogs page
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError('');
            try {
                const data = await getDocs(collection(firestore, 'posts'));
                const posts = data.docs.map(doc => {
                    const data = doc.data();
                    const sanitizedDescription = DOMPurify.sanitize(data.content, { USE_PROFILES: { html: true } });
                    return {
                        id: doc.id,
                        image: data.imageUrl,
                        title: data.title,
                        date: format(data.createdAt.toDate(), 'PPP'),
                        description: sanitizedDescription.substring(0, 150) + '...',
                    };
                });
                setBlogPosts(posts);
            } catch (err) {
                setError('Failed to load posts. Please try again later.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-5/6 mx-auto lg:mb-20 mb-24">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold text-center mb-10 lg:mb-14">
                    <span style={{ color: '#606060', fontFamily: 'Poppins, sans-serif', fontSize: '38.44px', fontWeight: '600', lineHeight: '38.44px', letterSpacing: '0.801px' }}>
                        Latest From the
                    </span>
                    <span style={{ color: '#7C3AED', fontFamily: 'Poppins, sans-serif', fontSize: '38.44px', fontWeight: '600', lineHeight: '38.44px', letterSpacing: '0.801px' }}>
                        &nbsp;Blog
                    </span>
                </h2>
                <div className="flex justify-center">
                    <div className="grid md:grid-cols-3 gap-4">
                        {blogPosts.map((post, index) => (
                            <BlogCard key={index} {...post} navigate={navigate} />
                        ))}

                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleClick}
                    className="bg-color hover:bg-white text-gray-500 hover:text-purple1 font-bold py-5 lg:px-16 px-10 rounded-xl shadow-custom mt-5 lg:mt-8"
                >
                    View More Blogs
                </button>
            </div>
        </div>
    );
};

export default BlogSection;
