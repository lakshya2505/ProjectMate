import React, { useState, useEffect } from 'react';
import { Eye, MessageCircle, Edit3, Share2, Layers, GraduationCap, MapPin, CheckCircle2, XCircle, MessageSquare, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
// 1. FIREBASE IMPORTS
import { db, auth } from '../services/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';

export default function UserProfile() {
  // Use actual Firebase Auth user
  const [user] = useState(auth.currentUser);
  const [requests, setRequests] = useState([]);

  // 2. REAL-TIME REQUESTS LISTENER
  useEffect(() => {
    if (auth.currentUser) {
      const q = query(
        collection(db, "applications"),
        where("leaderId", "==", auth.currentUser.uid),
        where("status", "==", "pending")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      return () => unsubscribe();
    }
  }, []);

  // 3. HANDLER FOR ACCEPT/DECLINE
  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      const requestRef = doc(db, "applications", requestId);
      await updateDoc(requestRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50 w-full font-sans">
      {/* Navigation - UNTOUCHED */}
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
            onClick={() => auth.signOut()} 
            className="text-white font-black text-xl bg-gray-900 px-10 py-4 rounded-2xl hover:bg-orange-600 transition shadow-xl"
          >
            Log Out
          </button>
        </div>
      </nav>

      {/* Hero Banner - UNTOUCHED */}
      <div className="h-72 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-200 relative w-full overflow-hidden"></div>

      {/* Profile Header - UPDATED WITH DYNAMIC DATA */}
      <div className="px-8 md:px-12 -mt-28 mb-16 relative z-10 w-full">
        <div className="w-full flex flex-col lg:flex-row items-end justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-10">
            <div className="relative group">
              <img 
                src={user?.photoURL || "https://i.pravatar.cc/400?img=33"} 
                alt={user?.displayName} 
                className="w-56 h-56 rounded-[3.5rem] border-8 border-white shadow-2xl object-cover"
              />
            </div>
            
            <div className="mb-6 text-center md:text-left">
              <h1 className="text-7xl md:text-9xl font-black text-gray-900 mb-4 tracking-tighter uppercase">
                {user?.displayName || "Nirma Builder"}
              </h1>
              <div className="space-y-3">
                <p className="text-3xl text-orange-600 font-black flex items-center justify-center md:justify-start gap-3">
                  <GraduationCap className="w-9 h-9" /> {user?.email}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-6 text-2xl text-gray-400 font-bold">
                  <span className="flex items-center gap-2"><MapPin className="w-6 h-6" /> EI Branch</span>
                  <span>|</span>
                  <span>Full Stack Dev</span>
                </div>
              </div>
            </div>
          </div>

          {/* SHARE & EDIT BUTTONS - UNTOUCHED */}
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

      <div className="px-8 md:px-12 pb-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 w-full">
          
          <div className="lg:col-span-8 space-y-12">
            
            {/* --- NEW JOIN REQUESTS INBOX --- */}
            <div className="bg-white rounded-[3.5rem] p-12 md:p-16 border-4 border-orange-100 shadow-xl shadow-orange-500/5">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-4">
                  <span className="flex h-4 w-4 rounded-full bg-orange-500 animate-pulse"></span>
                  Join Requests ({requests.length})
                </h2>
              </div>
              
              {requests.length === 0 ? (
                <p className="text-2xl text-gray-400 font-bold italic">No pending requests yet.</p>
              ) : (
                <div className="space-y-8">
                  {requests.map(req => (
                    <div key={req.id} className="bg-gray-50 rounded-[2.5rem] p-10 border-2 border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
                      <div className="flex items-center gap-6">
                        <img src={req.applicantPhoto} className="w-20 h-20 rounded-full border-4 border-white shadow-md" alt="" />
                        <div>
                          <p className="text-2xl font-black text-gray-900">
                            {req.applicantName} <span className="text-gray-400 font-bold text-lg">wants to join</span>
                          </p>
                          <p className="text-orange-600 font-black text-xl uppercase tracking-tight">{req.projectTitle}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 w-full md:w-auto">
                        <button 
                          onClick={() => handleStatusUpdate(req.id, 'accepted')}
                          className="flex-1 md:flex-none bg-green-500 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(req.id, 'declined')}
                          className="flex-1 md:flex-none bg-white border-2 border-gray-200 text-gray-400 px-8 py-4 rounded-2xl font-black text-lg hover:border-red-500 hover:text-red-500 transition-all"
                        >
                          <XCircle className="w-6 h-6" />
                        </button>
                        <a 
                          href={`mailto:${req.applicantEmail}`}
                          className="bg-gray-900 text-white p-4 rounded-2xl hover:bg-orange-500 transition-all shadow-lg"
                        >
                          <MessageSquare className="w-7 h-7" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ABOUT ME - UNTOUCHED */}
            <div className="bg-white rounded-[3.5rem] p-12 md:p-16 border-2 border-gray-100 shadow-sm">
              <h2 className="text-4xl font-black text-gray-900 mb-8 uppercase tracking-widest border-b-4 border-orange-500 pb-2 inline-block">About Me</h2>
              <p className="text-2xl text-gray-600 leading-relaxed font-medium">
                I am an <span className="text-orange-600 font-black underline decoration-4 underline-offset-8">Electronics & Instrumentation</span> student at Nirma University. Focused on hardware-software integration and finding teammates for campus hackathons.
              </p>
            </div>

            {/* PROJECT LIST - UNTOUCHED */}
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

          {/* RIGHT SIDEBAR & SKILLS - UNTOUCHED */}
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