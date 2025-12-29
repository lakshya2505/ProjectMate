import { auth, db, googleProvider } from '../services/firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Essential for the check
import { useNavigate } from 'react-router-dom';
import { Layers } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    if (user) {
      // Check if this specific UID has a document in the "users" collection
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // RETURNING USER: Send to projects feed
        navigate('/login');
      } else {
        // FIRST TIME USER: Send to setup profile
        navigate('/setup-profile');
      }
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert("Login failed. Please use your Nirma account.");
  }
};

  return (
    <div className="min-h-screen bg-[#FDFDFD] w-full font-sans antialiased text-slate-900">
      
      {/* Navigation - ProjectMate Branded */}
      <nav className="flex items-center justify-between px-10 py-8 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Layers className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-slate-800 uppercase">ProjectMate</span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto pt-24 md:pt-32 px-8 text-center">
        <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-[1.05] mb-12">
          The place for <br /> 
          <span className="text-orange-500">Nirma builders.</span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-slate-600 mb-16 max-w-3xl mx-auto font-semibold leading-relaxed">
          Sign in to discover projects, find teammates, and ship your next big idea within the university.
        </p>

        <button 
          onClick={handleGoogleLogin}
          className="bg-orange-500 text-white px-12 py-6 rounded-3xl font-black text-2xl hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_-15px_rgba(249,115,22,0.4)] flex items-center gap-6 mx-auto mb-10"
        >
          <div className="bg-white p-1 rounded-full">
            <svg className="w-7 h-7" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          </div>
          Continue with Google
        </button>

        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-slate-200"></div>
          <p className="text-sm font-black text-orange-400 uppercase tracking-[0.3em]">
            Verified Nirma Account Required
          </p>
          <div className="h-px w-12 bg-slate-200"></div>
        </div>
      </main>
    </div>
  );
}
