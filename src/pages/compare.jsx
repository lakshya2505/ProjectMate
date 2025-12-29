import React, { useState } from 'react';
import { Layers, X, Rocket, CheckCircle, Loader2, Plus, Search, Code2, Users2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// DATASETS
const ROLE_SUGGESTIONS = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer", "App Developer", "AI/ML Engineer", "Data Scientist", "Embedded Engineer", "IoT Developer", "Cloud Engineer"];
const TECH_SUGGESTIONS = ["React", "Node.js", "Python", "Tailwind CSS", "Firebase", "MongoDB", "Arduino", "Raspberry Pi", "TensorFlow", "Flutter", "Next.js", "MATLAB", "Figma"];

const PROJECT_TYPES = [
  { id: 'sideProject', label: 'Side Project', desc: 'Personal passion project', icon: '🚀' },
  { id: 'hackathon', label: 'Hackathon', desc: 'Time-bound competition', icon: '⚡' },
  { id: 'research', label: 'Research', desc: 'Academic exploration', icon: '🔬' },
  { id: 'openSource', label: 'Open Source', desc: 'Community driven', icon: '🌍' }
];

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
  const [focusedField, setFocusedField] = useState('');

  // Filter Logic
  const filteredRoles = ROLE_SUGGESTIONS.filter(item => 
    item.toLowerCase().includes(roleInput.toLowerCase()) && 
    !roles.includes(item) && 
    roleInput.length > 0
  );
  const filteredTech = TECH_SUGGESTIONS.filter(item => 
    item.toLowerCase().includes(techInput.toLowerCase()) && 
    !techStack.includes(item) && 
    techInput.length > 0
  );

  // Calculate completion percentage
  const calculateProgress = () => {
    let completed = 0;
    if (projectName) completed += 20;
    if (tagline) completed += 15;
    if (description.length > 50) completed += 25;
    if (roles.length > 0) completed += 20;
    if (techStack.length > 0) completed += 20;
    return completed;
  };

  const progress = calculateProgress();
  const isFormValid = projectName && tagline && description.length > 50 && roles.length > 0 && techStack.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsPosting(true);
    // Simulate API call
    setTimeout(() => {
      alert('Project posted successfully!');
      setIsPosting(false);
    }, 2000);
  };
