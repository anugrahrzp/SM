import { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import StatusBar from './StatusBar'
import FloatingMenu from './FloatingMenu'
import '../styles/dashboard.css'

function AISearchResults() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('q') || ''
  const [isSearching, setIsSearching] = useState(true)
  const [aiResults, setAiResults] = useState(null)
  const [newQuery, setNewQuery] = useState(query)

  useEffect(() => {
    if (!query) {
      navigate('/dashboard-v2')
      return
    }

    // Simulate AI search
    const searchAI = async () => {
      setIsSearching(true)
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock AI results
      const mockResults = {
        query: query,
        summary: `Based on conversations in your community WhatsApp groups, here's what I found:`,
        suggestions: [
          {
            type: 'recommendation',
            title: 'Hotel & Stay Recommendations',
            content: 'Rahul mentioned staying at "The Hideaway Resort" in Da Nang - said it was amazing value. Priya recommended "Little Hoi An Boutique" for its authentic experience.',
            source: 'Travel Enthusiasts Group',
            date: '2 weeks ago',
            memberAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
          },
          {
            type: 'tip',
            title: 'Local Tips',
            content: 'Vikram shared that booking through Agoda gets better rates than direct. Also, avoid tourist areas in Hanoi Old Quarter for accommodation.',
            source: 'Gang Travel Tips',
            date: '1 month ago',
            memberAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
          },
          {
            type: 'contact',
            title: 'Community Connection',
            content: 'Ananya lived in Vietnam for 2 years and offered to help anyone planning a trip. You could reach out to her directly!',
            source: 'Community Introductions',
            date: '3 weeks ago',
            memberAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
            memberId: '3'
          }
        ],
        relatedQueries: ['Best restaurants in Vietnam', 'Vietnam visa process', 'Vietnam travel itinerary']
      }

      setAiResults(mockResults)
      setIsSearching(false)
    }

    searchAI()
  }, [query, navigate])

  const handleNewSearch = (e) => {
    e.preventDefault()
    if (!newQuery.trim()) return
    navigate(`/ai-search?q=${encodeURIComponent(newQuery)}`)
  }

  const handleRelatedSearch = (q) => {
    setNewQuery(q)
    navigate(`/ai-search?q=${encodeURIComponent(q)}`)
  }

  return (
    <>
      <StatusBar />
      <div className="page-content ai-results-page">
        {/* Back Button & Header */}
        <div className="ai-results-header">
          <button className="back-btn" onClick={() => navigate('/dashboard-v2')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <h2 className="results-page-title">Community Search</h2>
        </div>

        {/* Search Input */}
        <form onSubmit={handleNewSearch} className="ai-search-form-stacked">
          <div className="ai-search-input-wrapper">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              className="ai-search-input"
              placeholder="Ask another question..."
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="ai-search-btn-full" disabled={!newQuery.trim()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            Ask Community
          </button>
        </form>

        {/* Query Display */}
        <div className="query-display">
          <span className="query-label">Searching for:</span>
          <span className="query-text">"{query}"</span>
        </div>

        {/* Loading State */}
        {isSearching && (
          <div className="ai-loading">
            <div className="ai-loading-animation">
              <div className="loading-circle"></div>
              <div className="loading-circle"></div>
              <div className="loading-circle"></div>
            </div>
            <p className="ai-loading-text">Searching through community conversations...</p>
          </div>
        )}

        {/* Results */}
        {!isSearching && aiResults && (
          <div className="ai-results">
            <p className="ai-results-summary">{aiResults.summary}</p>

            <div className="ai-suggestions">
              {aiResults.suggestions.map((suggestion, index) => (
                <div key={index} className={`ai-suggestion-card ${suggestion.type}`}>
                  <div className="suggestion-header">
                    <img src={suggestion.memberAvatar} alt="" className="suggestion-avatar" />
                    <div className="suggestion-meta">
                      <span className="suggestion-title">{suggestion.title}</span>
                      <span className="suggestion-source">{suggestion.source} · {suggestion.date}</span>
                    </div>
                  </div>
                  <p className="suggestion-content">{suggestion.content}</p>
                  {suggestion.memberId && (
                    <Link to={`/member/${suggestion.memberId}`} className="suggestion-action">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      View Profile
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="related-queries">
              <span className="related-label">Related searches:</span>
              <div className="related-chips">
                {aiResults.relatedQueries.map((q, index) => (
                  <button
                    key={index}
                    className="related-chip"
                    onClick={() => handleRelatedSearch(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <FloatingMenu />
    </>
  )
}

export default AISearchResults
