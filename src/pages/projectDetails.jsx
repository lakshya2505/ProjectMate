import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Layers, ArrowLeft, Send, XCircle, User, ShieldCheck, GraduationCap, MapPin, CheckCircle2, Loader2, Code2, Users, Mail, Github, Linkedin, X, TrendingUp, MessageSquare } from 'lucide-react';
import { db, auth } from '../services/firebase';
import { doc, getDoc, collection, addDoc, serverTimestamp, query, where, getDocs, onSnapshot } from 'firebase/firestore';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  
  // NEW STATES
  const [hasApplied, setHasApplied] = useState(false);
  const [applicantCount, setApplicantCount] = useState(0);
  const [creatorProfile, setCreatorProfile] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [skillMatchPercentage, setSkillMatchPercentage] = useState(0);

  // Calculate skill match percentage
  const calculateSkillMatch = (userSkills, projectTechStack) => {
    if (!userSkills || !projectTechStack || userSkills.length === 0 || projectTechStack.length === 0) {
      return 0;
    }
    const userSkillsLower = userSkills.map(s => s.toLowerCase());
    const projectTechLower = projectTechStack.map(t => t.toLowerCase());
    const matches = projectTechLower.filter(tech => 
      userSkillsLower.some(skill => skill.includes(tech) || tech.includes(skill))
    );
    return Math.round((matches.length / projectTechLower.length) * 100);
  };

  useEffect(() => {
    let unsubscribe = null;

    const fetchData = async () => {
      try {
        // 1. Fetch project
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          navigate('/projects');
          setLoading(false);
          return;
        }

        const projectData = docSnap.data();
        setProject(projectData);

        // 2. Fetch creator profile
        if (projectData.authorId) {
          const creatorRef = doc(db, "users", projectData.authorId);
          const creatorSnap = await getDoc(creatorRef);
          if (creatorSnap.exists()) {
            setCreatorProfile(creatorSnap.data());
          }
        }

        // 3. Fetch user profile (if logged in)
        if (auth.currentUser) {
          const userRef = doc(db, "users", auth.currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUserProfile(userData);
            // Calculate skill match
            const match = calculateSkillMatch(userData.skills, projectData.techStack);
            setSkillMatchPercentage(match);
          }
        }

        // 4. Check if user already applied and count applicants
        const applicationsQuery = query(
          collection(db, "applications"),
          where("projectId", "==", id)
        );
        
        if (auth.currentUser) {
          // Real-time listener for logged-in users
          unsubscribe = onSnapshot(applicationsQuery, (snapshot) => {
            const applications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setApplicantCount(applications.length);
            
            // Check if current user has applied
            const userApplication = applications.find(
              app => app.applicantId === auth.currentUser.uid
            );
            setHasApplied(!!userApplication);
          });
        } else {
          // One-time fetch for non-logged-in users
          const snapshot = await getDocs(applicationsQuery);
          setApplicantCount(snapshot.size);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();

    // Cleanup function
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [id, navigate]);

  const handleApply = () => {
    if (!auth.currentUser) {
      alert("Please login with your Nirma account to apply!");
      navigate('/login');
      return;
    }
    if (hasApplied) {
      alert("You have already applied for this project!");
      return;
    }
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = async () => {
    if (!applicationMessage.trim()) {
      alert("Please add a message to your application!");
      return;
    }

    setIsApplying(true);

    try {
      await addDoc(collection(db, "applications"), {
        projectId: id,
        projectTitle: project.title,
        leaderId: project.authorId,
        applicantId: auth.currentUser.uid,
        applicantName: auth.currentUser.displayName || userProfile?.name,
        applicantEmail: auth.currentUser.email,
        applicantPhoto: auth.currentUser.photoURL || userProfile?.photoURL,
        applicantBranch: userProfile?.branch,
        message: applicationMessage,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setShowApplicationModal(false);
      setApplicationMessage('');
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
      
      {/* Success Modal */}
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

      {/* Enhanced Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowApplicationModal(false)}></div>
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl relative z-10 max-w-lg w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900">Apply for Project</h2>
              <button onClick={() => setShowApplicationModal(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Skill Match Indicator */}
              {skillMatchPercentage > 0 && (
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-4 border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-orange-700 uppercase">Skill Match</span>
                    <span className="text-2xl font-black text-orange-600">{skillMatchPercentage}%</span>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${skillMatchPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-orange-600 font-semibold mt-2">
                    {skillMatchPercentage >= 70 ? "Great match! Your skills align well with this project." :
                     skillMatchPercentage >= 40 ? "Good match. Some skills align with the project." :
                     "Consider learning more about the required technologies."}
                  </p>
                </div>
              )}

              {/* Application Message */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Why do you want to join this project?
                </label>
                <textarea
                  value={applicationMessage}
                  onChange={(e) => setApplicationMessage(e.target.value)}
                  placeholder="Tell the project leader why you're interested and what you can contribute..."
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-orange-500 rounded-2xl p-4 min-h-[150px] outline-none transition-all resize-none font-medium"
                />
                <p className="text-xs text-slate-400 mt-2 font-semibold">
                  {applicationMessage.length} characters
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitApplication}
                disabled={isApplying || !applicationMessage.trim()}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-300 disabled:to-slate-400 text-white py-4 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg"
              >
                {isApplying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending Application...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </button>
            </div>
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
                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={project.authorPhoto || creatorProfile?.photoURL || "https://i.pravatar.cc/150"} alt="" className="w-14 h-14 rounded-full border-2 border-orange-100" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project Lead</p>
                      <p className="text-lg font-bold text-slate-800">{project.authorName}</p>
                    </div>
                  </div>
                  
                  {/* Contact Information */}
                  {creatorProfile && (
                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Contact</p>
                      {creatorProfile.email && (
                        <a href={`mailto:${creatorProfile.email}`} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-orange-500 transition-colors">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{creatorProfile.email}</span>
                        </a>
                      )}
                      {creatorProfile.github && (
                        <a href={creatorProfile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                          <Github className="w-4 h-4" />
                          <span className="truncate">GitHub Profile</span>
                        </a>
                      )}
                      {creatorProfile.linkedin && (
                        <a href={creatorProfile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                          <Linkedin className="w-4 h-4" />
                          <span className="truncate">LinkedIn Profile</span>
                        </a>
                      )}
                    </div>
                  )}
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
              {/* Applicant Count Card */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6" />
                    <span className="text-sm font-bold uppercase tracking-wide">Applicants</span>
                  </div>
                  <span className="text-3xl font-black">{applicantCount}</span>
                </div>
                <p className="text-xs text-orange-100 font-semibold">
                  {applicantCount === 0 ? "Be the first to apply!" :
                   applicantCount === 1 ? "1 person has applied" :
                   `${applicantCount} people have applied`}
                </p>
              </div>

              {/* Application Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6 text-center">Interested in joining?</h3>
                
                {/* Skill Match Badge */}
                {skillMatchPercentage > 0 && (
                  <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-bold text-slate-600 uppercase">Your Match</span>
                      </div>
                      <span className="text-xl font-black text-orange-600">{skillMatchPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div 
                        className="bg-orange-500 h-1.5 rounded-full transition-all"
                        style={{ width: `${skillMatchPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="space-y-4 mb-8">
                  {hasApplied ? (
                    <div className="w-full bg-green-50 border-2 border-green-200 text-green-700 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Application Submitted
                    </div>
                  ) : (
                    <button 
                      onClick={handleApply}
                      disabled={isApplying}
                      className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-xl font-bold text-base shadow-lg shadow-orange-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      {isApplying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      {isApplying ? "Sending..." : "Apply for this project"}
                    </button>
                  )}
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