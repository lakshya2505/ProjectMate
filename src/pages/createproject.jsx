import React, { useState } from 'react';
import { Layers, X, Rocket, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db, auth } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
export default function PostNewProject() {
    const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Ensure the user is logged in
  if (!auth.currentUser) {
    alert("Please login first!");
    return;
  }

  try {
    // This sends the data to the "projects" collection in Firebase
    await addDoc(collection(db, "projects"), {
      title: projectName, // Ensure this matches your state variable
      tagline: tagline,
      description: description,
      projectType: projectType,
      rolesNeeded: roles,
      techStack: techStack,
      duration: duration,
      branch: "EI Branch", // Default for now
      authorName: auth.currentUser.displayName,
      authorEmail: auth.currentUser.email,
      authorPhoto: auth.currentUser.photoURL,
      createdAt: serverTimestamp(), // Google's official server time
    });

    alert("Project Live on ProjectMate! ");
    navigate('/projects'); // Send them to the feed
  } catch (error) {
    console.error("Error uploading project: ", error);
  }
};
  const [projectType, setProjectType] = useState('sideProject');
  const [roles, setRoles] = useState(['Frontend Dev', 'UI Designer']);
  const [techStack, setTechStack] = useState(['React', 'Node.js']);
  const [roleInput, setRoleInput] = useState('');
  const [techInput, setTechInput] = useState('');

  const removeRole = (index) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  const removeTech = (index) => {
    setTechStack(techStack.filter((_, i) => i !== index));
  };

  const handleRoleKeyPress = (e) => {
    if (e.key === 'Enter' && roleInput.trim()) {
      e.preventDefault();
      setRoles([...roles, roleInput.trim()]);
      setRoleInput('');
    }
  };

  const handleTechKeyPress = (e) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      setTechStack([...techStack, techInput.trim()]);
      setTechInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full font-sans">
      {/* Navigation - Consistent with other pages */}
      <nav className="bg-white flex items-center justify-between px-8 md:px-12 py-8 border-b border-gray-200 sticky top-0 z-50 w-full">
        <Link to="/" className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
            <Layers className="w-8 h-8 text-white" />
          </div>
          <span className="text-3xl font-black text-orange-500 tracking-tighter">ProjectMate</span>
        </Link>
        <div className="flex items-center gap-12">
          <Link to="/projects" className="text-gray-500 hover:text-orange-500 font-bold text-xl transition-colors">Projects</Link>
          <Link to="/create" className="text-orange-500 font-black text-xl border-b-4 border-orange-500">Post Project</Link>
          <Link to="/profile" className="text-gray-500 hover:text-orange-500 font-bold text-xl transition-colors">Profile</Link>
          <Link to="/login" className="text-gray-900 font-black text-xl bg-gray-100 px-8 py-4 rounded-2xl hover:bg-gray-200 transition">Log In</Link>
        </div>
      </nav>

      <div className="px-8 md:px-12 py-20 w-full">
        <div className="w-full">
          {/* Main Title Section */}
          <div className="mb-20 text-center md:text-left">
            <h1 className="text-7xl md:text-9xl font-black text-gray-900 mb-8 tracking-tighter leading-none">
              Bring your <span className="text-orange-600">idea</span> to life.
            </h1>
            <p className="text-2xl md:text-3xl text-gray-500 font-medium max-w-5xl">
              Fill out the details below to recruit your dream team and start building.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 w-full">
            {/* Left Column - Large Scale Form */}
            <div className="lg:col-span-8 space-y-20">
              
              {/* Section 1: Essentials */}
              <div className="bg-white rounded-[3rem] p-12 md:p-16 border-2 border-gray-100 shadow-sm">
                <h2 className="text-4xl font-black text-gray-900 mb-12 flex items-center gap-4 uppercase tracking-tighter">
                  <span className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl">1</span>
                  Project Essentials
                </h2>
                
                <div className="space-y-10">
                  <div>
                    <label className="block text-2xl font-black text-gray-900 mb-4">Project Name</label>
                    <input
                      type="text"
                      placeholder="e.g. AI-Powered Study Assistant"
                      className="w-full px-8 py-6 text-2xl border-4 border-gray-50 rounded-2xl focus:outline-none focus:ring-8 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-2xl font-black text-gray-900 mb-4">Short Tagline</label>
                    <input
                      type="text"
                      placeholder="e.g. Generating quizzes from lecture notes automatically."
                      className="w-full px-8 py-6 text-2xl border-4 border-gray-50 rounded-2xl focus:outline-none focus:ring-8 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-2xl font-black text-gray-900 mb-6">Project Type</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { id: 'sideProject', label: 'Side Project', desc: 'Passion project or startup' },
                        { id: 'hackathon', label: 'Hackathon', desc: 'Weekend or month-long event' },
                        { id: 'research', label: 'Research', desc: 'Academic or thesis work' },
                        { id: 'openSource', label: 'Open Source', desc: 'Community project' }
                      ].map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setProjectType(type.id)}
                          className={`p-8 rounded-3xl border-4 text-left transition-all duration-300 ${
                            projectType === type.id
                              ? 'bg-orange-500 border-orange-500 text-white shadow-xl shadow-orange-500/30'
                              : 'bg-white border-gray-100 hover:border-gray-200'
                          }`}
                        >
                          <span className="block text-2xl font-black mb-2">{type.label}</span>
                          <span className={`text-lg font-bold ${projectType === type.id ? 'text-orange-100' : 'text-gray-400'}`}>
                            {type.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-2xl font-black text-gray-900 mb-4">Description</label>
                    <textarea
                      rows="6"
                      placeholder="Describe what you're building, the problem it solves, and current progress..."
                      className="w-full px-8 py-6 text-2xl border-4 border-gray-50 rounded-2xl focus:outline-none focus:ring-8 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-medium resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Team & Skills */}
              <div className="bg-white rounded-[3rem] p-12 md:p-16 border-2 border-gray-100 shadow-sm">
                <h2 className="text-4xl font-black text-gray-900 mb-12 flex items-center gap-4 uppercase tracking-tighter">
                  <span className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center text-xl">2</span>
                  Team & Skills
                </h2>

                <div className="space-y-12">
                  <div>
                    <label className="block text-2xl font-black text-gray-900 mb-6">Roles Needed</label>
                    <div className="flex flex-wrap gap-4 mb-6">
                      {roles.map((role, index) => (
                        <span key={index} className="inline-flex items-center gap-4 bg-orange-100 text-orange-600 px-8 py-3 rounded-2xl text-xl font-black transition-all hover:bg-orange-200">
                          {role}
                          <button onClick={() => removeRole(index)} className="hover:scale-125 transition-transform"><X className="w-6 h-6" /></button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Type role and press Enter..."
                      value={roleInput}
                      onChange={(e) => setRoleInput(e.target.value)}
                      onKeyPress={handleRoleKeyPress}
                      className="w-full px-8 py-6 text-2xl border-4 border-gray-50 rounded-2xl focus:outline-none focus:ring-8 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-2xl font-black text-gray-900 mb-6">Tech Stack Required</label>
                    <div className="flex flex-wrap gap-4 mb-6">
                      {techStack.map((tech, index) => (
                        <span key={index} className="inline-flex items-center gap-4 bg-gray-900 text-white px-8 py-3 rounded-2xl text-xl font-black transition-all hover:bg-gray-800">
                          {tech}
                          <button onClick={() => removeTech(index)} className="hover:scale-125 transition-transform"><X className="w-6 h-6" /></button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Type skill and press Enter..."
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyPress={handleTechKeyPress}
                      className="w-full px-8 py-6 text-2xl border-4 border-gray-50 rounded-2xl focus:outline-none focus:ring-8 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-2xl font-black text-gray-900 mb-4">Estimated Duration</label>
                    <select className="w-full px-8 py-6 text-2xl border-4 border-gray-50 rounded-2xl focus:outline-none focus:ring-8 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-bold bg-white cursor-pointer appearance-none">
                      <option>1 - 3 Months</option>
                      <option>&lt;1 Month</option>
                      <option>3 - 6 Months</option>
                      <option>6+ Months</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-8 pb-20">
                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-12 py-8 rounded-[2rem] font-black text-3xl transition-all shadow-2xl shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-4 group">
                  <Rocket className="w-10 h-10 group-hover:-translate-y-2 transition-transform" />
                  Post Project
                </button>
                <button className="flex-1 bg-white border-4 border-gray-100 text-gray-400 hover:text-gray-900 hover:border-gray-200 px-12 py-8 rounded-[2rem] font-black text-3xl transition-all active:scale-95">
                  Save Draft
                </button>
              </div>
            </div>

            {/* Right Column - Tips Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-40 bg-gray-900 rounded-[3rem] p-12 shadow-2xl overflow-hidden group">
                {/* Decorative background circle */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full blur-[80px] opacity-20 transition-transform group-hover:scale-150 duration-700"></div>
                
                <h3 className="text-3xl font-black text-white mb-10 border-b-2 border-orange-500 pb-4 inline-block tracking-tighter">
                  Tips for a great post
                </h3>
                
                <ul className="space-y-10">
                  {[
                    "Be specific about the commitment level (hours/week).",
                    "Clearly list the tech stack to attract the right devs.",
                    "Mention if this is paid or equity-based.",
                    "Add a link to your prototype if you have one."
                  ].map((tip, i) => (
                    <li key={i} className="flex gap-6 text-xl text-gray-300 font-bold leading-relaxed">
                      <CheckCircle className="w-8 h-8 text-orange-500 shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-16 p-8 bg-gray-800 rounded-[2rem] border-2 border-gray-700">
                  <p className="text-lg text-orange-400 font-black uppercase tracking-widest mb-2">Pro Tip</p>
                  <p className="text-white text-xl font-bold">
                    Projects with a clear problem statement get 3x more applicants!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}