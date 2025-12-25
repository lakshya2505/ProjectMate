import React, { useState } from 'react';
import { Layers, Search, Bookmark } from 'lucide-react';

export default function ExploreProjects() {
  const [filters, setFilters] = useState({
    projectType: { sideProject: true, hackathon: false, research: false, openSource: false },
    roles: { frontendDev: false, backendDev: false, uiuxDesigner: false, dataScientist: false, productManager: false },
    duration: { lessThan1: false, oneToThree: true, moreThan3: false }
  });p

  const projects = [
    {
      id: 1,
      title: "AI Study Buddy App",
      description: "Building an AI-powered study assistant that generates quizzes from PDF notes. We need a frontend developer to",
      tags: ["React Native", "OpenAI API", "Typescript"],
      author: "Sarah Chen",
      time: "2h ago",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      title: "Campus Marketplace",
      description: "A localized marketplace for students to buy/sell textbooks and furniture safely. Looking for a backend engineer familiar",
      tags: ["Node.js", "PostgreSQL", "AWS"],
      author: "Marcus Johnson",
      time: "5h ago",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: 3,
      title: "EcoTrack Research",
      description: "Analyzing local waste management data to propose better recycling routes on campus. Need help with data",
      tags: ["Python", "Data Viz", "Statistics"],
      author: "Emily Davis",
      time: "1d ago",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
      id: 4,
      title: "Global FinTech Hackathon",
      description: "We are a team of 3 looking for a UI/UX designer for the upcoming Global FinTech Hackathon. We are building a",
      tags: ["Figma", "Design System", "Web3"],
      author: "Alex Kim",
      time: "2d ago",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    {
      id: 5,
      title: "Music Collab Platform",
      description: "Creating a web app for musicians to find jam sessions nearby. Need a Full Stack developer to partner with me (I",
      tags: ["Next.js", "Supabase", "Tailwind"],
      author: "Jordan Lee",
      time: "3d ago",
      avatar: "https://i.pravatar.cc/150?img=5"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white flex items-center justify-between px-6 md:px-16 py-5 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-orange-500">ProjectMate</span>
        </div>
        <div className="flex items-center gap-8">
          <a href="#" className="text-gray-900 font-medium text-sm">Projects</a>
          <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">Post Project</a>
          <a href="#" className="text-gray-500 hover:text-gray-900 text-sm">Profile</a>
          <a href="#" className="text-gray-900 font-semibold text-sm">Log In</a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-6 md:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Explore Projects</h1>
            <p className="text-gray-600">
              Discover ongoing projects, hackathon teams, and research opportunities looking for your skills.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Sidebar Filters */}
            <div className="col-span-3">
              {/* Project Type */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 text-sm mb-4 uppercase tracking-wide">Project Type</h3>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={filters.projectType.sideProject} className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                    <span className="ml-3 text-gray-700">Side Project</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={filters.projectType.hackathon} className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                    <span className="ml-3 text-gray-700">Hackathon</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={filters.projectType.research} className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                    <span className="ml-3 text-gray-700">Research</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={filters.projectType.openSource} className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                    <span className="ml-3 text-gray-700">Open Source</span>
                  </label>
                </div>
              </div>

              {/* Roles Needed */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 text-sm mb-4 uppercase tracking-wide">Roles Needed</h3>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                    <span className="ml-3 text-gray-700">Frontend Dev</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                    <span className="ml-3 text-gray-700">Backend Dev</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                    <span className="ml-3 text-gray-700">UI/UX Designer</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                    <span className="ml-3 text-gray-700">Data Scientist</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                    <span className="ml-3 text-gray-700">Product Manager</span>
                  </label>
                </div>
              </div>

              {/* Duration */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 text-sm mb-4 uppercase tracking-wide">Duration</h3>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={filters.duration.lessThan1} className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                    <span className="ml-3 text-gray-700">&lt;1 Month</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={filters.duration.oneToThree} className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                    <span className="ml-3 text-gray-700">1-3 Months</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" checked={filters.duration.moreThan3} className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
                    <span className="ml-3 text-gray-700">3+ Months</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="col-span-9">
              {/* Search Bar */}
              <div className="flex gap-3 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by keywords, skills, or stack..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition">
                  Search
                </button>
              </div>

              {/* Project Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map(project => (
                  <div key={project.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                      <button className="text-gray-400 hover:text-orange-500 transition">
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <span className="inline-block bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                      Recruiting
                    </span>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, index) => (
                        <span key={index} className="bg-orange-100 text-orange-600 text-xs font-medium px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <img src={project.avatar} alt={project.author} className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{project.author}</p>
                          <p className="text-gray-500 text-xs">{project.time}</p>
                        </div>
                      </div>
                      <button className="text-gray-900 font-semibold text-sm hover:text-orange-500 transition">
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-10">
                <button className="bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-900 px-8 py-3 rounded-lg font-semibold transition">
                  Load More Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}