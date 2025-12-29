import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Layers, GraduationCap, CheckCircle2, XCircle, MessageSquare, 
  Code2, Briefcase, Edit3, Save, X, Github, Linkedin, 
  ExternalLink, Camera, Plus, Trash2, Eye, LayoutGrid, BellRing,
  Sparkles, Award, TrendingUp
} from 'lucide-react';

// FIREBASE IMPORTS
import { db, auth } from '../services/firebase';
import { doc, onSnapshot, updateDoc, collection, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function UserProfile() {
  const navigate = useNavigate();
  const [user] = useState(auth.currentUser);
  
  // REAL DATA STATES
  const [profile, setProfile] = useState(null); 
  const [requests, setRequests] = useState([]); 
  const [userProjects, setUserProjects] = useState([]);
  
  // EDITING STATES
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }

    // 1. LISTEN TO PROFILE DATA
    const userRef = doc(db, "users", auth.currentUser.uid);
    const unsubProfile = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile(data);
        // Pre-fill edit data so inputs aren't empty when you click edit
        setEditData(data);
      }
    });

    // 2. LISTEN TO INCOMING APPLICATIONS (Inbox)
    const qApps = query(
      collection(db, "applications"),
      where("leaderId", "==", auth.currentUser.uid),
      where("status", "==", "pending")
    );
    const unsubRequests = onSnapshot(qApps, (snapshot) => {
      setRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // 3. LISTEN TO PROJECTS CREATED BY USER
    const qProjects = query(
      collection(db, "projects"),
      where("authorId", "==", auth.currentUser.uid)
    );
    const unsubProjects = onSnapshot(qProjects, (snapshot) => {
      setUserProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubProfile();
      unsubRequests();
      unsubProjects();
    };
  }, [navigate]);

  // FUNCTIONS
  const handleSaveEdit = async () => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, editData);
      setIsEditing(false);
    } catch (error) {
      console.error("Save Error:", error);
      alert("Could not update profile.");
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const appRef = doc(db, "applications", id);
      await updateDoc(appRef, { status: newStatus });
    } catch (error) {
      console.error("Status Update Error:", error);
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => navigate('/'));
  };

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center bg-white font-black text-slate-300 animate-pulse uppercase tracking-[0.3em]">
      Loading Your Legacy...
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 w-full font-sans antialiased text-slate-900">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-2xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link to="/projects" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform duration-300">
              <Layers className="w-5 h-5 text-white" />
            </div>
<span className="text-3xl font-black text-orange-500 tracking-tighter uppercase">ProjectMate</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/projects" className="text-xl font-bold text-slate-600 hover:text-slate-900 transition-colors">Explore</Link>
            <button 
  onClick={handleLogout} 
  className="text-slate-500 hover:text-red-600 font-boldl text-xl md:text-xl tracking-tighter transition-all hover:scale-105 active:scale-95"
>
  Logout
