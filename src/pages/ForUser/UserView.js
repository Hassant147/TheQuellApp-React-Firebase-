import React, { useState, useEffect } from 'react';
import ViewerDashboard from './ViewerDashboard'; // Adjust the path according to your file structure
import SearchBlog from '../../components/searchbar'; // Adjust the path according to your file structure

function UserView() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showOnlineMessage, setShowOnlineMessage] = useState(false);

    useEffect(() => {
        const handleOnlineStatus = () => {
            setIsOnline(navigator.onLine);
        
            if (navigator.onLine) {
                setShowOnlineMessage(true);
                setTimeout(() => setShowOnlineMessage(false), 3000); // Hide the message after 3 seconds
            }
        };        
    
        window.addEventListener('online', handleOnlineStatus);
        window.addEventListener('offline', handleOnlineStatus);
    
        return () => {
            window.removeEventListener('online', handleOnlineStatus);
            window.removeEventListener('offline', handleOnlineStatus);
        };
    }, []);
    

    function renderConnectionStatus() {
        if (!isOnline) {
            return (
                <div className="bg-red-500 text-white text-center py-3">
                    <p>No Internet Connection. Please check your network!</p>
                </div>
            );
        } else if (showOnlineMessage) {
            return (
                <div className="bg-green-500 text-white text-center py-3">
                    <p>You are online. Enjoy browsing!</p>
                </div>
            );
        }
        return null;
    }    

    return (
        <div className="UserView bg-beige-100 pb-20">
            {renderConnectionStatus()}
            <ViewerDashboard />
            <SearchBlog />
        </div>
    );
}

export default UserView;
