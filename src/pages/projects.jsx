import React, { useState, useEffect } from 'react';
import { Layers, Search, Bookmark, Loader2, FilterX, X, ArrowUpDown, Sparkles, TrendingUp, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../services/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function ExploreProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, relevance
  const [hoveredProject, setHoveredProject] = useState(null);
  
  // FILTERS STATE
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

  // Fuzzy search function
  const fuzzyMatch = (text, pattern) => {
    if (!pattern) return true;
    const textLower = text.toLowerCase();
    const patternLower = pattern.toLowerCase();
    
    // Exact match gets highest priority
    if (textLower.includes(patternLower)) return { match: true, score: 100 };
    
    // Check if all words in pattern exist in text
    const patternWords = patternLower.split(/\s+/).filter(w => w.length > 0);
    const allWordsMatch = patternWords.every(word => textLower.includes(word));
    if (allWordsMatch) return { match: true, score: 80 };
    
    // Check if pattern is a substring of any word
    const words = textLower.split(/\s+/);
    const partialMatch = words.some(word => word.includes(patternLower) || patternLower.includes(word));
    if (partialMatch) return { match: true, score: 60 };
    
    // Character-based fuzzy matching (Levenshtein-like)
    let patternIndex = 0;
    for (let i = 0; i < textLower.length && patternIndex < patternLower.length; i++) {
      if (textLower[i] === patternLower[patternIndex]) {
        patternIndex++;
      }
    }
    if (patternIndex === patternLower.length) return { match: true, score: 40 };
    
    return { match: false, score: 0 };
  };

  // Get active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    Object.values(filters).forEach(category => {
      count += Object.values(category).filter(v => v).length;
    });
    return count;
  };

  const clearAllFilters = () => {
    setFilters({
      projectType: { sideProject: false, hackathon: false, research: false, openSource: false },
      roles: { frontendDev: false, backendDev: false, uiuxDesigner: false, dataScientist: false, productManager: false },
      duration: { lessThan1: false, oneToThree: false, moreThan3: false }
    });
    setSearchTerm('');
  };

  // FILTERING & SORTING LOGIC
  const filteredProjects = projects
    .map(project => {
      // A. Check Project Type
      const activeTypes = Object.keys(filters.projectType).filter(key => filters.projectType[key]);
      const matchesType = activeTypes.length === 0 || activeTypes.includes(project.projectType);

      // B. Check Duration
      const activeDurations = Object.keys(filters.duration).filter(key => filters.duration[key]);
      const matchesDuration = activeDurations.length === 0 || activeDurations.some(d => {
        if (d === 'lessThan1') return project.duration === '<1 Month';
        if (d === 'oneToThree') return project.duration === '1 - 3 Months';
        if (d === 'moreThan3') return project.duration === '6+ Months' || project.duration === '3 - 6 Months';
        return false;
      });

      // C. Check Roles Needed
      const activeRoles = Object.keys(filters.roles).filter(key => filters.roles[key]);
      const matchesRole = activeRoles.length === 0 || activeRoles.some(roleKey => {
        const readableRole = roleKey.replace(/([A-Z])/g, ' $1').toLowerCase();
        return project.rolesNeeded?.some(r => r.toLowerCase().includes(readableRole.trim()));
      });

      // D. Fuzzy Search Logic
      const searchText = `${project.title} ${project.description} ${project.tagline || ''} ${project.techStack?.join(' ') || ''}`;
      const searchResult = fuzzyMatch(searchText, searchTerm);
      const matchesSearch = searchResult.match;

      if (matchesType && matchesDuration && matchesRole && matchesSearch) {
        return { ...project, relevanceScore: searchResult.score };
      }
      return null;
    })
    .filter(project => project !== null)
    .sort((a, b) => {
      if (sortBy === 'newest') {
        const aTime = a.createdAt?.toDate?.() || new Date(0);
        const bTime = b.createdAt?.toDate?.() || new Date(0);
        return bTime - aTime;
      } else if (sortBy === 'oldest') {
        const aTime = a.createdAt?.toDate?.() || new Date(0);
        const bTime = b.createdAt?.toDate?.() || new Date(0);
        return aTime - bTime;
      } else if (sortBy === 'relevance') {
        return (b.relevanceScore || 0) - (a.relevanceScore || 0);
      }
      return 0;
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
      <nav className="bg-white flex items-center justify-between px-8 md:px-12 py-8 border-b border-gray-200 sticky top-0 z-50 w-full">
        <Link to="/" className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
            <Layers className="w-8 h-8 text-white" />
          </div>
          <span className="text-3xl font-black text-orange-500 tracking-tighter uppercase">ProjectMate</span>
        </Link>
        <div className="flex items-center gap-12">
          <Link to="/projects" className="text-orange-500 font-bold text-xl border-b-4 border-orange-500">Projects</Link>
          <Link to="/create" className="text-gray-500 hover:text-orange-500 font-semibold text-xl transition-colors">Post Project</Link>
          <Link to="/profile" className="text-gray-500 hover:text-orange-500 font-semibold text-xl transition-colors">Profile</Link>
        </div>
      </nav>

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
              {/* Search and Sort Bar */}
              <div className="flex flex-col md:flex-row gap-6 mb-8">
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
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border-4 border-gray-100 rounded-[2.5rem] px-8 py-8 pr-16 text-2xl font-bold text-gray-700 focus:outline-none focus:border-orange-500 transition-all shadow-sm cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="relevance">Most Relevant</option>
                  </select>
                  <ArrowUpDown className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 pointer-events-none" />
                </div>
              </div>

              {/* Active Filters Indicator */}
              {(getActiveFiltersCount() > 0 || searchTerm) && (
                <div className="mb-8 flex flex-wrap items-center gap-4 p-6 bg-orange-50 border-2 border-orange-200 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <FilterX className="w-5 h-5 text-orange-600" />
                    <span className="text-lg font-bold text-orange-700">Active Filters:</span>
                  </div>
                  
                  {searchTerm && (
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-orange-200">
                      <span className="text-sm font-bold text-gray-700">Search: "{searchTerm}"</span>
                      <button
                        onClick={() => setSearchTerm('')}
                        className="text-orange-600 hover:text-orange-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {Object.entries(filters).map(([category, values]) =>
                    Object.entries(values).map(([key, isActive]) => {
                      if (!isActive) return null;
                      const displayName = key === 'lessThan1' ? '<1 Month' : 
                                        key === 'oneToThree' ? '1-3 Months' : 
                                        key === 'moreThan3' ? '3+ Months' : 
                                        key.replace(/([A-Z])/g, ' $1');
                      return (
                        <div key={`${category}-${key}`} className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-orange-200">
                          <span className="text-sm font-bold text-gray-700 capitalize">{displayName}</span>
                          <button
                            onClick={() => handleFilterChange(category, key)}
                            className="text-orange-600 hover:text-orange-700 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })
                  )}

                  <button
                    onClick={clearAllFilters}
                    className="ml-auto text-orange-600 hover:text-orange-700 font-bold text-lg underline transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-16 h-16 text-orange-500 animate-spin mb-4" />
                  <p className="text-2xl font-black text-gray-400 uppercase tracking-widest">Fetching Projects...</p>
                </div>
              ) : filteredProjects.length === 0 ? (
                // ENHANCED EMPTY STATE
                <div className="flex flex-col items-center justify-center py-32 bg-gradient-to-br from-gray-50 to-white rounded-[3rem] border-4 border-dashed border-gray-200">
                  <div className="relative mb-8">
                    <Sparkles className="w-24 h-24 text-orange-200 animate-pulse" />
                    <FilterX className="w-16 h-16 text-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <h3 className="text-4xl font-black text-gray-400 mb-4 uppercase tracking-widest">No Projects Found</h3>
                  <p className="text-xl text-gray-500 font-medium mb-8 text-center max-w-md">
                    {getActiveFiltersCount() > 0 || searchTerm 
                      ? "Try adjusting your filters or search terms to find more projects."
                      : "No projects available at the moment. Check back soon!"}
                  </p>
                  {(getActiveFiltersCount() > 0 || searchTerm) && (
                    <button 
                      onClick={clearAllFilters}
                      className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg transition-all shadow-lg hover:scale-105 active:scale-95"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                  {filteredProjects.map(project => (
                    <div 
                      key={project.id} 
                      className="relative bg-white rounded-[3rem] p-12 border-2 border-gray-50 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group"
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
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
                        {project.projectType && (
                          <span className="bg-orange-100 text-orange-700 text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-sm">
                            {project.projectType}
                          </span>
                        )}
                      </div>
                      <p className="text-2xl text-gray-600 mb-10 leading-relaxed font-medium line-clamp-3">
                        {project.tagline || project.description}
                      </p>
                      <div className="flex flex-wrap gap-4 mb-12">
                        {project.techStack?.slice(0, 4).map((tag, index) => (
                          <span key={index} className="bg-gray-50 text-gray-700 text-sm font-black px-6 py-3 rounded-2xl border border-gray-100">
                            {tag}
                          </span>
                        ))}
                        {project.techStack?.length > 4 && (
                          <span className="bg-gray-100 text-gray-500 text-sm font-black px-6 py-3 rounded-2xl">
                            +{project.techStack.length - 4} more
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-10 border-t-4 border-gray-50">
                        <div className="flex items-center gap-6">
                          <img src={project.authorPhoto || "https://i.pravatar.cc/150"} alt="" className="w-16 h-16 rounded-full ring-4 ring-orange-50 shadow-md object-cover" />
                          <div>
                            <p className="font-black text-gray-900 text-xl">{project.authorName || "Builder"}</p>
                            <p className="text-gray-400 font-bold text-sm uppercase tracking-tighter">{formatTime(project.createdAt)}</p>
                          </div>
                        </div>
                        <Link 
                          to={`/project/${project.id}`} 
                          className="bg-orange-50 text-orange-600 px-10 py-5 rounded-[1.5rem] font-black text-xl hover:bg-orange-500 hover:text-white transition-all shadow-sm active:scale-95 text-center"
                        >
                          View Details
                        </Link>
                      </div>

                      {/* Project Preview on Hover */}
                      {hoveredProject === project.id && (
                        <div className="absolute top-full left-0 right-0 mt-4 z-50 bg-white rounded-2xl p-8 shadow-2xl border-2 border-orange-100 animate-in fade-in slide-in-from-top-2">
                          <div className="flex items-start gap-4 mb-4">
                            <img src={project.authorPhoto || "https://i.pravatar.cc/150"} alt="" className="w-12 h-12 rounded-full ring-2 ring-orange-100" />
                            <div className="flex-1">
                              <p className="font-black text-gray-900 text-lg">{project.authorName || "Builder"}</p>
                              <p className="text-gray-500 font-semibold text-sm">{project.branch || "General"}</p>
                            </div>
                          </div>
                          <p className="text-gray-700 font-medium mb-4 line-clamp-2">
                            {project.description?.substring(0, 150)}...
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.rolesNeeded?.slice(0, 3).map((role, i) => (
                              <span key={i} className="bg-orange-50 text-orange-600 text-xs font-bold px-3 py-1 rounded-lg">
                                {role}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span className="font-semibold">{project.duration || "TBD"}</span>
                            </div>
                            {project.techStack && (
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                <span className="font-semibold">{project.techStack.length} technologies</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
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