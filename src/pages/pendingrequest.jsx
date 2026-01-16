import React, { useEffect, useState } from 'react';
import { db, auth } from '../services/firebase';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  updateDoc, 
  arrayUnion, 
  getDoc 
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Check, X, ExternalLink, ArrowLeft, Bell, Briefcase, Eye } from 'lucide-react';

export default function PendingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) return;

    // Listens for applications where the logged-in user is the Project Lead
    const q = query(
      collection(db, "applications"),
      where("leaderId", "==", auth.currentUser.uid),
      where("status", "==", "pending")
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const requestsData = await Promise.all(
        snapshot.docs.map(async (applicationDoc) => {
          const data = applicationDoc.data();
          // Fetch real-time applicant profile data (Photo, Roles, etc.)
          const userSnap = await getDoc(doc(db, "users", data.applicantId));
          const userData = userSnap.exists() ? userSnap.data() : {};

          return {
            id: applicationDoc.id,
            ...data,
            applicantInfo: userData 
          };
        })
      );
      setRequests(requestsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAccept = async (request) => {
    try {
      // Update application status to accepted
      await updateDoc(doc(db, "applications", request.id), { status: 'accepted' });
      
      // Push applicant into the specific project's members list
      await updateDoc(doc(db, "projects", request.projectId), {
        members: arrayUnion(request.applicantId)
      });
      
      alert(`Accepted ${request.applicantInfo.name || 'Student'}!`);
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleDecline = async (requestId) => {
    if (window.confirm("Decline this applicant?")) {
      await updateDoc(doc(db, "applications", requestId), { status: 'declined' });
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white font-bold text-slate-400 animate-pulse uppercase tracking-widest">
      Fetching Applications...
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-all group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Profile
          </button>
          
          <div className="flex items-center gap-3 bg-white px-5 py-2 rounded-2xl shadow-sm border border-slate-100">
            <Bell size={18} className="text-orange-500" />
            <span className="font-bold text-slate-700">{requests.length} Requests Waiting</span>
          </div>
        </div>

        <h2 className="text-5xl font-black mb-10 tracking-tight text-slate-900">
          Manage <span className="text-orange-500">Talent.</span>
        </h2>
        
        {requests.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-20 text-center">
            <p className="text-slate-400 text-xl font-bold italic text-balance">
              Your inbox is clear. New project requests will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {requests.map((req) => (
              <div key={req.id} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 flex flex-col lg:flex-row items-center justify-between gap-6 hover:scale-[1.01] transition-all">
                
                {/* Applicant Profile Info */}
                <div className="flex items-center gap-6">
                  <img 
                    src={req.applicantInfo.photoURL || `https://ui-avatars.com/api/?name=${req.applicantInfo.name}`} 
                    className="w-20 h-20 rounded-3xl object-cover shadow-lg" 
                    alt="Applicant" 
                  />
                  
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 leading-tight">
                      {req.applicantInfo.name}
                    </h3>
                    <p className="text-slate-500 font-bold mb-3">
                      Applying for: <span className="text-orange-500 underline decoration-2 underline-offset-4">{req.projectTitle}</span>
                    </p>
                    
                    {/* Role Labels */}
                    <div className="flex flex-wrap gap-2 items-center">
                      <Briefcase size={14} className="text-slate-400" />
                      {req.applicantInfo.roles && req.applicantInfo.roles.length > 0 ? (
                        req.applicantInfo.roles.map(role => (
                          <span key={role} className="px-3 py-1 bg-blue-50 rounded-lg text-[10px] font-black text-blue-600 uppercase tracking-wider border border-blue-100">
                            {role}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400 italic font-medium">No roles specified</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Button Group */}
                <div className="flex items-center gap-3 w-full lg:w-auto">
                  
                  {/* VISIT PROFILE: Integrated here */}
                  <button 
                    onClick={() => navigate(`/profile/${req.applicantId}`)}
                    className="flex-1 lg:flex-none p-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-2xl transition-all flex items-center justify-center gap-2"
                    title="View Full Profile"
                  >
                    <Eye size={20} />
                    <span className="lg:hidden font-bold">View Profile</span>
                  </button>

                  <button 
                    onClick={() => window.open(req.applicantInfo.github, "_blank")}
                    className="flex-1 lg:flex-none p-4 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl transition-all"
                    title="View GitHub"
                  >
                    <ExternalLink className="mx-auto" />
                  </button>
                  
                  <button 
                    onClick={() => handleDecline(req.id)}
                    className="flex-1 lg:flex-none p-4 bg-white border-2 border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100 rounded-2xl transition-all"
                    title="Decline"
                  >
                    <X className="mx-auto" />
                  </button>

                  <button 
                    onClick={() => handleAccept(req)}
                    className="flex-[2] lg:flex-none bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
                  >
                    <Check size={20} /> Accept
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}