// Login.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin'); // Redirect to the admin dashboard after successful login
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="p-6 max-w-md w-full bg-white rounded-md shadow-md">
        <h2 className="text-center text-2xl font-bold mb-6">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <Transition in={!!error} timeout={300}>
            {state => (
              <div style={{
                transition: 'opacity 300ms ease-in-out',
                opacity: state === 'entered' ? 1 : 0
              }}>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            )}
          </Transition>
          {/* Input fields */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
              focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow">
            Login
          </button>
          <div className="text-sm mt-4">
            Don't have an account? <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
