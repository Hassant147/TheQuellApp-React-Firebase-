import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage/homepage';
import './App.css';

import AdminDashboard from './pages/ForAdmin/AdminDashboard';
import UserView from './pages/ForUser/UserView';
import BlogDetail from './pages/ForUser/BlogDetailPage';

import Login from './pages/login';
import Signup from './pages/signup';
import { AuthProvider } from './AuthProvider';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/admin" element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } />
          <Route path="/blogs" element={<UserView />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>



  );
};

export default App;