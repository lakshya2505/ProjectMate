import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom'; // Added useParams
import { 
  Layers, GraduationCap, CheckCircle2, XCircle, MessageSquare, 
  Edit3, Save, Github, Linkedin, 
  Eye, LayoutGrid, BellRing, Bell, Award
} from 'lucide-react';
import Navbar from './Navbar';
// FIREBASE IMPORTS
import { db, auth } from '../services/firebase';
import { doc, onSnapshot, updateDoc, collection, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function UserProfile() {
  const navigate = useNavigate();
  const { uid } = useParams(); // Get UID from URL if it exists
  
  // LOGIC: Determine which user to show
  const currentUserId = auth.currentUser?.uid;
  const targetUid = uid || currentUserId; 
  const isOwnProfile = targetUid === currentUserId;

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

    if (!targetUid) return;

    // 1. LISTEN TO PROFILE DATA (Uses targetUid)
    const userRef = doc(db, "users", targetUid);
    const unsubProfile = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile(data);
        setEditData(data);
      }
    });

    // 2. LISTEN TO INCOMING APPLICATIONS (Only if it's your own profile)
    let unsubRequests = () => {};
    if (isOwnProfile) {
      const qApps = query(
        collection(db, "applications"),
        where("leaderId", "==", currentUserId),
        where("status", "==", "pending")
      );
      unsubRequests = onSnapshot(qApps, (snapshot) => {
        setRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
    }

    // 3. LISTEN TO PROJECTS CREATED BY THE TARGET USER
    const qProjects = query(
      collection(db, "projects"),
      where("authorId", "==", targetUid)
    );
    const unsubProjects = onSnapshot(qProjects, (snapshot) => {
      setUserProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubProfile();
      unsubRequests();
      unsubProjects();
    };
  }, [targetUid, isOwnProfile, navigate, currentUserId]);

  // FUNCTIONS
  const handleSaveEdit = async () => {
    try {
      const userRef = doc(db, "users", currentUserId);
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
      Loading Profile...
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 w-full font-sans antialiased text-slate-900">
      
      {/* Navbar */}
      <div className="...">
      <Navbar /> {/* This replaces your old 40 lines of navbar code! */}
      <div className="pt-20"> {/* Add padding-top so navbar doesn't cover content */}
         {/* rest of your profile code */}
      </div>
    </div>

      {/* Hero Background */}
      <div className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-purple-500/5 to-blue-500/10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Profile Header Card */}
        <div className="relative -mt-48 mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-slate-900/10 border border-slate-200/50">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
              
              <div className="relative group">
                <img 
                  src={isEditing ? editData.photoURL : profile.photoURL}
                  className="relative w-40 h-40 rounded-[2rem] object-cover shadow-2xl ring-4 ring-white" 
                  alt="Profile" 
                />
                {isEditing && isOwnProfile && (
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
                      <input className="bg-slate-100 p-2 rounded-xl text-sm font-bold outline-none" placeholder="Branch" value={editData.branch} onChange={e => setEditData({...editData, branch: e.target.value})} />
                      <input className="bg-slate-100 p-2 rounded-xl text-sm font-bold outline-none" placeholder="Year" value={editData.year} onChange={e => setEditData({...editData, year: e.target.value})} />
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

           {/* Action Buttons Group */}
<div className="flex flex-col sm:flex-row gap-3 mt-6 lg:mt-0 lg:ml-auto">
  
  {/* 1. MESSAGE BUTTON: Only shows when visiting someone else */}
  {!isOwnProfile && (
    <button 
      onClick={() => {
        const chatId = [currentUserId, targetUid].sort().join('_');
        navigate(`/chat/${chatId}/${profile?.name || 'User'}`);
      }}
      className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
    >
      <MessageSquare size={20} />
      Message {profile?.name ? profile.name.split(' ')[0] : 'Member'}
    </button>
  )}

  {/* 2. OWNER BUTTONS: Only shows on YOUR profile */}
  {isOwnProfile && (
    <>
      <button 
        onClick={() => navigate('/pending-requests')}
        className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-all"
      >
        <Bell size={18} />
        Manage Requests {requests.length > 0 && `(${requests.length})`}
      </button>

      {isEditing ? (
        <button 
          onClick={handleSaveEdit} 
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all"
        >
          <Save size={18}/> Save
        </button>
      ) : (
        <button 
          onClick={() => setIsEditing(true)} 
          className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all"
        >
          <Edit3 size={18}/> Edit Profile
        </button>
      )}
    </>
  )}
</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">
          <div className="lg:col-span-8 space-y-8">
            
            {/* INCOMING REQUESTS PREVIEW (Hidden if viewing someone else) */}
            {isOwnProfile && requests.length > 0 && (
              <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-xl border border-slate-200/50">
                <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center justify-between">
                  <span className="flex items-center gap-4"><BellRing size={20} className="text-orange-500"/> Recent Requests</span>
                  <Link to="/pending-requests" className="text-sm text-orange-500 hover:underline">View All</Link>
                </h2>
                <div className="space-y-4">
                  {requests.slice(0, 3).map(req => (
                    <div key={req.id} className="bg-white p-6 rounded-3xl border-2 border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-400">?</div>
                        <div>
                          <p className="font-black text-slate-900">{req.applicantName}</p>
                          <p className="text-orange-500 font-bold text-xs uppercase">{req.projectTitle}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleStatusUpdate(req.id, 'accepted')} className="p-2 bg-green-500 text-white rounded-xl hover:scale-110 transition-all"><CheckCircle2 size={18}/></button>
                        <button onClick={() => handleStatusUpdate(req.id, 'declined')} className="p-2 bg-slate-100 text-slate-400 rounded-xl hover:text-red-500 transition-all"><XCircle size={18}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-xl border border-slate-200/50">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3"><MessageSquare size={18}/> Bio</h3>
              {isEditing && isOwnProfile ? (
                <textarea 
                  value={editData.bio} 
                  onChange={e => setEditData({...editData, bio: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-orange-500 p-6 rounded-2xl min-h-[150px] outline-none transition-all" 
                />
              ) : (
                <p className="text-lg font-medium leading-relaxed text-slate-600">{profile.bio || "No bio added yet."}</p>
              )}
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-xl border border-slate-200/50">
              <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-4"><LayoutGrid size={20} className="text-purple-500"/> {isOwnProfile ? "My Projects" : `${profile.name}'s Projects`}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProjects.map(proj => (
                  <Link to={`/project/${proj.id}`} key={proj.id} className="bg-slate-50 hover:bg-slate-900 p-8 rounded-3xl group transition-all duration-300">
                    <h3 className="text-xl font-black group-hover:text-white transition-colors">{proj.title}</h3>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs font-black text-orange-500 uppercase">{proj.status || 'Active'}</span>
                      <Eye className="text-slate-300 group-hover:text-white" size={20} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border border-slate-200/50">
              <h3 className="text-xs font-black text-slate-400 uppercase mb-6 tracking-widest">Connect</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                  <Github size={18} />
                  {isEditing && isOwnProfile ? (
                    <input className="w-full bg-transparent text-sm font-bold outline-none" value={editData.github} onChange={e => setEditData({...editData, github: e.target.value})} />
                  ) : (
                    <p className="text-sm font-bold truncate">{profile.github || 'No GitHub'}</p>
                  )}
                </div>
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl">
                  <Linkedin size={18} className="text-blue-600" />
                  {isEditing && isOwnProfile ? (
                    <input className="w-full bg-transparent text-sm font-bold outline-none" value={editData.linkedin} onChange={e => setEditData({...editData, linkedin: e.target.value})} />
                  ) : (
                    <p className="text-sm font-bold truncate text-blue-700">{profile.linkedin || 'No LinkedIn'}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl">
              <div className="space-y-10">
                <div>
                  <h3 className="text-xs font-black text-orange-500 uppercase tracking-widest mb-5">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {isEditing && isOwnProfile ? (
                      <input 
                        type="text"
                        className="w-full bg-white/10 border border-white/10 p-3 rounded-xl text-sm font-bold outline-none"
                        value={Array.isArray(editData.roles) ? editData.roles.join(', ') : ''}
                        onChange={(e) => setEditData({...editData, roles: e.target.value.split(',').map(s => s.trim())})}
                      />
                    ) : (
                      profile.roles?.map((role, i) => (
                        <span key={i} className="bg-white/10 px-4 py-2 rounded-xl text-sm font-bold border border-white/10 tracking-tight">{role}</span>
                      ))
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-black text-orange-500 uppercase tracking-widest mb-5">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {isEditing && isOwnProfile ? (
                      <input 
                        type="text"
                        className="w-full bg-white/10 border border-white/10 p-3 rounded-xl text-sm font-bold outline-none"
                        value={Array.isArray(editData.skills) ? editData.skills.join(', ') : ''}
                        onChange={(e) => setEditData({...editData, skills: e.target.value.split(',').map(s => s.trim())})}
                      />
                    ) : (
                      profile.skills?.map((skill, i) => (
                        <span key={i} className="bg-orange-500 px-4 py-2 rounded-xl text-sm font-black tracking-tight">{skill}</span>
                      ))
                    )}
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