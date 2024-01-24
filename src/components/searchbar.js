import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import BlogCard from '../components/blogcard';

const POSTS_PER_PAGE = 6; // Number of blogs per page

function SearchBlog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const db = getFirestore();
        const blogsCollection = collection(db, 'posts');
        const querySnapshot = await getDocs(blogsCollection);
        const blogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTotalPosts(blogs.length); // Set the total number of posts
        setAllBlogs(blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    // Calculate the starting point for pagination
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const filtered = allBlogs
      .filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(startIndex, endIndex);
    setFilteredBlogs(filtered);
  }, [searchTerm, allBlogs, currentPage]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="flex justify-center items-center mt-20 ">
        <form onSubmit={handleSearch} className="flex rounded-lg overflow-hidden w-3/4 shadow-bcustom p-3">
          <button type="submit" className="pl-3 pr-2 bg-color">
            <FaSearch className="text-gray-400 " />
          </button>
          <input
            className="py-2 pr-3 pl-1 w-full outline-none text-sm bg-color"
            type="text"
            placeholder="Search blogs"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </form>
      </div>
      <div className="flex justify-center mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-3/4">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPosts={totalPosts}
        onPageChange={handlePageChange}
      />
    </>
  );
}

// Pagination component
function Pagination({ currentPage, totalPosts, onPageChange }) {
  const pageCount = Math.ceil(totalPosts / POSTS_PER_PAGE);
  let pages = [];

  for (let i = 1; i <= pageCount; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`px-4 py-2 rounded-full border ${currentPage === i ? 'border-gray-500' : 'border-transparent'} ${currentPage === i ? 'bg-transparent text-black' : 'bg-transparent'}`}
      >
        {i}
      </button>
    );
  }

  return <div className="flex justify-center mt-20">{pages}</div>;
}


export default SearchBlog;
