import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Rocket, GraduationCap, Laptop, X, Plus, Code2, UserCircle2 } from 'lucide-react';

// RECOMMENDATION DATASETS
const ROLE_SUGGESTIONS = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "UI/UX Designer", "App Developer", "AI/ML Engineer", "Data Scientist", "Embedded Engineer", "IoT Developer"];
const TECH_SUGGESTIONS = ["React", "Node.js", "Python", "Tailwind CSS", "Firebase", "Arduino", "Raspberry Pi", "TensorFlow", "MATLAB", "Figma", "C++", "Java"];

export default function SetupProfile() {
  const navigate = useNavigate();
  
  // BASIC INFO
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [bio, setBio] = useState('');
  
  // ROLES & SKILLS
  const [userRoles, setUserRoles] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  
  // INPUT HELPERS
  const [roleInput, setRoleInput] = useState('');
  const [techInput, setTechInput] = useState('');

  // FILTER LOGIC
  const filteredRoles = ROLE_SUGGESTIONS.filter(item => 
    item.toLowerCase().includes(roleInput.toLowerCase()) && !userRoles.includes(item) && roleInput.length > 0
  );
  const filteredTech = TECH_SUGGESTIONS.filter(item => 
    item.toLowerCase().includes(techInput.toLowerCase()) && !userSkills.includes(item) && techInput.length > 0
  );

  const handleSaveProfile = async () => {
    if (!bio || userRoles.length === 0 || userSkills.length === 0) {
      alert("Please fill in your bio, roles, and skills to complete your Nirma profile!");
      return;
    }

    try {
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
        branch: branch,
        year: year,
        bio: bio,
        roles: userRoles,
        skills: userSkills,
        uid: auth.currentUser.uid,
        setupComplete: true,
        createdAt: new Date()
      });
      navigate('/login');
    } catch (e) { 
      console.error(e); 
      alert("Error saving profile. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] flex items-center justify-center p-8 py-20">
      <div className="max-w-4xl w-full space-y-16">
        
        {/* Header Section */}
        <div className="text-center md:text-left">
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-none">
            Welcome to <span className="text-orange-500">ProjectMate.</span>
          </h1>
          <p className="text-3xl text-slate-500 font-bold leading-tight">
            Finalize your <span className="text-slate-900">Nirma Builder</span> identity to start collaborating.
          </p>
        </div>

        <div className="space-y-12 bg-white p-12 md:p-16 rounded-[4rem] border-2 border-gray-100 shadow-xl shadow-slate-200/50">
          
          {/* BRANCH & YEAR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="block text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Select Branch</label>
              <select 
                value={branch} 
                onChange={(e) => setBranch(e.target.value)}
                className="w-full bg-slate-50 border-4 border-transparent focus:border-orange-500 rounded-3xl px-8 py-6 text-2xl font-black outline-none appearance-none cursor-pointer transition-all"
              >
                <option>Electronics & Instrumentation</option>
                <option>Computer Science</option>
                <option>AI & ML</option>
                <option>Information Technology</option>
                <option>Mechanical Engineering</option>
                <option>Civil Engineering</option>
                <option>Electrical Engineering</option>
                <option>Chemical Engineering</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Current Year</label>
              <select 
                value={year} 
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-slate-50 border-4 border-transparent focus:border-orange-500 rounded-3xl px-8 py-6 text-2xl font-black outline-none appearance-none cursor-pointer transition-all"
              >
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
              </select>
            </div>
          </div>

          {/* BIO / ABOUT ME */}
          <div>
            <label className="block text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">About Me</label>
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell other builders what you are passionate about..."
              className="w-full bg-slate-50 border-4 border-transparent focus:border-orange-500 rounded-[2.5rem] px-8 py-6 text-xl font-bold outline-none transition-all min-h-[200px] resize-none"
            />
          </div>

          {/* ROLES SELECTION */}
          <div className="relative">
            <label className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              <UserCircle2 className="w-5 h-5" /> Your Primary Roles
            </label>
            <div className="flex flex-wrap gap-3 mb-6">
              {userRoles.map((role, i) => (
                <span key={i} className="bg-orange-500 text-white px-6 py-2 rounded-2xl text-lg font-black flex items-center gap-3">
                  {role} <X className="w-5 h-5 cursor-pointer" onClick={() => setUserRoles(userRoles.filter((_, idx) => idx !== i))} />
                </span>
              ))}
            </div>
            <input 
              value={roleInput} 
              onChange={(e) => setRoleInput(e.target.value)}
              placeholder="Search roles (e.g. Designer)..."
              className="w-full bg-slate-50 border-4 border-transparent focus:border-orange-500 rounded-2xl px-8 py-5 text-xl font-bold transition-all outline-none"
            />
            {filteredRoles.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white border-2 border-slate-100 rounded-3xl shadow-2xl overflow-hidden">
                {filteredRoles.map((s, i) => (
                  <button key={i} type="button" onClick={() => { setUserRoles([...userRoles, s]); setRoleInput(''); }} className="w-full text-left px-8 py-4 text-xl font-bold hover:bg-orange-500 hover:text-white flex justify-between items-center transition-colors">
                    {s} <Plus className="w-6 h-6" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SKILLS SELECTION */}
          <div className="relative">
            <label className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              <Code2 className="w-5 h-5" /> Tech Stack / Skills
            </label>
            <div className="flex flex-wrap gap-3 mb-6">
              {userSkills.map((skill, i) => (
                <span key={i} className="bg-slate-900 text-white px-6 py-2 rounded-2xl text-lg font-black flex items-center gap-3">
                  {skill} <X className="w-5 h-5 cursor-pointer" onClick={() => setUserSkills(userSkills.filter((_, idx) => idx !== i))} />
                </span>
              ))}
            </div>
            <input 
              value={techInput} 
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="e.g. React, Arduino, Figma..."
              className="w-full bg-slate-50 border-4 border-transparent focus:border-orange-500 rounded-2xl px-8 py-5 text-xl font-bold transition-all outline-none"
            />
            {filteredTech.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white border-2 border-slate-100 rounded-3xl shadow-2xl overflow-hidden">
                {filteredTech.map((s, i) => (
                  <button key={i} type="button" onClick={() => { setUserSkills([...userSkills, s]); setTechInput(''); }} className="w-full text-left px-8 py-4 text-xl font-bold hover:bg-orange-500 hover:text-white flex justify-between items-center transition-colors">
                    {s} <Plus className="w-6 h-6" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button 
            onClick={handleSaveProfile}
            className="w-full bg-orange-500 text-white py-8 rounded-[2.5rem] font-black text-4xl shadow-2xl shadow-orange-500/40 hover:bg-orange-600 active:scale-95 transition-all flex items-center justify-center gap-6"
          >
            <Rocket className="w-10 h-10" /> Complete Setup
          </button>
        </div>
      </div>
    </div>
  );
}