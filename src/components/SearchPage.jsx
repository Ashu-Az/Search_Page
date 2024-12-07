import React, { useState, useEffect } from 'react';
import { Search, Loader2, X } from 'lucide-react';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Sample data - in a real app, this would come from an API
  const sampleResults = [
    { id: 1, title: 'Getting Started with React', category: 'tutorial', content: 'Learn the basics of React including components, props, and state...', date: '2024-03-15' },
    { id: 2, title: 'Advanced TypeScript Tips', category: 'tutorial', content: 'Discover advanced TypeScript features that will improve your code...', date: '2024-03-10' },
    { id: 3, title: 'Web Performance Optimization', category: 'article', content: 'Essential techniques for optimizing your web application performance...', date: '2024-03-05' },
    { id: 4, title: 'Building Responsive Layouts', category: 'article', content: 'Master the art of creating responsive layouts using modern CSS...', date: '2024-02-28' },
  ];

  const [results, setResults] = useState(sampleResults);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Perform search when debounced query or filter changes
  useEffect(() => {
    performSearch();
  }, [debouncedQuery, filter]);

  const performSearch = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filtered = sampleResults.filter(result => {
        const matchesQuery = !debouncedQuery || 
          result.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          result.content.toLowerCase().includes(debouncedQuery.toLowerCase());
        const matchesFilter = filter === 'all' || result.category === filter;
        return matchesQuery && matchesFilter;
      });
      setResults(filtered);
      setIsLoading(false);
    }, 300);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilter('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] -z-10" />
      
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Search Articles
          </h1>
          <p className="text-gray-600">Discover tutorials, articles, and guides</p>
        </div>

        {/* Search Form */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-4 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
              {searchQuery ? (
                <button
                  onClick={clearSearch}
                  className="absolute right-12 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              ) : (
                <Search className="absolute right-3 top-3.5 text-gray-400" size={20} />
              )}
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="tutorial">Tutorials</option>
              <option value="article">Articles</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-lg">
                <p className="text-gray-500 text-lg">No results found. Try adjusting your search terms.</p>
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear search
                  </button>
                )}
              </div>
            </div>
          ) : (
            results.map(result => (
              <article 
                key={result.id} 
                className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {result.title}
                </h2>
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full capitalize">
                    {result.category}
                  </span>
                  <span>{new Date(result.date).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-600 line-clamp-2">{result.content}</p>
                <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                  Read more →
                </button>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;