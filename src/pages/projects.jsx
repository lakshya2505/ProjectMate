import React, { useState, useEffect } from 'react';
import { Layers, Search, Bookmark, Loader2, FilterX } from 'lucide-react'; // Added FilterX for empty states
import { Link } from 'react-router-dom';
import { db } from '../services/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import Navbar from './Navbar';

export default function ExploreProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for search bar
  
  // 1. UPDATED FILTERS STATE (Matches your Firebase data values)
  const [filters, setFilters] = useState({
    projectType: { sideProject: false, hackathon: false, research: false, openSource: false },
    roles: { frontendDev: false, backendDev: false, uiuxDesigner: false, dataScientist: false, productManager: false },
    duration: { lessThan1: false, oneToThree: false, moreThan3: false }
  });

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const projectsArray = [];
      querySnapshot.forEach((doc) => {
        projectsArray.push({ id: doc.id, ...doc.data() });
      });
      setProjects(projectsArray);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. FILTERING LOGIC
  const filteredProjects = projects.filter(project => {
    // A. Check Project Type
    const activeTypes = Object.keys(filters.projectType).filter(key => filters.projectType[key]);
    const matchesType = activeTypes.length === 0 || activeTypes.includes(project.projectType);

    // B. Check Duration
    const activeDurations = Object.keys(filters.duration).filter(key => filters.duration[key]);
    const matchesDuration = activeDurations.length === 0 || activeDurations.some(d => {
        // Map filter keys to actual dropdown text in your Create page
        if (d === 'lessThan1') return project.duration === '<1 Month';
        if (d === 'oneToThree') return project.duration === '1 - 3 Months';
        if (d === 'moreThan3') return project.duration === '6+ Months' || project.duration === '3 - 6 Months';
        return false;
    });

    // C. Check Roles Needed (Partial match)
    const activeRoles = Object.keys(filters.roles).filter(key => filters.roles[key]);
    const matchesRole = activeRoles.length === 0 || activeRoles.some(roleKey => {
        const readableRole = roleKey.replace(/([A-Z])/g, ' $1').toLowerCase(); // e.g. "frontendDev" -> "frontend dev"
        return project.rolesNeeded?.some(r => r.toLowerCase().includes(readableRole.trim()));
    });

    // D. Search Logic
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesDuration && matchesRole && matchesSearch;
  });

  const handleFilterChange = (category, key) => {
    setFilters(prev => ({
      ...prev,
      [category]: { ...prev[category], [key]: !prev[category][key] }
    }));
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "Just now";
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Navbar />
      <div className="px-8 md:px-12 py-16 w-full">
        <div className="w-full">
          <div className="mb-16">
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-6 tracking-tight leading-none uppercase">Explore Projects</h1>
            <p className="text-2xl md:text-3xl text-gray-600 max-w-5xl font-medium leading-relaxed">
              Discover ongoing <span className="text-orange-600">Nirma University</span> projects looking for your skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 w-full">
            <div className="md:col-span-3">
              <div className="sticky top-40 space-y-16">
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
                            className="w-7 h-7 text-orange-500 border-gray-300 rounded-lg focus:ring-orange-500 cursor-pointer" 
                          />
                          <span className="ml-5 text-2xl font-bold text-gray-700 group-hover:text-orange-500 capitalize transition-colors">
                            {key === 'lessThan1' ? '<1 Month' : key === 'oneToThree' ? '1-3 Months' : key === 'moreThan3' ? '3+ Months' : key.replace(/([A-Z])/g, ' $1')}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-9">
              <div className="flex flex-col md:flex-row gap-6 mb-16">
                <div className="flex-1 relative">
                  <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-400 w-10 h-10" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by keywords, skills, or stack..."
                    className="w-full pl-20 pr-8 py-8 text-2xl border-4 border-gray-100 rounded-[2.5rem] focus:outline-none focus:border-orange-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-16 h-16 text-orange-500 animate-spin mb-4" />
                  <p className="text-2xl font-black text-gray-400 uppercase tracking-widest">Fetching Projects...</p>
                </div>
              ) : filteredProjects.length === 0 ? (
                // EMPTY STATE
                <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-gray-100">
                  <FilterX className="w-20 h-20 text-gray-200 mb-6" />
                  <p className="text-3xl font-black text-gray-300 uppercase tracking-widest">No projects match these filters</p>
                  <button 
                    onClick={() => setFilters({
                        projectType: { sideProject: false, hackathon: false, research: false, openSource: false },
                        roles: { frontendDev: false, backendDev: false, uiuxDesigner: false, dataScientist: false, productManager: false },
                        duration: { lessThan1: false, oneToThree: false, moreThan3: false }
                    })}
                    className="mt-8 text-orange-500 font-black text-xl hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                  {filteredProjects.map(project => (
                    <div key={project.id} className="bg-white rounded-[3rem] p-12 border-2 border-gray-50 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group">
                      {/* ... rest of your card UI stays exactly the same ... */}
                      <div className="flex justify-between items-start mb-8">
                        <h3 className="text-4xl font-black text-gray-900 leading-tight tracking-tight group-hover:text-orange-600 transition-colors">
                          {project.title}
                        </h3>
                        <button className="text-gray-300 hover:text-orange-500 transition-colors">
                          <Bookmark className="w-10 h-10 fill-current" />
                        </button>
                      </div>
                      <div className="flex gap-3 mb-8">
                          <span className="bg-green-100 text-green-700 text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-sm">
                            {project.branch || "General"}
                          </span>
                      </div>
                      <p className="text-2xl text-gray-600 mb-10 leading-relaxed font-medium line-clamp-3">
                        {project.tagline || project.description}
                      </p>
                      <div className="flex flex-wrap gap-4 mb-12">
                        {project.techStack?.map((tag, index) => (
                          <span key={index} className="bg-gray-50 text-gray-700 text-sm font-black px-6 py-3 rounded-2xl border border-gray-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-10 border-t-4 border-gray-50">
                        <div className="flex items-center gap-6">
                          <img src={project.authorPhoto || "https://i.pravatar.cc/150"} alt="" className="w-16 h-16 rounded-full ring-4 ring-orange-50 shadow-md object-cover" />
                          <div>
                            <p className="font-black text-gray-900 text-xl">{project.authorName || "Builder"}</p>
                            <p className="text-gray-400 font-bold text-sm uppercase tracking-tighter">{formatTime(project.createdAt)}</p>
                          </div>
                        </div>
                        <Link to={`/project/${project.id}`} className="bg-orange-50 text-orange-600 px-10 py-5 rounded-[1.5rem] font-black text-xl hover:bg-orange-500 hover:text-white transition-all shadow-sm active:scale-95 text-center">
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!loading && filteredProjects.length > 0 && (
                <div className="mt-32 mb-16 text-center w-full">
                  <p className="text-gray-400 font-black text-2xl uppercase tracking-widest">
                    Showing {filteredProjects.length} matching projects
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}