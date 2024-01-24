import React, { useState, useEffect } from 'react';
import { firestore, storage } from '../../firebase';
import {
  collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp,
  query, orderBy, limit, startAfter, where
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import LogoutButton from '../../components/LogoutButton';

const generateUniqueFilename = (originalFilename) => {
  const timestamp = Date.now();
  const fileExtension = originalFilename.split('.').pop();
  const uniqueFilename = `${timestamp}.${fileExtension}`;
  return uniqueFilename;
};

function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', imageUrl: '', minutesRead: '' });
  const [editingPost, setEditingPost] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const postsPerPage = 10;
  // Add a new state variable for the "minutes read" input in the new post form
  const [minutesRead, setMinutesRead] = useState('');

  const [resetQuill, setResetQuill] = useState(false);  // New state for resetting ReactQuill
  // Added state variables for search and filters
  const [searchTitle, setSearchTitle] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterMinutesRead, setFilterMinutesRead] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const [expandedPosts, setExpandedPosts] = useState({});

  // Function to reset the form
  const resetForm = () => {
    setNewPost({ title: '', content: '', imageUrl: '' });
    setMinutesRead(''); // Reset the minutes read for the new post form
    setImageFile(null);
    setResetQuill(prev => !prev);  // Toggle the resetQuill state
  }

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let queryConstraints = [];

      // Search by title
      if (searchTitle) {
        queryConstraints.push(where('title', '==', searchTitle));
      }

      // Filter by date
      if (filterDate) {
        const selectedDate = new Date(filterDate);
        selectedDate.setHours(0, 0, 0, 0); // start of the day
        const endDate = new Date(selectedDate);
        endDate.setHours(23, 59, 59, 999); // end of the day
        queryConstraints.push(where('createdAt', '>=', selectedDate));
        queryConstraints.push(where('createdAt', '<=', endDate));
      }

      // Filter by minutes read
      if (filterMinutesRead) {
        queryConstraints.push(where('minutesRead', '==', parseInt(filterMinutesRead)));
      }
      // Sorting
      queryConstraints.push(orderBy('createdAt', sortOrder));
      queryConstraints.push(limit(postsPerPage));

      let queryRef = query(collection(firestore, 'posts'), ...queryConstraints);
      const querySnapshot = await getDocs(queryRef);
      const newPosts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setPosts(newPosts);

      // Handle lastVisible for pagination if necessary
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (!imageFile) return null;
    const uniqueImageName = generateUniqueFilename(imageFile.name);
    const storageRef = ref(storage, `posts/${uniqueImageName}`);
    const snapshot = await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content || !minutesRead) {
      setFeedback('Title, content, and minutes read are required.');
      return;
    }
    try {
      const imageUrl = await uploadImage();
      const newPostData = {
        ...newPost,
        minutesRead: parseInt(minutesRead), // Convert to integer before storing
        imageUrl,
        createdAt: serverTimestamp()
      };
      await addDoc(collection(firestore, 'posts'), newPostData);
      setPosts([newPostData, ...posts]);

      resetForm();
      setShowDialog(true);
      setFeedback('Post created successfully.');
    } catch (error) {
      console.error("Error adding post: ", error);
      setFeedback('Error creating post.');
    }
  };

  const handleUpdatePost = async () => {
    if (!editingPost.title || !editingPost.content) {
      setFeedback('Title and content are required.');
      return;
    }
    try {
      let imageUrl = editingPost.imageUrl;
      if (imageFile) {
        imageUrl = await uploadImage();
      }
      const postRef = doc(firestore, 'posts', editingPost.id);
      await updateDoc(postRef, {
        ...editingPost,
        imageUrl,
        updatedAt: serverTimestamp()
      });
      setPosts(posts.map(post => post.id === editingPost.id ? { ...editingPost, imageUrl } : post));

      resetForm();
      setFeedback('Post updated successfully.');
    } catch (error) {
      console.error("Error updating post: ", error);
      setFeedback('Error updating post.');
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'posts', id));
      setPosts(posts.filter(post => post.id !== id));
      setFeedback('Post deleted successfully.');
    } catch (error) {
      console.error("Error deleting post: ", error);
      setFeedback('Error deleting post.');
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
    setFeedback('');
  };
  useEffect(() => {
    console.log('NewPost state updated:', newPost);
  }, [newPost]);

  function formatDate(timestamp) {
    let date;
    if (timestamp && typeof timestamp.toDate === 'function') {
      // Firestore Timestamp object
      date = timestamp.toDate();
    } else if (timestamp) {
      // Already a JavaScript Date object or a string that can be converted
      date = new Date(timestamp);
    } else {
      // In case timestamp is null, undefined, or not convertible to a date
      return 'Invalid date';
    }

    return `${date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })} at ${date.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}`;
  }


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="absolute top-0 right-0 mt-2 mr-2">
        <LogoutButton />
      </div>
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
      {/* Dialog Box for Feedback */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p>{feedback}</p>
            <button onClick={closeDialog} className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md mt-4">Close</button>
          </div>
        </div>
      )}

      {/* New Post Form */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
        <input type="text" value={newPost.title} onChange={e => setNewPost({ ...newPost, title: e.target.value })} placeholder="Title" className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md" />
        <ReactQuill
          key={resetQuill ? 'reset' : 'not-reset'}  // Use key based on resetQuill state
          value={newPost.content}
          onChange={content => setNewPost({ ...newPost, content })}
          className="mb-4"
        />
        <input
          type="number"
          value={minutesRead}
          onChange={e => setMinutesRead(e.target.value)}
          placeholder="Minutes Read"
          className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
        />
        <input type="file" onChange={handleImageChange} className="mb-4" />
        <button onClick={handleCreatePost} className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md">Create Post</button>
      </div>

      {/* Edit Post Form */}
      {editingPost && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
          <input type="text" value={editingPost.title} onChange={e => setEditingPost({ ...editingPost, title: e.target.value })} className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md" />
          <ReactQuill value={editingPost.content} onChange={content => setEditingPost({ ...editingPost, content })} className="mb-4" />
          {editingPost.imageUrl && <img src={editingPost.imageUrl} alt="Post" className="my-2 max-w-full h-auto" />}
          <input type="file" onChange={handleImageChange} className="mb-4" />
          <button onClick={handleUpdatePost} className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md">Update Post</button>
          <button onClick={() => setEditingPost(null)} className="ml-2 py-2 px-4 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-md">Cancel</button>
        </div>
      )}
      {/* Search and Filter Inputs */}
      <div className="mb-4">
        {/* Search by Title */}
        <input type="text" value={searchTitle} onChange={e => setSearchTitle(e.target.value)} placeholder="Search by title" className="px-3 py-2 border border-gray-300 rounded-md mr-2" />

        {/* Filter by Date */}
        <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md mr-2" />

        {/* Filter by Minutes Read */}
        <input type="number" value={filterMinutesRead} onChange={e => setFilterMinutesRead(e.target.value)} placeholder="Filter by minutes read" className="px-3 py-2 border border-gray-300 rounded-md mr-2" />

        {/* Sorting */}
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-md mr-2">
          <option value="desc">Newest to Oldest</option>
          <option value="asc">Oldest to Newest</option>
        </select>

        <button onClick={fetchPosts} className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md">
          Apply Filters
        </button>
      </div>
      {/* Posts Display */}
      <TransitionGroup className="space-y-4">
        {posts.map(post => (
          <CSSTransition key={post.id} timeout={300} classNames="fade">
            <div className="bg-white p-4 rounded-lg shadow-md">
            {post.imageUrl && <img src={post.imageUrl} alt="Post" loading="lazy" className="my-2 max-w-full h-auto" />}
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500">Posted on {formatDate(post.createdAt)} - {post.minutesRead} min read</p>

              {/* Conditionally render content */}
              <div dangerouslySetInnerHTML={{ __html: expandedPosts[post.id] ? post.content : `${post.content.substring(0, 400)}...` }} className="my-2" />

              {/* Show 'See More' only if content length exceeds the limit */}
              {!expandedPosts[post.id] && post.content.length > 400 ? (
                <button onClick={() => setExpandedPosts({ ...expandedPosts, [post.id]: true })} className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md">
                  See More
                </button>
              ) : null}

              {/* 'See Less' button */}
              {expandedPosts[post.id] ? (
                <button onClick={() => setExpandedPosts({ ...expandedPosts, [post.id]: false })} className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md">
                  See Less
                </button>
              ) : null}
              <div className='mt-4'>
                <button onClick={() => setEditingPost(post)} className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md">Edit</button>
                <button onClick={() => handleDeletePost(post.id)} className="ml-2 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md">Delete</button>
              </div>
            </div>
          </CSSTransition>
        ))}

      </TransitionGroup>

      {!loading && (
        <button onClick={fetchPosts} className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md mt-14">
          Load More
        </button>
      )}

    </div>
  );

}

export default AdminDashboard;
