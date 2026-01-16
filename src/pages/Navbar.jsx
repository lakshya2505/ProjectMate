import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Layers, MessageSquare, PlusSquare, Compass, User, LogOut } from 'lucide-react';
import { auth, db } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [hasUnread, setHasUnread] = useState(false);

  // 1. Listen for new messages across all chats
  useEffect(() => {
    // Safety check: only listen if user is logged in
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHasUnread(!snapshot.empty);
    }, (error) => {
      console.error("Inbox listener error:", error);
    });

    return () => unsubscribe();
  }, [auth.currentUser]); // Re-run if auth state changes

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out successfully");
      navigate('/'); // Navigate to landing page after logout
    } catch (error) {
      console.error("Logout Error", error);
      alert("Error logging out. Please try again.");
    }
  };

  // Helper to check if a link is active
  const isActive = (path) => location.pathname === path;

 return (
  <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-2xl border-b border-slate-200/50 shadow-sm">
    {/* REDUCED SIZE: changed py-6 to py-3 */}
    <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between">
      
      {/* LOGO - Reduced from w-12 to w-10 */}
      <Link to="/projects" className="flex items-center gap-3 group cursor-pointer">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <span className="text-2xl font-black text-orange-500 tracking-tighter uppercase hidden lg:block">
          ProjectMate
        </span>
      </Link>

      {/* NAV LINKS */}
      <div className="flex items-center gap-4 md:gap-8">
        
        {/* Icons reduced from size 28 to 24 */}
        <Link to="/projects" className={`p-1.5 flex flex-col items-center gap-1 transition-all hover:scale-105 ${isActive('/projects') ? 'text-orange-500' : 'text-slate-400 hover:text-slate-900'}`}>
          <Compass size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">Explore</span>
        </Link>

        <Link to="/create" className={`p-1.5 flex flex-col items-center gap-1 transition-all hover:scale-105 ${isActive('/create') ? 'text-orange-500' : 'text-slate-400 hover:text-slate-900'}`}>
          <PlusSquare size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">Post</span>
        </Link>

        <Link to="/messages" className={`relative p-1.5 flex flex-col items-center gap-1 transition-all hover:scale-105 ${isActive('/messages') ? 'text-orange-500' : 'text-slate-400 hover:text-slate-900'}`}>
          <MessageSquare size={24} />
          {hasUnread && (
            <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-pulse shadow-sm"></span>
          )}
          <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">Inbox</span>
        </Link>

        <Link to="/profile" className={`p-1.5 flex flex-col items-center gap-1 transition-all hover:scale-105 ${isActive('/profile') ? 'text-orange-500' : 'text-slate-400 hover:text-slate-900'}`}>
          <User size={24} />
          <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">Profile</span>
        </Link>

        <div className="h-8 w-px bg-slate-200 mx-1 hidden md:block" />

        <button 
          onClick={handleLogout}
          className="p-1.5 text-slate-400 hover:text-red-500 transition-all flex flex-col items-center gap-1 group cursor-pointer"
        >
          <LogOut size={24} className="group-hover:translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">Exit</span>
        </button>
      </div>
    </div>
  </nav>
);
}