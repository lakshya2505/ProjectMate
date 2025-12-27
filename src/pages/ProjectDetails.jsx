import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Layers, ArrowLeft, Send, XCircle, User, ShieldCheck, GraduationCap, MapPin, CheckCircle2, Loader2, Code2 } from 'lucide-react';
// 1. UPDATED IMPORTS: Added collection, addDoc, and serverTimestamp
import { db, auth } from '../services/firebase';
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false); // To prevent double-clicks

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProject(docSnap.data());
        } else {
          navigate('/projects');
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, navigate]);

  // 2. THE NEW APPLICATION LOGIC
  const handleApply = async () => {
    // Check if user is logged in
    if (!auth.currentUser) {
      alert("Please login with your Nirma account to apply!");
      return;
    }

    setIsApplying(true);

    try {
      // Create a document in the 'applications' collection
      await addDoc(collection(db, "applications"), {
        projectId: id,
        projectTitle: project.title,
        leaderId: project.authorId, // The UID of the project creator
        applicantId: auth.currentUser.uid,
        applicantName: auth.currentUser.displayName,
        applicantEmail: auth.currentUser.email,
        applicantPhoto: auth.currentUser.photoURL,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      // Only show success modal AFTER the data is saved in Firestore
      setShowModal(true);
    } catch (error) {
      console.error("Application Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="w-16 h-16 text-orange-500 animate-spin mb-4" />
      <p className="text-2xl font-black text-gray-400 uppercase tracking-widest">Loading Project Details...</p>
    </div>
  );

  if (!project) return null;

  return (
    <div className="min-h-screen bg-[#FDFDFD] w-full font-sans antialiased text-slate-900 relative">
      
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative z-10 max-w-sm w-full text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Sent!</h2>
            <p className="text-slate-500 font-medium mb-8">
              You have successfully applied for <strong>{project.title}</strong>. The leader will review your profile.
            </p>
            <button onClick={() => setShowModal(false)} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors">
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
          <span className="text-xl font-bold text-slate-800 tracking-tight uppercase">ProjectMate</span>
        </Link>
        <button onClick={() => navigate('/projects')} className="flex items-center gap-2 text-slate-500 hover:text-orange-500 font-semibold transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Explore
        </button>
      </nav>

      {/* Header Section */}
      <header className="bg-white py-16 px-6 md:px-16 border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Recruiting</span>
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{project.branch || "General"}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight uppercase">{project.title}</h1>
          <div className="flex items-center gap-4 text-slate-500 font-medium">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Nirma University</span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4" /> {project.duration || "TBD"}</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            <section className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
              <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-4 font-black">Project Overview</h2>
              <p className="text-xl text-slate-700 leading-relaxed font-bold mb-6 italic border-l-4 border-orange-500 pl-4">
                "{project.tagline || project.description}"
              </p>
              <div className="h-px bg-slate-100 mb-6"></div>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">
                {project.description}
              </p>
            </section>

            <section>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 font-black">Technologies</h2>
              <div className="flex flex-wrap gap-3">
                {project.techStack?.map((tech, i) => (
                  <span key={i} className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-orange-500" /> {tech}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 font-black">Team Structure</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 p-6 rounded-2xl flex items-center gap-4 shadow-sm">
                  <img src={project.authorPhoto || "https://i.pravatar.cc/150"} alt="" className="w-14 h-14 rounded-full border-2 border-orange-100" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project Lead</p>
                    <p className="text-lg font-bold text-slate-800">{project.authorName}</p>
                  </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl text-white">
                  <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-3">Roles Needed</p>
                  <div className="flex flex-wrap gap-2">
                    {project.rolesNeeded?.map((role, i) => (
                      <span key={i} className="text-sm font-bold bg-white/10 px-3 py-1 rounded-lg border border-white/5">{role}</span>
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
                  {/* 3. UPDATED BUTTON: Calls handleApply instead of just opening modal */}
                  <button 
                    onClick={handleApply}
                    disabled={isApplying}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-orange-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isApplying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {isApplying ? "Sending..." : "Apply for this project"}
                  </button>
                  <button onClick={() => navigate('/projects')} className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 py-4 rounded-xl font-bold text-base transition-all active:scale-95 flex items-center justify-center gap-2 border border-slate-200">
                    <XCircle className="w-4 h-4" /> Not Interested
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2 pt-6 border-t border-slate-50">
                  <ShieldCheck className="text-green-500 w-5 h-5" />
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-tighter">Verified Nirma University Builder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}