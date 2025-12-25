import React, { useState } from 'react';
import { Layers, Search, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ExploreProjects() {
  const [filters, setFilters] = useState({
    projectType: { sideProject: true, hackathon: false, research: false, openSource: false },
    roles: { frontendDev: false, backendDev: false, uiuxDesigner: false, dataScientist: false, productManager: false },
    duration: { lessThan1: false, oneToThree: true, moreThan3: false }
  });

  const handleFilterChange = (category, key) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key]
      }
    }));
  };

  const projects = [
    {
      id: 1,
      title: "AI Study Buddy App",
      description: "Building an AI-powered study assistant that generates quizzes from PDF notes. We need a frontend developer to join our team.",
      tags: ["React Native", "OpenAI API", "Typescript"],
      author: "Lakshya Jain",
      time: "2h ago",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      title: "Campus Marketplace",
      description: "A localized marketplace for students to buy/sell textbooks and furniture safely. Looking for a backend engineer familiar with AWS.",
      tags: ["Node.js", "PostgreSQL", "AWS"],
      author: "Vinil Bafna",
      time: "5h ago",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: 3,
      title: "EcoTrack Research",
      description: "Analyzing local waste management data to propose better recycling routes on campus. Need help with data visualization.",
      tags: ["Python", "Data Viz", "Statistics"],
      author: "Shubham Shah",
      time: "1d ago",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
      id: 4,
      title: "Global FinTech Hackathon",
      description: "We are a team of 3 looking for a UI/UX designer for the upcoming Global FinTech Hackathon. We are building a Web3 wallet.",
      tags: ["Figma", "Design System", "Web3"],
      author: "Amitesh singh",
      time: "2d ago",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    {
      id: 5,
      title: "AI-Powered Campus Navigator",
      description: "Building an AR-based mobile app to help freshmen navigate the campus and find lecture halls in real-time. Need a React Native developer.",
      tags: ["React Native", "ARCore", "Firebase"],
      author: "Sneha Reddy",
      time: "5h ago",
      avatar: "https://picsum.photos/id/1/150/150"
    },
    {
      id: 6,
      title: "IoT Smart Bin Network",
      description: "Developing a sensor-based waste management system for the hostel area. Looking for someone with Arduino or ESP32 experience.",
      tags: ["IoT", "Arduino", "Embedded C"],
      author: "Rahul Varma",
      time: "12h ago",
      avatar: "https://picsum.photos/id/2/150/150"
    },
    {
      id: 7,
      title: "Campus Sustainability Garden",
      description: "Starting a student-led organic garden behind the library. We need organizers to manage volunteer shifts and resource allocation.",
      tags: ["Sustainability", "Management", "Environment"],
      author: "Priya Das",
      time: "1d ago",
      avatar: "https://picsum.photos/id/3/150/150"
    },
    {
      id: 8,
      title: "Peer-to-Peer Book Exchange",
      description: "A social initiative to help students share expensive textbooks. Looking for a coordinator to manage the 'Resource Bank' inventory.",
      tags: ["Community", "Education", "Logistics"],
      author: "Karthik Iyer",
      time: "3d ago",
      avatar: "https://picsum.photos/id/4/150/150"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Navigation */}
      <nav className="bg-white flex items-center justify-between px-8 md:px-12 py-8 border-b border-gray-200 sticky top-0 z-50 w-full">
        <Link to="/" className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
            <Layers className="w-8 h-8 text-white" />
          </div>
          <span className="text-3xl font-black text-orange-500 tracking-tighter">ProjectMate</span>
        </Link>
        <div className="flex items-center gap-12">
          <Link to="/projects" className="text-orange-500 font-bold text-xl">Projects</Link>
          <Link to="/create" className="text-gray-500 hover:text-gray-900 font-semibold text-xl">Post Project</Link>
          <Link to="/profile" className="text-gray-500 hover:text-gray-900 font-semibold text-xl">Profile</Link>
          <Link to="/login" className="text-gray-900 font-bold text-xl bg-gray-100 px-8 py-4 rounded-2xl hover:bg-gray-200 transition shadow-sm">Log In</Link>
        </div>
      </nav>

      <div className="px-8 md:px-12 py-16 w-full">
        <div className="w-full">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6 tracking-tight leading-none">Explore Projects</h1>
            <p className="text-2xl md:text-3xl text-gray-600 max-w-5xl font-medium leading-relaxed">
              Discover ongoing projects and hackathon teams looking for your skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 w-full">
            {/* Sidebar Filters */}
            <div className="md:col-span-3">
              <div className="sticky top-40 space-y-16">
                
                {/* Filter Section Template */}
                {[
                  { title: "Project Type", key: "projectType" },
                  { title: "Roles Needed", key: "roles" },
                  { title: "Duration", key: "duration" }
                ].map((section) => (
                  <div key={section.key}>
                    <h3 className="font-black text-gray-900 text-xl mb-8 uppercase tracking-widest border-b-4 border-orange-500 pb-2 inline-block">
                      {section.title}
                    </h3>
                    <div className="space-y-6">
                      {Object.keys(filters[section.key]).map((key) => (
                        <label key={key} className="flex items-center cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={filters[section.key][key]} 
                            onChange={() => handleFilterChange(section.key, key)}
                            className="w-7 h-7 text-orange-500 border-gray-300 rounded-lg focus:ring-orange-500 cursor-pointer transition-all" 
                          />
                          <span className="ml-5 text-2xl font-bold text-gray-700 group-hover:text-orange-500 capitalize transition-colors">
                            {key === 'lessThan1' ? '<1 Month' : 
                             key === 'oneToThree' ? '1-3 Months' : 
                             key === 'moreThan3' ? '3+ Months' : 
                             key.replace(/([A-Z])/g, ' $1')}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="md:col-span-9">
              {/* Search Bar */}
              <div className="flex flex-col md:flex-row gap-6 mb-16">
                <div className="flex-1 relative">
                  <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400 w-10 h-10" />
                  <input
                    type="text"
                    placeholder="Search by keywords, skills, or stack..."
                    className="w-full pl-20 pr-8 py-8 text-2xl border-4 border-gray-100 rounded-[2.5rem] focus:outline-none focus:ring-8 focus:ring-orange-500/10 focus:border-orange-500 transition-all shadow-sm"
                  />
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-16 py-8 rounded-[2.5rem] font-black text-2xl transition-all shadow-2xl shadow-orange-500/30 active:scale-95">
                  Search
                </button>
              </div>

              {/* Project Cards Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                {projects.map(project => (
                  <div key={project.id} className="bg-white rounded-[3rem] p-12 border-2 border-gray-50 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group">
                    <div className="flex justify-between items-start mb-8">
                      <h3 className="text-4xl font-black text-gray-900 leading-tight tracking-tight group-hover:text-orange-600 transition-colors">
                        {project.title}
                      </h3>
                      <button className="text-gray-300 hover:text-orange-500 transition-colors transform hover:scale-125">
                        <Bookmark className="w-10 h-10 fill-current" />
                      </button>
                    </div>
                    
                    <div className="flex gap-3 mb-8">
                        <span className="bg-green-100 text-green-700 text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-sm">Recruiting</span>
                    </div>
                    
                    <p className="text-2xl text-gray-600 mb-10 leading-relaxed font-medium">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 mb-12">
                      {project.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-50 text-gray-700 text-sm font-black px-6 py-3 rounded-2xl border border-gray-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-10 border-t-4 border-gray-50">
                      <div className="flex items-center gap-6">
                        <img src={project.avatar} alt={project.author} className="w-16 h-16 rounded-full ring-4 ring-orange-50 shadow-md" />
                        <div>
                          <p className="font-black text-gray-900 text-xl">{project.author}</p>
                          <p className="text-gray-400 font-bold text-sm uppercase tracking-tighter">{project.time}</p>
                        </div>
                      </div>
                      <Link 
  to={`/project/${project.id}`} 
  className="bg-orange-50 text-orange-600 px-10 py-5 rounded-[1.5rem] font-black text-xl hover:bg-orange-500 hover:text-white transition-all shadow-sm active:scale-95 text-center"
>
  View Details
</Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Centered Load More Button */}
              <div className="mt-32 mb-16 text-center w-full">
                <button className="bg-white border-4 border-gray-200 hover:border-orange-500 hover:text-orange-600 text-gray-900 px-24 py-10 rounded-[3rem] font-black text-4xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl hover:shadow-orange-500/20">
                  Load More Projects
                </button>
                <p className="mt-10 text-gray-400 font-black text-2xl uppercase tracking-widest">
                  Showing {projects.length} of 48 projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}