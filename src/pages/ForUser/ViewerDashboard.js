import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { FaFacebook, FaLinkedinIn, FaShareAlt, FaReddit } from 'react-icons/fa'; // Assuming you're using react-icons
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';

function ViewerDashboard() {
  const [latestPost, setLatestPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [snippetLength, setSnippetLength] = useState(window.innerWidth > 768 ? 500 : 150);
  // Adjust snippet length based on screen size
  useEffect(() => {
    const handleResize = () => {
      setSnippetLength(window.innerWidth > 768 ? 500 : 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const createSnippet = (content) => {
    return content.length > snippetLength ? `${content.substring(0, snippetLength)}...` : content;
  };

  const navigate = useNavigate();
  const location = useLocation();

  // for dialog box of share button
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [blogUrl, setBlogUrl] = useState('');

  const handleShareClick = () => {
    const domainUrl = 'https://thequellapp.com/blog';
    const blogPath = `/${latestPost.id}`; // Assuming 'latestPost.id' is the unique identifier for the post
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

  useEffect(() => {
    const fetchLatestPost = async () => {
      setIsLoading(true);
      setError('');
      try {
        const q = query(collection(firestore, 'posts'), orderBy('createdAt', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);
        const postArray = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const date = data.createdAt.toDate();
          return {
            id: doc.id,
            content: data.content,
            createdAt: date,
            imageUrl: data.imageUrl,
            minutesRead: data.minutesRead,
            title: data.title
          };
        });
        if (postArray.length > 0) {
          setLatestPost(postArray[0]);
        }
      } catch (err) {
        setError('Failed to load the latest post. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestPost();
  }, []);

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  const navigateToHome = () => navigate('/');
  const navigateToContact = () => navigate('/contact');
  const navigateToBlogs = () => navigate('/blogs');

  const isActive = (path) => {
    // Normalize both paths to remove trailing slashes
    const normalizedPath = location.pathname.endsWith('/') ? location.pathname.slice(0, -1) : location.pathname;
    const normalizedRoutePath = path.endsWith('/') ? path.slice(0, -1) : path;

    return normalizedPath === normalizedRoutePath;
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
  const convertToDate = (createdAt) => {
    // Check if createdAt is a Firebase Timestamp and convert to Date
    return createdAt && createdAt.toDate ? createdAt.toDate() : createdAt;
  };

  const formattedDate = latestPost ? format(convertToDate(latestPost.createdAt), 'dd MMM, yyyy') : '';

  return (
    <div className=" bg-color pt-10 font-montserrat">
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
      {error && <div className="text-red-500 text-center">{error}</div>}
      {isLoading ? (
        <div className="text-center">Loading the latest post...</div>
      ) : (
        latestPost && (
          <TransitionGroup>
            <CSSTransition key={latestPost.id} timeout={500} classNames="fade">
              <div className="rounded-2xl shadow-bcustom w-3/4 mx-auto overflow-hidden bg-color py-4 px-6">
                {/* Clickable Image and Content */}
                <div onClick={() => handleBlogClick(latestPost.id)} className="cursor-pointer ">
                  <img src={latestPost.imageUrl} alt={latestPost.title} className="w-full object-cover h-80 rounded-t-2xl" />
                  <div className="px-4 py-4">
                    <div className="text-gray-600 text-lg mb-2">{formattedDate}&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;{latestPost.minutesRead} Mins</div>
                    <h2 className="text-2xl font-semibold">{latestPost.title}</h2>
                    <div className="text-gray-600 mt-3" dangerouslySetInnerHTML={{ __html: createSnippet(latestPost.content) }} />
                  </div>
                </div>
                <div className="px-4 pb-2 border-t pt-3">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
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
                </div>
              </div>
            </CSSTransition>
          </TransitionGroup>
        )
      )}
      {renderShareDialog()} {/* Call the function here */}

    </div>
  );
}

export default ViewerDashboard;