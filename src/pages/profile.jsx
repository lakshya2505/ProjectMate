import React, { useState } from 'react';
import { Eye, MessageCircle, Link as LinkIcon, Edit3, Share2, Layers, GraduationCap, MapPin, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function UserProfile() {
  // --- AUTH STATE ---
  // null = logged out, {} = logged in.
  const [user, setUser] = useState(null); 

  const skills = ['JavaScript', 'Embedded C', 'React', 'Node.js', 'Tailwind', 'Arduino', 'MATLAB'];
  
  const projects = [
    {
      id: 1,
      title: "AI Study Buddy",
      status: "Active",
      statusColor: "bg-orange-500",
      description: "An automated quiz generator designed for Nirma EI students to convert complex instrumentation notes into flashcards.",
      tags: ["React", "EI-Specialized", "Python"],
      views: 45,
      comments: 7
    },
    {
      id: 2,
      title: "NU Campus Map AR",
      status: "In Progress",
      statusColor: "bg-orange-400",
      description: "Augmented Reality navigation to help freshmen find labs in the E-Block and N-Block easily.",
      tags: ["AR Core", "Unity", "Campus-Only"],
      views: 210,
      comments: 12
    }
  ];

  // --- VIEW A: GOOGLE LOGIN INTERFACE (If not logged in) ---
  if (!user) {
    return (
      <div className="min-h-screen bg-white w-full flex flex-col font-sans antialiased text-slate-900">
        <nav className="bg-white flex items-center justify-between px-8 md:px-12 py-8 border-b border-gray-100 w-full">
          <Link to="/" className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Layers className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-black text-orange-500 tracking-tighter uppercase">ProjectMate</span>
          </Link>
        </nav>

        <main className="flex-1 flex items-center justify-center p-6 bg-[#FDFDFD]">
          <div className="max-w-md w-full text-center">
            <div className="w-24 h-24 bg-orange-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border-2 border-orange-100 shadow-sm">
              <LogIn className="w-12 h-12 text-orange-500" />
            </div>
            
            <h1 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">Student Identity Required</h1>
            <p className="text-xl text-gray-500 font-bold mb-12 leading-relaxed">
              To view your <span className="text-orange-600">Nirma University</span> profile and manage projects, please sign in with your campus account.
            </p>

            {/* Google Login Button */}
            <button 
              onClick={() => setUser({ name: "Lakshya Jain" })} // Temporary simulation
              className="w-full flex items-center justify-center gap-4 bg-white border-4 border-gray-100 hover:border-orange-500 py-5 px-8 rounded-[2rem] transition-all duration-300 group active:scale-95 shadow-xl hover:shadow-orange-500/10"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-2xl font-black text-gray-700 group-hover:text-orange-600 transition-colors">Continue with Google</span>
            </button>

            <p className="mt-12 text-sm text-gray-400 font-black uppercase tracking-[0.2em]">Exclusively for Nirma University</p>
          </div>
        </main>
      </div>
    );
  }

  // --- VIEW B: FULL PROFILE INTERFACE (If logged in) ---
  return (
    <div className="min-h-screen bg-gray-50 w-full font-sans">
      {/* Navigation */}
      <nav className="bg-white flex items-center justify-between px-8 md:px-12 py-8 border-b-2 border-gray-100 sticky top-0 z-50 w-full">
        <Link to="/" className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <Layers className="w-8 h-8 text-white" />
          </div>
          <span className="text-3xl font-black text-orange-500 tracking-tighter uppercase">ProjectMate</span>
        </Link>
        <div className="flex items-center gap-12">
          <Link to="/projects" className="text-gray-500 hover:text-orange-500 font-bold text-xl transition-all">Projects</Link>
          <Link to="/create" className="text-gray-500 hover:text-orange-500 font-bold text-xl transition-all">Post Project</Link>
          <Link to="/profile" className="text-orange-500 font-black text-xl border-b-4 border-orange-500 pb-1">Profile</Link>
          <button 
            onClick={() => setUser(null)} // Click to Log Out
            className="text-white font-black text-xl bg-gray-900 px-10 py-4 rounded-2xl hover:bg-orange-600 transition shadow-xl"
          >
            Log Out
          </button>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="h-72 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-200 relative w-full overflow-hidden">
        <div className="absolute bottom-8 left-12">
           
        </div>
      </div>

      {/* Profile Header Section */}
      <div className="px-8 md:px-12 -mt-28 mb-16 relative z-10 w-full">
        <div className="w-full flex flex-col lg:flex-row items-end justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-10">
            <div className="relative group">
              <img 
                src="https://i.pravatar.cc/400?img=33" 
                alt="Lakshya Jain" 
                className="w-55 h-55 rounded-[3.5rem] border-8 border-white shadow-2xl object-cover"
              />
            </div>
            
            <div className="mb-6 text-center md:text-left">
              <h1 className="text-7xl md:text-9xl font-black text-gray-900 mb-4 tracking-tighter">Lakshya Jain</h1>
              <div className="space-y-3">
                <p className="text-3xl text-orange-600 font-black flex items-center justify-center md:justify-start gap-3">
                  <GraduationCap className="w-9 h-9" /> Nirma University — Electronics & Instrumentation
                </p>
                <div className="flex items-center justify-center md:justify-start gap-6 text-2xl text-gray-400 font-bold">
                  <span className="flex items-center gap-2"><MapPin className="w-6 h-6" /> EI Branch</span>
                  <span>|</span>
                  <span>Full Stack Dev</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-8 w-full md:w-auto">
            <button className="flex-1 md:flex-none bg-white border-4 border-gray-100 hover:border-orange-500 hover:text-orange-500 px-8 py-5 rounded-3xl font-black text-xl transition-all active:scale-95 shadow-sm">
              <Share2 className="w-6 h-6" />
            </button>
            <button className="flex-1 md:flex-none bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-3xl font-black text-xl transition-all shadow-xl shadow-orange-500/20 flex items-center gap-4 active:scale-95">
              <Edit3 className="w-7 h-7" /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="px-8 md:px-12 pb-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 w-full">
          
          <div className="lg:col-span-8 space-y-12">
            {/* About Me */}
            <div className="bg-white rounded-[3.5rem] p-12 md:p-16 border-2 border-gray-100 shadow-sm">
              <h2 className="text-4xl font-black text-gray-900 mb-8 uppercase tracking-widest border-b-4 border-orange-500 pb-2 inline-block">About Me</h2>
              <p className="text-2xl text-gray-600 leading-relaxed font-medium">
                I am an <span className="text-orange-600 font-black underline decoration-4 underline-offset-8">Electronics & Instrumentation</span> student at Nirma University. Focused on hardware-software integration and finding teammates for campus hackathons.
              </p>
            </div>

            {/* Project List */}
            <div className="bg-white rounded-[3.5rem] p-12 md:p-16 border-2 border-gray-100 shadow-sm">
              <h2 className="text-4xl font-black text-gray-900 mb-12 uppercase tracking-tighter">My NU Projects</h2>
              <div className="grid grid-cols-1 gap-10">
                {projects.map(project => (
                  <div key={project.id} className="border-4 border-gray-50 rounded-[2.5rem] p-10 hover:border-orange-200 transition-all duration-300">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-3xl font-black text-gray-900">{project.title}</h3>
                      <span className={`${project.statusColor} text-white text-base font-black px-6 py-2 rounded-2xl uppercase tracking-widest shadow-md`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-xl text-gray-500 mb-8 leading-relaxed font-bold">{project.description}</p>
                    <div className="flex flex-wrap items-center justify-between pt-8 border-t-2 border-gray-50">
                      <div className="flex gap-3">
                        {project.tags.map((tag, index) => (
                          <span key={index} className="bg-orange-50 text-orange-600 text-sm font-black px-5 py-2 rounded-xl">#{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-8 text-gray-400 font-black text-xl">
                        <div className="flex items-center gap-2"><Eye className="w-7 h-7" /> {project.views}</div>
                        <div className="flex items-center gap-2"><MessageCircle className="w-7 h-7" /> {project.comments}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            <div className="bg-gray-900 rounded-[3.5rem] p-12 shadow-2xl sticky top-40 text-white">
              <h3 className="text-3xl font-black mb-10 border-b-4 border-orange-500 pb-2 inline-block uppercase tracking-widest">Skills</h3>
              <div className="flex flex-wrap gap-4 mb-16">
                {skills.map((skill, index) => (
                  <span key={index} className="bg-white/10 text-orange-400 text-lg font-black px-5 py-2 rounded-xl border border-white/10 hover:bg-orange-500 hover:text-white transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="space-y-8">
                <div className="flex justify-between items-center bg-white/5 p-6 rounded-3xl border border-white/5">
                   <span className="text-gray-400 font-bold text-lg uppercase tracking-widest">EI Branch</span>
                   <span className="text-orange-500 font-black text-2xl">2nd YEAR STUDENT</span>
                </div>
                <div className="p-6 rounded-3xl bg-orange-500 shadow-xl shadow-orange-500/20">
                  <p className="text-white font-black text-3xl mb-1">1 Active Projects</p>
                  <p className="text-orange-100 font-bold text-lg">Nirma Campus Only</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}