import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/index.css';

// 1. IMPORT YOUR PAGES (Make sure the path matches your folder structure)
import ProjectMateLanding from './pages/login.jsx';
import LandingPage from './pages/landingpage.jsx'; 
import ExploreProjects from './pages/projects.jsx';
import PostNewProject from './pages/createproject.jsx'; 
import UserProfile from './pages/profile.jsx'; 
import ProjectDetails from './pages/projectDetails.jsx'; 
import SetupProfile from './pages/SetupProfile';
import Chat from './pages/Chat.jsx';
// THIS WAS LIKELY MISSING:
import PendingRequests from './pages/pendingrequest.jsx'; 
import Messages from './pages/Messages.jsx';

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
        <Route path="/project/:id" element={<ProjectDetails />} /> 
        <Route path="/profile/:uid" element={<UserProfile />} />
        {/* Match the element name to the import above */}
        <Route path="/pending-requests" element={<PendingRequests />} />
        <Route path="/chat/:chatId/:receiverName" element={<Chat />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);