import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/index.css';

// IMPORT YOUR PAGES
import LandingPage from './pages/login.jsx'; 
import ExploreProjects from './pages/projects.jsx';
import PostNewProject from './pages/createproject.jsx'; 
import UserProfile from './pages/profile.jsx'; 
// --- ADD THIS LINE BELOW ---
import ProjectDetails from './pages/ProjectDetails.jsx'; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<ExploreProjects />} />
        <Route path="/create" element={<PostNewProject />} />
        <Route path="/profile" element={<UserProfile />} />
        
        {/* Now this will work because ProjectDetails is defined */}
        <Route path="/project/:id" element={<ProjectDetails />} /> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);