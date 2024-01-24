import React, { createContext, useEffect, useState } from 'react';
import { auth, firestore } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Set loading to false once the user state is determined
      if (user) {
        const unsubscribeRole = onSnapshot(doc(firestore, 'users', user.uid), (doc) => {
          setUserRole(doc.data()?.role);
        });
        return () => unsubscribeRole();
      } else {
        setUserRole(null);
      }
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show a loading indicator while checking the auth state
  }

  return (
    <AuthContext.Provider value={{ currentUser, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};
