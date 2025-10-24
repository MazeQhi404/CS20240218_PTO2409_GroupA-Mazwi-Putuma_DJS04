import { useState, useEffect } from 'react';
import { genres } from './data.js'

/**
 * Formats a date string into a readable format.
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date
 */

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * PodcastCard component to display individual podcast details
 * @param {Object} props - Component props
 * @param {Object} props.podcast - Podcast data
 * @param {string[]} props.genres - Array of genre titles
 */

const PodcastCard = ({ podcast, genres }) => (
  <div className="podcast-card">
    <img src={podcast.image} alt={podcast.title} className="podcast-image" />
    <h3 className="podcast-title">{podcast.title}</h3>
    <p className="podcast-updated">Updated: {formatDate(podcast.updated)}</p>
    <p className="podcast-genres">Genres: {genres.join(', ')}</p>
  </div>
);

/**
 * Main App component handling state and rendering
 */

function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const podcastsPerPage = 10;

  /**
   * Fetches podcast data from the API
   */
  
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://podcast-api.netlify.app');
        if (!response.ok) throw new Error('Failed to fetch podcasts');
        const data = await response.json();
        setPodcasts(data);
      } catch (err) {
        setError(err.message);
      } finally /*always executes, regardless of errors*/ {
        setLoading(false);
      }
    };
    fetchPodcasts();
  }, []);
  
  /**
   * Handles search input change
   * @param {Object} e - Event object
   */
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); //Reset to first page on search
  };
  /**
   * Handles sort option change
   * @param {Object} e - Event object
   */
  
  const handleSort = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1); // Reset to first page on sort 
  };
  /**
   * Handles genre filter change 
   * @param {Object} e - Event object
   */
  
  const handleGenreChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedGenres((prev) => 
      e.target.checked
       ? [...prev, value]
       : prev.filter((id) => id !== value)
    );
    
    setCurrentPage(1); // Reset to first page on filter
  };
  
  /**
   * Processes podcasts based on search, sort, and filter criteria 
   * @returns {Object[]} Filtered and sorted podcasts
   */
  
  const getProcessedPodcasts = () => {
    let filtered = podcasts;
    
    //Apply search

    if (searchTerm) {
      filtered = filtered.filter((podcast) => 
        podcast.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    //Apply sort
    return [...filtered].sort((a, b) => {
      if (sortOption === 'title-asc') {
        return a.title.localeCompare(b.title);
      } else if (sortOption === 'title-desc') {
        return b.title.localeCompare(a.title);
      } else {
        return new Date(b.updated) - new Date(a.updated); // Newest first
        }
    });
  
  };
  
  //Calculate Pagination

  const processedPodcasts = getProcessedPodcasts();
  const totalPages = Math.ceil(processedPodcasts.length / podcastsPerPage);
  const paginatedPodcasts = processedPodcasts.slice(
    (currentPage - 1) * podcastsPerPage,
    currentPage * podcastsPerPage
  );
  
  /**
  * Handles Page Navigation
  * @param {number} page - Page number to navigete to
  */

 const handlePageChange = (page) => {
  setCurrentPage(page);
  window.scrollTo({ top: 0, behaviour: 'smooth'});
 };
 
 if (loading) return <div className="loading">Loading...</div>;
 if (error) return <div className="error">{error}</div>;
 
 return (
  <div className="app-container">
    <h1 className="app-title">Podcast Browser</h1>

    {/*Controls */}
    <div className="controls">
      {/*Search */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search podcasts by title..."
        className="search-input"
      />

      {/* Sort and Filter */}
      <div className="sort-filter">
        <div className="sort-container">
          <label>
            Sort by:
            <select value={sortOption} onChange={handleSort}
            className="sort-select">
              <option value="newest">Newest First</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
            </select>
          </label>
        </div>

        <div className="filter-container">
          <h3 className="filter-title">Filter by Genre:</h3>
          <div className="filter-options">
            {genres.map((genre) => (
              <label key={genre.id} className="filter-label">
                <input
                  type="checkbox"
                  value={genre.id}
                  checked={selectedGenres.includes(genre.id)}
                  onChange={handleGenreChange}
                />
                {genre.title}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/*Podcast Grid */}
    <div className="podcast-grid">
      {paginatedPodcasts.map((podcast) => {
        const podcastGenres = podcast.genres
          .map((id) => genres.find((g) => g.id === id)?.title)
          .filter(Boolean);
        return (
          <PodcastCard
            key={podcast.id}
            podcast={podcast}
            genres={podcastGenres}
          />
        );
      
      })}
    </div>

    {/*Pagination */}
    {totalPages > 1 && (
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        {Array.from({ length: totalPages}, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`pagination-button ${currentPage === page ? 'active'
            : ''}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    )}

    {paginatedPodcasts.length === 0 && (
      <p className="no-results">No podcasts found.</p>
    )}
  </div>
 );
 
}

export default App;
