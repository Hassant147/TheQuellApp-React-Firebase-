import React from 'react';
import { auth } from '../firebase'; // Update the path according to your project structure
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