</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-purple-500/5 to-blue-500/10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Profile Header Card */}
        <div className="relative -mt-48 mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-slate-900/10 border border-slate-200/50">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
              
              {/* Profile Image */}
              <div className="relative group">
                <img 
                  src={isEditing ? editData.photoURL : profile.photoURL}
                  className="relative w-40 h-40 rounded-[2rem] object-cover shadow-2xl ring-4 ring-white" 
                  alt="Profile" 
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black/20 rounded-[2rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <input 
                      type="text" 
                      placeholder="Image URL" 
                      value={editData.photoURL} 
                      onChange={e => setEditData({...editData, photoURL: e.target.value})}
                      className="bg-white p-2 rounded-lg text-[10px] w-3/4 outline-none border-none shadow-xl"
                    />
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-left">
                {isEditing ? (
                  <input 
                    value={editData.name} 
                    onChange={e => setEditData({...editData, name: e.target.value})}
                    className="text-5xl font-black tracking-tight bg-slate-50 border-2 border-slate-200 focus:border-orange-500 rounded-2xl px-6 py-3 outline-none w-full mb-4" 
                  />
                ) : (
                  <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-3">{profile.name}</h1>
                )}
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
                  {isEditing ? (
                    <div className="flex gap-2">
                      <input className="bg-slate-100 p-2 rounded-xl text-sm font-bold outline-none" value={editData.branch} onChange={e => setEditData({...editData, branch: e.target.value})} />
                      <input className="bg-slate-100 p-2 rounded-xl text-sm font-bold outline-none" value={editData.year} onChange={e => setEditData({...editData, year: e.target.value})} />
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-lg">
                        <GraduationCap size={18}/><span className="text-sm font-bold">{profile.branch}</span>
                      </div>
                      <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 rounded-full">
                        <Award size={18}/><span className="text-sm font-bold">{profile.year}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Edit Buttons */}
              <div className="flex gap-3">
                {isEditing ? (
                  <button onClick={handleSaveEdit} className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition-all"><Save size={18}/>Save</button>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-semibold flex items-center gap-2 shadow-xl hover:scale-105 transition-all"><Edit3 size={18}/></button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">
          
          <div className="lg:col-span-8 space-y-8">
            
            {/* Join Requests */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-xl border border-slate-200/50">
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-4">
                <BellRing size={20} className="text-orange-500"/> Incoming Requests ({requests.length})
              </h2>
              {requests.length === 0 ? (
                <div className="py-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold">No pending requests at the moment</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {requests.map(req => (
                    <div key={req.id} className="bg-white p-6 rounded-3xl border-2 border-slate-100 flex items-center justify-between hover:shadow-xl transition-all">
                      <div className="flex items-center gap-5">
                        <img src={req.applicantPhoto} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                        <div>
                          <p className="font-black text-slate-900 text-lg mb-1">{req.applicantName}</p>
                          <p className="text-orange-500 font-bold text-sm uppercase">{req.projectTitle}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => handleStatusUpdate(req.id, 'accepted')} className="p-3 bg-green-500 text-white rounded-2xl hover:scale-110 transition-all"><CheckCircle2 size={20}/></button>
                        <button onClick={() => handleStatusUpdate(req.id, 'declined')} className="p-3 bg-white text-slate-400 border-2 rounded-2xl hover:text-red-500 hover:border-red-500 transition-all"><XCircle size={20}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* About Section */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-xl border border-slate-200/50">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3"><MessageSquare size={18}/> Bio</h3>
              {isEditing ? (
                <textarea 
                  value={editData.bio} 
                  onChange={e => setEditData({...editData, bio: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-orange-500 p-6 rounded-2xl min-h-[150px] outline-none transition-all" 
                />
              ) : (
                <p className="text-lg font-medium leading-relaxed text-slate-600">{profile.bio}</p>
              )}
            </div>

            {/* My Projects */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-xl border border-slate-200/50">
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-4"><LayoutGrid size={20} className="text-purple-500"/> My Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProjects.map(proj => (
                  <Link to={`/project/${proj.id}`} key={proj.id} className="bg-slate-50 hover:bg-slate-900 p-8 rounded-3xl group transition-all duration-300">
                    <h3 className="text-xl font-black group-hover:text-white transition-colors">{proj.title}</h3>
                    <div className="mt-4 flex justify-between">
                      <span className="text-xs font-black text-orange-500 uppercase">{proj.duration}</span>
                      <Eye className="text-slate-300 group-hover:text-white" size={20} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4 space-y-8">
            {/* Socials */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border border-slate-200/50">
              <h3 className="text-xs font-black text-slate-400 uppercase mb-6">Connect</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                  <Github size={18} />
                  {isEditing ? (
                    <input className="w-full bg-transparent text-sm font-bold outline-none" value={editData.github} onChange={e => setEditData({...editData, github: e.target.value})} />
                  ) : (
                    <p className="text-sm font-bold truncate">{profile.github || 'No GitHub'}</p>
                  )}
                </div>
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl">
                  <Linkedin size={18} className="text-blue-600" />
                  {isEditing ? (
                    <input className="w-full bg-transparent text-sm font-bold outline-none" value={editData.linkedin} onChange={e => setEditData({...editData, linkedin: e.target.value})} />
                  ) : (
                    <p className="text-sm font-bold truncate text-blue-700">{profile.linkedin || 'No LinkedIn'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Expertise */}
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-black text-orange-500 uppercase tracking-widest mb-4">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.roles?.map((role, i) => (
                      <span key={i} className="bg-white/10 px-4 py-2 rounded-xl text-sm font-bold border border-white/10">{role}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-black text-orange-500 uppercase tracking-widest mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills?.map((skill, i) => (
                      <span key={i} className="bg-orange-500 px-4 py-2 rounded-xl text-sm font-black">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}