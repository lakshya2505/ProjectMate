import React, { useState, useEffect } from 'react';
import { db, auth } from '../services/firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, User, ArrowRight, Clock, Search } from 'lucide-react';
import Navbar from './Navbar';

export default function Messages() {
  const [inbox, setInbox] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", auth.currentUser.uid),
      orderBy("lastUpdated", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setInbox(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Helper to format time (e.g., "2m ago" or "Just now")
  const formatRelativeTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="pt-32 md:pt-40 max-w-4xl mx-auto px-6 pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">
              Your <span className="text-orange-500">Inbox.</span>
            </h1>
            <p className="text-slate-500 font-bold mt-2">
              {inbox.length} {inbox.length === 1 ? 'active conversation' : 'active conversations'}
            </p>
          </div>
          
          {/* Quick Search Bar */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all w-full md:w-80 font-bold text-slate-700 shadow-sm"
            />
          </div>
        </div>

        {/* Messaging List */}
        <div className="space-y-4">
          {loading ? (
            // Simple Skeleton Loader
            [1, 2, 3].map(n => (
              <div key={n} className="h-24 w-full bg-slate-200 animate-pulse rounded-[2rem]"></div>
            ))
          ) : inbox.length > 0 ? (
            inbox.map((chat) => {
              const otherUid = chat.participants.find(id => id !== auth.currentUser.uid);
              const otherName = chat[`name_${otherUid}`] || "Nirma Student";
              
              return (
                <div 
                  key={chat.id}
                  onClick={() => navigate(`/chat/${chat.id}/${otherName}`)}
                  className="bg-white p-5 md:p-7 rounded-[2.2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-6 overflow-hidden">
                    {/* Avatar with initials logic */}
                    <div className="relative shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200 transition-transform group-hover:rotate-6">
                        <span className="text-xl font-black text-white">{otherName.charAt(0)}</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
                    </div>

                    <div className="overflow-hidden">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-black text-slate-900 truncate">{otherName}</h3>
                        <span className="shrink-0 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                          <Clock size={10} /> {formatRelativeTime(chat.lastUpdated)}
                        </span>
                      </div>
                      <p className="text-slate-500 font-bold line-clamp-1 text-sm md:text-base leading-relaxed">
                        {chat.lastMessage || "No messages yet. Send a greeting!"}
                      </p>
                    </div>
                  </div>

                  <div className="ml-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-50 group-hover:bg-orange-500 group-hover:text-white transition-all text-slate-300">
                      <ArrowRight size={24} />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // EMPTY STATE
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="text-slate-300" size={40} />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Quiet in here...</h2>
              <p className="text-slate-500 font-bold mt-2 mb-8 max-w-xs mx-auto">
                Reach out to project leads or wait for students to message you!
              </p>
              <button 
                onClick={() => navigate('/projects')}
                className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-orange-500/20 hover:scale-105 transition-all"
              >
                Discover Projects
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}