return(
   <div className="min-h-screen bg-[#FBFBFD] w-full font-sans antialiased text-slate-900">
      {/* Premium Navbar */}
     <nav className="bg-white flex items-center justify-between px-8 md:px-12 py-8 border-b border-gray-200 sticky top-0 z-50 w-full">
             <Link to="/" className="flex items-center gap-4">
               <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
                 <Layers className="w-8 h-8 text-white" />
               </div>
               <span className="text-3xl font-black text-orange-500 tracking-tighter uppercase">ProjectMate</span>
             </Link>
             <div className="flex items-center gap-12">
               <Link to="/projects" className="text-gray-500 hover:text-orange-500 font-semibold text-xl transition-colors">Projects</Link>
               <Link to="/create" className="text-orange-500 font-bold text-xl border-b-4 border-orange-500" >Post Project</Link>
               <Link to="/profile" className="text-gray-500 hover:text-orange-500 font-semibold text-xl transition-colors">Profile</Link>
             </div>
           </nav>

      {/* Progress Bar */}
      {progress > 0 && (
        <div className="sticky top-[88px] z-40 bg-white/80 backdrop-blur-sm border-b border-slate-200/50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-600">Project Setup Progress</span>
              <span className="text-sm font-black text-orange-500">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        {/* Title Section */}
        <div className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Start Your Journey</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-orange-600 bg-clip-text text-transparent">
            Build your legacy.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-semibold max-w-2xl">
            Recruit the best minds at Nirma University to turn your idea into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            
            {/* CARD 1: PROJECT IDENTITY */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-black shadow-md">1</div>
                <h2 className="text-2xl font-black uppercase tracking-tight">Project Identity</h2>
              </div>
              
              <div className="space-y-6">
                <div className="group">
                  <label className="flex items-center justify-between text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                    <span>Project Title</span>
                    {projectName && <span className="text-orange-500">{projectName.length}/100</span>}
                  </label>
                  <input 
                    value={projectName} 
                    onChange={(e) => setProjectName(e.target.value)} 
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                    maxLength={100}
                    placeholder="e.g. Smart Irrigation System" 
                    className={`w-full bg-slate-50 border-2 ${
                      focusedField === 'name' ? 'border-orange-500 bg-white shadow-lg shadow-orange-500/10' : 'border-transparent'
                    } rounded-2xl px-6 py-4 text-lg font-bold transition-all duration-200 outline-none placeholder:text-slate-300`}
                  />
                  {projectName && projectName.length < 10 && (
                    <p className="mt-2 text-xs text-amber-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Make your title more descriptive
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center justify-between text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                    <span>Tagline</span>
                    {tagline && <span className="text-orange-500">{tagline.length}/150</span>}
                  </label>
                  <input 
                    value={tagline} 
                    onChange={(e) => setTagline(e.target.value)} 
                    onFocus={() => setFocusedField('tagline')}
                    onBlur={() => setFocusedField('')}
                    maxLength={150}
                    placeholder="e.g. An AI-powered solution for water management" 
                    className={`w-full bg-slate-50 border-2 ${
                      focusedField === 'tagline' ? 'border-orange-500 bg-white shadow-lg shadow-orange-500/10' : 'border-transparent'
                    } rounded-2xl px-6 py-4 text-lg font-bold transition-all duration-200 outline-none placeholder:text-slate-300`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Project Type</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PROJECT_TYPES.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setProjectType(type.id)}
                        className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                          projectType === type.id 
                            ? 'bg-gradient-to-br from-orange-500 to-orange-600 border-orange-500 text-white shadow-xl shadow-orange-500/30 scale-105' 
                            : 'bg-white border-slate-200 hover:border-orange-300 hover:shadow-lg'
                        }`}
                      >
                        <div className="text-3xl mb-3">{type.icon}</div>
                        <span className="block text-lg font-black mb-1">{type.label}</span>
                        <span className={`block text-sm font-semibold ${
                          projectType === type.id ? 'text-orange-100' : 'text-slate-500'
                        }`}>
                          {type.desc}
                        </span>
                        {projectType === type.id && (
                          <div className="absolute top-3 right-3">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: PROJECT DETAILS */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-black shadow-md">2</div>
                <h2 className="text-2xl font-black uppercase tracking-tight">Project Details</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="flex items-center justify-between text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                    <span>Detailed Description</span>
                    <span className={`${description.length > 50 ? 'text-green-500' : 'text-slate-400'}`}>
                      {description.length}/1000 {description.length > 50 && '✓'}
                    </span>
                  </label>
                  <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    onFocus={() => setFocusedField('description')}
                    onBlur={() => setFocusedField('')}
                    maxLength={1000}
                    placeholder="Describe your project vision, the problem it solves, team expectations, and any specific requirements..." 
                    className={`w-full bg-slate-50 border-2 ${
                      focusedField === 'description' ? 'border-orange-500 bg-white shadow-lg shadow-orange-500/10' : 'border-transparent'
                    } rounded-2xl px-6 py-5 text-base font-semibold transition-all duration-200 outline-none placeholder:text-slate-300 leading-relaxed min-h-[200px] resize-none`}
                  />
                  {description.length > 0 && description.length < 50 && (
                    <p className="mt-3 text-xs text-amber-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Add at least 50 characters for a complete description ({50 - description.length} more needed)
                    </p>
                  )}
                  <p className="mt-3 text-xs text-slate-500 font-semibold italic flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Tip: Mention your branch and specific lab requirements if any
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 3: TEAM MATCHING */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-black shadow-md">3</div>
                <h2 className="text-2xl font-black uppercase tracking-tight">Team Matching</h2>
              </div>

              {/* Roles Section */}
              <div className="relative">
                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                  <Users2 className="w-4 h-4" /> 
                  <span>Roles You Need</span>
                  {roles.length > 0 && <span className="text-orange-500">({roles.length})</span>}
                </label>
                
                {roles.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {roles.map((role, i) => (
                      <span 
                        key={i} 
                        className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white pl-5 pr-3 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                      >
                        {role}
                        <button 
                          onClick={() => setRoles(roles.filter((_, idx) => idx !== i))}
                          className="w-5 h-5 flex items-center justify-center hover:bg-white/20 rounded-full transition-all"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="mb-4 p-4 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-center">
                    <p className="text-sm font-semibold text-slate-400">No roles added yet. Start typing to add roles...</p>
                  </div>
                )}

                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                  <input 
                    value={roleInput} 
                    onChange={(e) => setRoleInput(e.target.value)}
                    onFocus={() => setFocusedField('roles')}
                    onBlur={() => setTimeout(() => setFocusedField(''), 200)}
                    placeholder="Type to search roles (e.g. Frontend Developer)..." 
                    className={`w-full pl-14 pr-6 py-4 bg-slate-50 border-2 ${
                      focusedField === 'roles' ? 'border-orange-500 bg-white shadow-lg shadow-orange-500/10' : 'border-transparent'
                    } rounded-2xl font-semibold transition-all duration-200 outline-none placeholder:text-slate-300`}
                  />
                  {filteredRoles.length > 0 && (
                    <div className="absolute z-30 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
                      <div className="p-2 max-h-64 overflow-y-auto">
                        {filteredRoles.map((s, i) => (
                          <button 
                            key={i} 
                            type="button" 
                            onClick={() => { setRoles([...roles, s]); setRoleInput(''); }} 
                            className="w-full text-left px-5 py-3 rounded-xl hover:bg-orange-500 hover:text-white font-bold transition-all duration-200 flex justify-between items-center group"
                          >
                            <span>{s}</span>
                            <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tech Stack Section */}
              <div className="relative">
                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                  <Code2 className="w-4 h-4" /> 
                  <span>Tech Stack</span>
                  {techStack.length > 0 && <span className="text-slate-700">({techStack.length})</span>}
                </label>
                
                {techStack.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {techStack.map((tech, i) => (
                      <span 
                        key={i} 
                        className="group bg-slate-900 text-white pl-5 pr-3 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                      >
                        {tech}
                        <button 
                          onClick={() => setTechStack(techStack.filter((_, idx) => idx !== i))}
                          className="w-5 h-5 flex items-center justify-center hover:bg-white/20 rounded-full transition-all"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="mb-4 p-4 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-center">
                    <p className="text-sm font-semibold text-slate-400">No technologies added yet. Start typing to add...</p>
                  </div>
                )}

                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
                  <input 
                    value={techInput} 
                    onChange={(e) => setTechInput(e.target.value)}
                    onFocus={() => setFocusedField('tech')}
                    onBlur={() => setTimeout(() => setFocusedField(''), 200)}
                    placeholder="Search technologies (e.g. React, Python)..." 
                    className={`w-full pl-14 pr-6 py-4 bg-slate-50 border-2 ${
                      focusedField === 'tech' ? 'border-orange-500 bg-white shadow-lg shadow-orange-500/10' : 'border-transparent'
                    } rounded-2xl font-semibold transition-all duration-200 outline-none placeholder:text-slate-300`}
                  />
                  {filteredTech.length > 0 && (
                    <div className="absolute z-30 w-full mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
                      <div className="p-2 max-h-64 overflow-y-auto">
                        {filteredTech.map((s, i) => (
                          <button 
                            key={i} 
                            type="button" 
                            onClick={() => { setTechStack([...techStack, s]); setTechInput(''); }} 
                            className="w-full text-left px-5 py-3 rounded-xl hover:bg-orange-500 text-slate-300 hover:text-white font-bold transition-all duration-200 flex justify-between items-center group"
                          >
                            <span>{s}</span>
                            <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                  <Sparkles className="w-4 h-4" /> Duration
                </label>
                <select 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold focus:ring-4 focus:ring-orange-500/20 focus:bg-slate-800 transition-all duration-200 outline-none cursor-pointer hover:bg-slate-800"
                >
                  <option>&lt;1 Month</option>
                  <option>1 - 3 Months</option>
                  <option>3 - 6 Months</option>
                  <option>6+ Months</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleSubmit} 
              disabled={isPosting || !isFormValid}
              className={`w-full ${
                isFormValid 
                  ? 'bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 shadow-2xl shadow-slate-900/30' 
                  : 'bg-slate-300 cursor-not-allowed'
              } disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-6 rounded-2xl font-black text-2xl transition-all duration-300 flex items-center justify-center gap-4 active:scale-95 group`}
            >
              {isPosting ? (
                <>
                  <Loader2 className="w-7 h-7 animate-spin" />
                  <span>Launching...</span>
                </>
              ) : (
                <>
                  <Rocket className="w-7 h-7 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  <span>Launch Project</span>
                </>
              )}
            </button>

            {!isFormValid && (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-center">
                <p className="text-sm font-bold text-amber-700 flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Complete all required fields to launch your project
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-40 space-y-6">
              {/* Pro Tips Card */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white shadow-2xl shadow-orange-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6" />
                  <h3 className="text-xl font-black uppercase tracking-tighter">Pro Tips</h3>
                </div>
                <div className="space-y-5">
                  <div className="flex gap-3 group hover:translate-x-1 transition-transform duration-200">
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="font-bold leading-snug text-sm">Nirma students value clear goals over complex descriptions.</p>
                  </div>
                  <div className="flex gap-3 group hover:translate-x-1 transition-transform duration-200">
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="font-bold leading-snug text-sm">Mention the correct roles you need—don't mislead anyone.</p>
                  </div>
                  <div className="flex gap-3 group hover:translate-x-1 transition-transform duration-200">
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="font-bold leading-snug text-sm">Be specific about time commitment and expectations.</p>
                  </div>
                </div>
              </div>

              {/* Progress Checklist */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
                <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-tight">Completion Checklist</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Project Name', done: projectName.length > 0 },
                    { label: 'Tagline', done: tagline.length > 0 },
                    { label: 'Description (50+ chars)', done: description.length > 50 },
                    { label: 'Add Roles', done: roles.length > 0 },
                    { label: 'Add Tech Stack', done: techStack.length > 0 }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                        item.done ? 'bg-green-500' : 'bg-slate-200'
                      }`}>
                        {item.done && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <span className={`text-sm font-bold ${item.done ? 'text-slate-900' : 'text-slate-400'}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}