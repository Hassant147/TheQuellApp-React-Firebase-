import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { FaFacebook, FaTwitter, FaLinkedinIn, FaReddit, FaShareAlt } from 'react-icons/fa';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const fetchBlog = async () => {
            const db = getFirestore();
            const blogRef = doc(db, 'posts', id);
            const blogSnap = await getDoc(blogRef);

            if (blogSnap.exists()) {
                setBlog({ id: blogSnap.id, ...blogSnap.data() });
            } else {
                console.log('No such blog!');
            }
        };

        fetchBlog();
    }, [id]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    const blogContent = { __html: blog.content }; // Assuming 'content' is your HTML content

    const navigateToHome = () => navigate('/');
    const navigateToContact = () => navigate('/contact');
    const navigateToBlogs = () => navigate('/blogs');

    const isActive = (path) => {
        // Normalize both paths to remove trailing slashes
        const normalizedPath = location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname;
        const normalizedRoutePath = path.endsWith('/') ? path.slice(0, -1) : path;

        return normalizedPath === normalizedRoutePath;
    };
    return (
        <div className="bg-beige-100 min-h-screen p-6">
            <div className="flex justify-center space-x-4 mb-32 bg-white mx-auto p-4 lg:w-1/3 rounded-full w-5/6 shadow">
                <button
                    className={`lg:text-xl font-semibold lg:py-2 py-1 lg:px-4 px-2 rounded-full text-gray-700 ${isActive('/') ? 'bg-gray-300' : 'bg-white'}`}
                    onClick={navigateToHome}
                >
                    Home
                </button>
                <button
                    className={`lg:text-xl font-semibold lg:py-2 py-1 lg:px-4 px-2 rounded-full text-gray-700 ${isActive('/contact') ? 'bg-gray-300' : 'bg-white'}`}
                    onClick={navigateToContact}
                >
                    Contact Us
                </button>
                <button
                    className={`lg:text-xl font-semibold lg:py-2 py-1 lg:px-4 px-2 rounded-full text-gray-700 ${isActive('/blogs') ? 'bg-gray-300' : 'bg-white'}`}
                    onClick={navigateToBlogs}
                >
                    Blogs
                </button>
            </div>

            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-4">
                    <div>
                        <div className="text-sm text-gray-500">{format(new Date(blog.createdAt.seconds * 1000), 'PPP')} - {blog.minutesRead} min read</div>
                    </div>
                </div>
                <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
                <p className="text-lg mb-6">{blog.subtitle}</p> {/* Assuming you have a subtitle */}
                <img className="w-full mb-6" src={blog.imageUrl} alt="Blog" />
                <article className="blog-content mb-8" dangerouslySetInnerHTML={blogContent} />
                <div className="flex justify-between items-center p-4 border-t  border-b border-gray-600 ">
                    <div className="flex items-center gap-x-2">
                        <FaFacebook className="text-gray-600" />
                        <FaTwitter className="text-gray-600" />
                        <FaLinkedinIn className="text-gray-600" />
                        <FaReddit className="text-gray-600" />
                    </div>
                    <div className="flex items-center space-x-1 cursor-pointer text-gray-600">
                        <FaShareAlt />
                        <span>Share</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BlogDetail;
