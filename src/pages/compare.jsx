import React, { useState } from 'react';
import { Layers, X, Rocket, CheckCircle, Loader2, Plus, Search, Code2, Users2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// DATASETS
const ROLE_SUGGESTIONS = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer", "App Developer", "AI/ML Engineer", "Data Scientist", "Embedded Engineer", "IoT Developer", "Cloud Engineer"];
const TECH_SUGGESTIONS = ["React", "Node.js", "Python", "Tailwind CSS", "Firebase", "MongoDB", "Arduino", "Raspberry Pi", "TensorFlow", "Flutter", "Next.js", "MATLAB", "Figma"];

export default function PostNewProject() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('1 - 3 Months');
  const [projectType, setProjectType] = useState('sideProject');
  const [roles, setRoles] = useState([]);
  const [techStack, setTechStack] = useState([]);
  const [roleInput, setRoleInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  // Filter Logic
  const filteredRoles = ROLE_SUGGESTIONS.filter(item => item.toLowerCase().includes(roleInput.toLowerCase()) && !roles.includes(item) && roleInput.length > 0);
  const filteredTech = TECH_SUGGESTIONS.filter(item => item.toLowerCase().includes(techInput.toLowerCase()) && !techStack.includes(item) && techInput.length > 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return alert("Please login first!");
    setIsPosting(true);
    try {
      await addDoc(collection(db, "projects"), {
        title: projectName, tagline, description, projectType, rolesNeeded: roles, techStack, duration, branch: "EI Branch",
        authorName: auth.currentUser.displayName, authorPhoto: auth.currentUser.photoURL, authorId: auth.currentUser.uid, createdAt: serverTimestamp(),
      });
      navigate('/projects');
    } catch (error) { console.error(error); } finally { setIsPosting(false); }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] w-full font-sans antialiased text-slate-900">
      {/* Premium Navbar */}
      <nav className="bg-white/80 backdrop-blur-md flex items-center justify-between px-8 md:px-16 py-6 border-b border-slate-200 sticky top-0 z-50 w-full">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black text-slate-800 tracking-tighter uppercase">ProjectMate</span>
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/projects" className="text-slate-500 hover:text-orange-500 font-bold transition-colors">Projects</Link>
          <Link to="/profile" className="text-slate-500 hover:text-orange-500 font-bold transition-colors">Profile</Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Title Section */}
        <div className="mb-20 text-center md:text-left">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-6">
            Build your <span className="text-orange-500">legacy.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl">
            Recruit the best minds at Nirma University to turn your idea into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-10">
            
            {/* CARD 1: CONTENT */}
            <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-black">1</div>
                <h2 className="text-2xl font-black uppercase tracking-tight">Project Identity</h2>
              </div>
              
              <div className="space-y-8">
                <div className="group">
                  <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-3">Project Title</label>
                  <input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="e.g. Smart Irrigation System" 
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-2xl px-6 py-5 text-xl font-bold transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-3">Tagline</label>
                  <input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="A one-sentence hook for your project" 
                    className="w-full bg-slate-50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-2xl px-6 py-5 text-xl font-bold transition-all outline-none" />
                </div>
              </div>
            </div>

            {/* CARD 2: TEAM & SKILLS (THE UPGRADED PART) */}
            <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-sm border border-slate-100 space-y-12">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-black">2</div>
                <h2 className="text-2xl font-black uppercase tracking-tight">Team Matching</h2>
              </div>

              {/* Roles Search Section */}
              <div className="relative">
                <label className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest mb-4">
                  <Users2 className="w-4 h-4" /> Roles You Need
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {roles.map((role, i) => (
                    <span key={i} className="bg-orange-500 text-white pl-5 pr-3 py-2 rounded-full text-sm font-bold flex items-center gap-2 animate-in zoom-in duration-200">
                      {role} <X className="w-4 h-4 cursor-pointer hover:bg-white/20 rounded-full" onClick={() => setRoles(roles.filter((_, idx) => idx !== i))} />
                    </span>
                  ))}
                </div>
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input value={roleInput} onChange={(e) => setRoleInput(e.target.value)} placeholder="Type to find roles..." 
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl font-bold focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all outline-none" />
                  {filteredRoles.length > 0 && (
                    <div className="absolute z-20 w-full mt-2 bg-white/90 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-2xl p-2">
                      {filteredRoles.map((s, i) => (
                        <button key={i} type="button" onClick={() => { setRoles([...roles, s]); setRoleInput(''); }} 
                          className="w-full text-left px-5 py-3 rounded-xl hover:bg-orange-500 hover:text-white font-bold transition-all flex justify-between items-center group">
                          {s} <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Tech Stack Search Section */}
              <div className="relative">
                <label className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest mb-4">
                  <Code2 className="w-4 h-4" /> Tech Stack
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {techStack.map((tech, i) => (
                    <span key={i} className="bg-slate-900 text-white pl-5 pr-3 py-2 rounded-full text-sm font-bold flex items-center gap-2 animate-in zoom-in duration-200">
                      {tech} <X className="w-4 h-4 cursor-pointer hover:bg-white/20 rounded-full" onClick={() => setTechStack(techStack.filter((_, idx) => idx !== i))} />
                    </span>
                  ))}
                </div>
                <div className="relative">
                  <input value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="Search technologies..." 
                    className="w-full px-6 py-5 bg-slate-50 rounded-2xl font-bold focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all outline-none" />
                  {filteredTech.length > 0 && (
                    <div className="absolute z-20 w-full mt-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-2">
                      {filteredTech.map((s, i) => (
                        <button key={i} type="button" onClick={() => { setTechStack([...techStack, s]); setTechInput(''); }} 
                          className="w-full text-left px-5 py-3 rounded-xl hover:bg-orange-500 text-white font-bold transition-all text-slate-300">
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                    <label className="block text-2xl font-black text-gray-900 mb-4">Estimated Duration</label>
                    <select 
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-8 py-6 text-2xl border-4 border-gray-50 rounded-2xl focus:outline-none focus:border-orange-500 transition-all font-bold bg-white cursor-pointer appearance-none"
                    >
                      <option>1 - 3 Months</option>
                      <option>&lt;1 Month</option>
                      <option>3 - 6 Months</option>
                      <option>6+ Months</option>
                    </select>
                  </div>
            </div>

            <button onClick={handleSubmit} disabled={isPosting} className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white py-8 rounded-[2rem] font-black text-3xl transition-all shadow-2xl flex items-center justify-center gap-4 active:scale-95">
              {isPosting ? <Loader2 className="w-8 h-8 animate-spin" /> : <Rocket className="w-8 h-8" />}
              {isPosting ? "Launching..." : "Launch Project"}
            </button>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-orange-500 rounded-[2.5rem] p-10 text-white shadow-xl shadow-orange-500/20">
              <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter">Pro Tips</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 shrink-0" />
                  <p className="font-bold leading-tight">Nirma students value clear goals over complex descriptions.</p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="w-6 h-6 shrink-0" />
                  <p className="font-bold leading-tight">Mentioning the correct role you want do not mislead anyone.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}