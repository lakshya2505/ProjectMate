import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Layers, ArrowLeft, Send, XCircle, Users, User, ShieldCheck, GraduationCap, MapPin, CheckCircle2 } from 'lucide-react';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const project = {
    title: "AI Study Buddy App",
    description: "Building an AI-powered study assistant that generates quizzes from PDF notes for Nirma students.",
    fullDescription: "We are developing a specialized AI tool that uses LLMs to parse university lecture notes. The goal is to help EI branch students automate their revision process by creating flashcards and practice tests instantly from campus-specific curriculum.",
    leader: "Lakshya Jain",
    members: ["Vinil Bafna", "Shubham Shah", "Sneha Reddy"],
    branch: "EI Branch",
    year: "2028",
    university: "Nirma University"
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] w-full font-sans antialiased text-slate-900 relative">
      
      {/* SUCCESS MODAL POP-UP */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Background Overlay */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative z-10 max-w-sm w-full text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Sent!</h2>
            <p className="text-slate-500 font-medium mb-8">
              You have successfully applied for <strong>{project.title}</strong>. The project leader will review your profile.
            </p>
            <button 
              onClick={() => setShowModal(false)}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md flex items-center justify-between px-6 md:px-16 py-4 border-b border-slate-200 sticky top-0 z-50 w-full">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center shadow-md">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">ProjectMate</span>
        </Link>
        <button 
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-slate-500 hover:text-orange-500 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Explore
        </button>
      </nav>

      {/* Header Section */}
      <header className="bg-white py-16 px-6 md:px-16 border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Recruiting</span>
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{project.branch}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">{project.title}</h1>
          <div className="flex items-center gap-4 text-slate-500 font-medium">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {project.university}</span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4" /> Class of {project.year}</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-4">Project Overview</h2>
              <p className="text-xl text-slate-700 leading-relaxed font-semibold mb-6">{project.description}</p>
              <div className="h-px bg-slate-100 mb-6"></div>
              <p className="text-slate-600 leading-relaxed">{project.fullDescription}</p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Team Structure</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 p-6 rounded-2xl flex items-center gap-4">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                    <User className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lead</p>
                    <p className="text-lg font-bold text-slate-800">{project.leader}</p>
                  </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl text-white">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Collaborators</p>
                  <div className="flex flex-wrap gap-2">
                    {project.members.map((name, i) => (
                      <span key={i} className="text-sm font-medium bg-white/10 px-3 py-1 rounded-lg">{name}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6 text-center">Interested in joining?</h3>
                
                <div className="space-y-4 mb-8">
                  {/* Apply Button triggers Modal */}
                  <button 
                    onClick={() => setShowModal(true)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-orange-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Apply for this project
                  </button>
                  
                  {/* Not Interested Button Navigates back */}
                  <button 
                    onClick={() => navigate('/projects')}
                    className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 py-4 rounded-xl font-bold text-base transition-all active:scale-95 flex items-center justify-center gap-2 border border-slate-200"
                  >
                    <XCircle className="w-4 h-4" /> Not Interested
                  </button>
                </div>
                
                <div className="flex items-center justify-center gap-2 pt-6 border-t border-slate-50">
                  <ShieldCheck className="text-green-500 w-5 h-5" />
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-tight">Verified Nirma Project</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}