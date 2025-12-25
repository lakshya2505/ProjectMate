import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Menu, Users, Rocket, Search } from "lucide-react"; // Added Users, Rocket, Search

export default function ProjectMateLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-orange-500">ProjectMate</span>
        </div>
        <div className="flex items-center gap-8">
         <div className="flex items-center gap-8">
  {/* Standard Links with improved hover effect */}
  <a href="#" className="relative text-gray-500 hover:text-orange-500 text-sm font-medium transition-colors duration-200 group">
    Projects
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
  </a>
  
  <a href="#" className="relative text-gray-500 hover:text-orange-500 text-sm font-medium transition-colors duration-200 group">
    Post Project
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
  </a>
  
  <a href="#" className="relative text-gray-500 hover:text-orange-500 text-sm font-medium transition-colors duration-200 group">
    Profile
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
  </a>

  {/* Transformed "Log In" Link into a clean Button */}
  <button className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-orange-600 transition-all active:scale-95 shadow-sm">
    Log In
  </button>
</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 tracking-tighter leading-tight mb-6">
  Find the right <span className="text-orange-600">teammates</span> for your next project
</h1>
            <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-2xl mb-8">
  Connect with students, match based on skills and interests, and collaborate on 
  academic research, hackathons, or side projects.
</p>
            <div className="flex gap-4">
  {/* Primary Button: Explore Projects */}
  {/* We change 'button' to 'Link' and add 'to="/projects"' */}
<Link 
  to="/projects" 
  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-200 text-center"
>
  Explore Projects
</Link>

  {/* Secondary Button: Post a Project */}
  <button className="bg-white border-2 border-gray-200 hover:border-orange-500 hover:text-orange-600 text-gray-900 
                     px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95">
    Post a Project
  </button>
</div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" 
                alt="Students collaborating" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 md:px-16 py-24 bg-white">
  <div className="max-w-7xl mx-auto">
    {/* Section Header */}
    <div className="text-center mb-20">
      <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
        How It Works
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Start building your portfolio in three simple steps
      </p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-12">
      {/* Step 1: Create Profile */}
      <div className="group cursor-default">
        <div className="w-20 h-20 bg-orange-500 rounded-2xl mb-8 flex items-center justify-center shadow-lg shadow-orange-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
          {/* Replace 'path-to-pic1' with your actual image path */}
          <img 
            src="/assets/image_fd5040.png" 
            alt="Profile"
            className="w-12 h-12 object-contain brightness-0 invert" 
          />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          1. Create your profile
        </h3>
        <p className="text-gray-600 leading-relaxed text-lg">
          Sign up and highlight your skills, interests, and past experience to showcase what you bring to the table.
        </p>
      </div>

      {/* Step 2: Find Projects */}
      <div className="group cursor-default">
        <div className="w-20 h-20 bg-orange-500 rounded-2xl mb-8 flex items-center justify-center shadow-lg shadow-orange-200 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3">
          {/* Replace 'path-to-pic2' with your actual image path */}
          <img 
            src="/assets/image_fd53a7.png" 
            alt="Stats Icon" 
            className="w-12 h-12 object-contain brightness-0 invert" 
          />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          2. Find or post projects
        </h3>
        <p className="text-gray-600 leading-relaxed text-lg">
          Browse exciting opportunities that match your skills or post your own idea to find the perfect teammates.
        </p>
      </div>

      {/* Step 3: Match & Collaborate */}
      <div className="group cursor-default">
        <div className="w-20 h-20 bg-orange-500 rounded-2xl mb-8 flex items-center justify-center shadow-lg shadow-orange-200 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
          {/* Replace 'path-to-pic3' with your actual image path */}
          <img 
            src="/assets/image_fd541f.png" 
            alt="Collab Icon" 
            className="w-12 h-12 object-contain brightness-0 invert" 
          />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          3. Match and collaborate
        </h3>
        <p className="text-gray-600 leading-relaxed text-lg">
          Connect with like-minded students, form a team, and start building impactful projects together.
        </p>
      </div>
    </div>
  </div>
</section>
    <section className="px-6 md:px-16 py-24 bg-[#FFF5F1]">
  <div className="max-w-7xl mx-auto">
    {/* Section Header */}
    <div className="text-center mb-16 animate-fade-in-up">
      <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
        Why ProjectMate?
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Designed for students to bridge the gap between ideas and execution.
      </p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-8">
      {/* Feature 1: Skill-based Matching */}
      <div className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-500 transition-colors duration-300">
          <Users className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Skill-based Matching
        </h3>
        <p className="text-gray-600 leading-relaxed text-lg">
          Our smart matching system ensures you find teammates with complementary skills, not just random connections.
        </p>
      </div>

      {/* Feature 2: Easy Collaboration */}
      <div className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-500 transition-colors duration-300">
          <Rocket className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Easy Collaboration
        </h3>
        <p className="text-gray-600 leading-relaxed text-lg">
          Built-in tools to help you communicate, manage tasks, and track progress without the headache.
        </p>
      </div>

      {/* Feature 3: Student-Focused */}
      <div className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
        <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-500 transition-colors duration-300">
          <Search className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Student-Focused
        </h3>
        <p className="text-gray-600 leading-relaxed text-lg">
          Tailored specifically for the academic and hackathon environment, understanding student schedules and goals.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Final CTA Section */}
<section className="px-6 md:px-16 py-16 md:py-24 mx-6 md:mx-16 my-24 bg-orange-500 rounded-[3rem] shadow-[0_20px_50px_rgba(249,115,22,0.3)] relative overflow-hidden group">
  {/* Decorative Background Elements */}
  <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-orange-400 rounded-full blur-3xl opacity-50 transition-transform group-hover:scale-110 duration-700"></div>
  <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-orange-600 rounded-full blur-3xl opacity-50 transition-transform group-hover:scale-110 duration-700"></div>

  <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-up">
    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
      Ready to build <br className="hidden md:block" /> something amazing?
    </h2>
    <p className="text-white/90 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
      Join thousands of students across campuses turning their biggest ideas into reality today.
    </p>

    {/* Improved Button with Google Logo */}
    <button className="inline-flex items-center gap-3 bg-white text-gray-900 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 shadow-2xl hover:shadow-white/20">
      <svg className="w-6 h-6" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      Get Started with Google
    </button>
  </div>
</section>
    </div>
  );
}
