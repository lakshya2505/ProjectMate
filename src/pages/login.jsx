import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Users, Rocket, Search } from "lucide-react";

export default function ProjectMateLanding() {
  return (
    <div className="min-h-screen bg-white w-full">
      {/* Navigation - Increased height and font size */}
      <nav className="flex items-center justify-between px-8 md:px-12 py-8 border-b border-gray-100 sticky top-0 bg-white z-50 w-full">
        <Link to="/" className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
            <Layers className="w-8 h-8 text-white" />
          </div>
          <span className="text-3xl font-black text-orange-500 tracking-tighter">ProjectMate</span>
        </Link>
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-12">
            <Link to="/projects" className="relative text-gray-500 hover:text-orange-500 text-xl font-bold transition-colors duration-200 group">
              Projects
              <span className="absolute -bottom-2 left-0 w-0 h-1 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            
            <Link to="/create" className="relative text-gray-500 hover:text-orange-500 text-xl font-bold transition-colors duration-200 group">
              Post Project
              <span className="absolute -bottom-2 left-0 w-0 h-1 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            
            <Link to="/profile" className="relative text-gray-500 hover:text-orange-500 text-xl font-bold transition-colors duration-200 group">
              Profile
              <span className="absolute -bottom-2 left-0 w-0 h-1 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
            </Link>

            <Link to="/login" className="bg-gray-900 text-white px-10 py-4 rounded-2xl text-xl font-black hover:bg-orange-600 transition-all active:scale-95 shadow-lg">
              Log In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Width & Massive Text */}
      <section className="px-8 md:px-12 py-24 md:py-32 w-full">
        <div className="w-full grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h1 className="text-7xl md:text-9xl font-black text-gray-900 tracking-tighter leading-none mb-10">
              Find the right <span className="text-orange-600">teammates</span> for your next project
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 font-medium leading-relaxed mb-12 max-w-4xl">
              Connect with students, match based on skills and interests, and collaborate on 
              academic research, hackathons, or side projects.
            </p>
            <div className="flex gap-6">
              <Link 
                to="/projects" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-6 rounded-3xl font-black text-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-orange-500/20 text-center"
              >
                Explore Projects
              </Link>

              <Link 
                to="/create"
                className="bg-white border-4 border-gray-100 hover:border-orange-500 hover:text-orange-600 text-gray-900 
                           px-12 py-6 rounded-3xl font-black text-2xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
              >
                Post a Project
              </Link>
            </div>
          </div>
          <div className="relative w-full h-full">
            <div className="rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] h-full">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=900&fit=crop" 
                alt="Students collaborating" 
                className="w-full h-full object-cover min-h-[600px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Larger Cards */}
      <section className="px-8 md:px-12 py-32 bg-white w-full">
        <div className="w-full">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter">
              How It Works
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto font-bold">
              Start building your portfolio in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16">
            {/* Step 1 */}
            <div className="group cursor-default">
              <div className="w-28 h-28 bg-orange-500 rounded-3xl mb-10 flex items-center justify-center shadow-xl shadow-orange-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <img src="/assets/image_fd5040.png" alt="" className="w-16 h-16 brightness-0 invert" />
              </div>
              <h3 className="text-4xl font-black text-gray-900 mb-6">1. Create your profile</h3>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Sign up and highlight your skills, interests, and past experience to showcase what you bring to the table.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group cursor-default">
              <div className="w-28 h-28 bg-orange-500 rounded-3xl mb-10 flex items-center justify-center shadow-xl shadow-orange-500/20 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <img src="/assets/image_fd53a7.png" alt="" className="w-16 h-16 brightness-0 invert" />
              </div>
              <h3 className="text-4xl font-black text-gray-900 mb-6">2. Find or post projects</h3>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Browse exciting opportunities that match your skills or post your own idea to find the perfect teammates.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group cursor-default">
              <div className="w-28 h-28 bg-orange-500 rounded-3xl mb-10 flex items-center justify-center shadow-xl shadow-orange-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <img src="/assets/image_fd541f.png" alt="" className="w-16 h-16 brightness-0 invert" />
              </div>
              <h3 className="text-4xl font-black text-gray-900 mb-6">3. Match and collaborate</h3>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Connect with like-minded students, form a team, and start building impactful projects together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why ProjectMate Section - Bold & High Contrast */}
      <section className="px-8 md:px-12 py-32 bg-[#FFF5F1] w-full">
        <div className="w-full">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter">
              Why ProjectMate?
            </h2>
            <p className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto font-bold">
              Designed for students to bridge the gap between ideas and execution.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-white rounded-[3rem] p-16 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 group">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-orange-500 transition-colors duration-300">
                <Users className="w-10 h-10 text-orange-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-6">Skill-based Matching</h3>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Our smart matching system ensures you find teammates with complementary skills, not just random connections.
              </p>
            </div>

            <div className="bg-white rounded-[3rem] p-16 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 group">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-orange-500 transition-colors duration-300">
                <Rocket className="w-10 h-10 text-orange-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-6">Easy Collaboration</h3>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Built-in tools to help you communicate, manage tasks, and track progress without the headache.
              </p>
            </div>

            <div className="bg-white rounded-[3rem] p-16 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-4 group">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-orange-500 transition-colors duration-300">
                <Search className="w-10 h-10 text-orange-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-6">Student-Focused</h3>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Tailored specifically for the academic and hackathon environment, understanding student schedules and goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Massive Call to Action */}
      <section className="px-8 md:px-12 py-32 w-full">
        <div className="bg-orange-500 rounded-[4rem] p-24 md:p-32 text-center relative overflow-hidden shadow-[0_40px_80px_-15px_rgba(249,115,22,0.4)]">
          {/* Animated Glow Elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-400 rounded-full blur-[120px] opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600 rounded-full blur-[120px] opacity-40 translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10">
            <h2 className="text-7xl md:text-9xl font-black text-white mb-10 tracking-tighter leading-none">
              Ready to build <br /> something amazing?
            </h2>
            <p className="text-2xl md:text-4xl text-white/90 mb-16 max-w-5xl mx-auto font-bold leading-tight">
              Join thousands of students across campuses turning their biggest ideas into reality today.
            </p>

            <button className="inline-flex items-center gap-6 bg-white text-gray-900 px-16 py-8 rounded-[2rem] font-black text-3xl hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 shadow-2xl">
              <svg className="w-10 h-10" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Get Started with Google
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}