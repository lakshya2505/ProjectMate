import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/index.css';

// IMPORT YOUR PAGES
import ProjectMateLanding from './pages/login.jsx';
import LandingPage from './pages/landingpage.jsx'; 
import ExploreProjects from './pages/projects.jsx';
import PostNewProject from './pages/createproject.jsx'; 
import UserProfile from './pages/profile.jsx'; 
import ProjectDetails from './pages/projectDetails.jsx'; 
import SetupProfile from './pages/SetupProfile';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<ProjectMateLanding />} />
        <Route path="/projects" element={<ExploreProjects />} />
        <Route path="/create" element={<PostNewProject />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/setup-profile" element={<SetupProfile />} />
        
        {/* Now this will work because ProjectDetails is defined */}
        <Route path="/project/:id" element={<ProjectDetails />} /> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);