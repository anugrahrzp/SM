import { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import StatusBar from './StatusBar'
import FloatingMenu from './FloatingMenu'
import { members } from '../data/mockData'
import '../styles/dashboard.css'

function AISearchResults() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('q') || ''
  const [isSearching, setIsSearching] = useState(true)
  const [aiResults, setAiResults] = useState(null)
  const [newQuery, setNewQuery] = useState(query)

  // Get members with businesses that have products
  const membersWithProducts = members.filter(m => m.business && m.business.offerings)

  // Mock community products based on search
  const communityProducts = [
    {
      id: '1',
      name: 'Weekly Meal Kit',
      business: 'FoodTech Labs',
      price: '₹1,999',
      memberPrice: '₹1,599',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      memberId: 'member-007',
      memberName: 'Sneha Gupta'
    },
    {
      id: '2',
      name: 'Monthly Subscription',
      business: 'FoodTech Labs',
      price: '₹5,999/month',
      memberPrice: '₹4,799/month',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
      memberId: 'member-007',
      memberName: 'Sneha Gupta'
    },
    {
      id: '3',
      name: 'Corporate Catering',
      business: 'FoodTech Labs',
      price: '₹599/head',
      memberPrice: '₹479/head',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop',
      memberId: 'member-007',
      memberName: 'Sneha Gupta'
    }
  ]

  // People who might help
  const helpfulPeople = [
    {
      id: 'member-007',
      name: 'Sneha Gupta',
      role: 'Founder at FoodTech Labs',
      expertise: 'Sustainable food delivery, ex-Swiggy product leader',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop'
    },
    {
      id: 'member-003',
      name: 'Ananya Krishnan',
      role: 'CTO at HealthFirst',
      expertise: 'Healthcare technology leader, 15 years experience',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    },
    {
      id: 'member-004',
      name: 'Vikram Singh',
      role: 'Founder at FinLeap',
      expertise: 'Fintech, financial inclusion for tier-2 & tier-3 towns',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    }
  ]

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
            title: 'Community Recommendation',
            content: 'Rahul from Bean & Brew mentioned their single-origin Ethiopian beans are great for pour-over. Priya said their cold brew concentrate is perfect for summers.',
            source: 'Foodies of Gang 360',
            date: '1 week ago',
            memberAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
          },
          {
            type: 'tip',
            title: 'Local Tips',
            content: 'Vikram shared that Third Wave Coffee in Indiranagar has the best ambiance. Blue Tokai in Koramangala for working. Dyu Art Cafe for dates!',
            source: 'Bangalore Explorers',
            date: '2 weeks ago',
            memberAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
          }
        ],
        relatedQueries: ['Best cafes to work from', 'Coffee subscription services', 'Specialty coffee beans']
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

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('')
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

            {/* Community Products Section */}
            <div className="community-products-section">
              <h3 className="section-title-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
                From Community Businesses
              </h3>
              <div className="products-scroll">
                {communityProducts.map((product) => (
                  <Link key={product.id} to={`/business/${product.memberId}`} className="product-card-mini">
                    <div className="product-image-mini">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info-mini">
                      <span className="product-name-mini">{product.name}</span>
                      <span className="product-business-mini">{product.business}</span>
                      <div className="product-prices-mini">
                        <span className="member-price">{product.memberPrice}</span>
                        <span className="regular-price">{product.price}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* People Who Might Help Section */}
            <div className="helpful-people-section">
              <h3 className="section-title-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                People who might help
              </h3>
              <div className="helpful-people-list">
                {helpfulPeople.map((person) => (
                  <Link key={person.id} to={`/member/${person.id}`} className="helpful-person-card">
                    <img src={person.avatar} alt={person.name} className="helpful-person-avatar" />
                    <div className="helpful-person-info">
                      <span className="helpful-person-name">{person.name}</span>
                      <span className="helpful-person-role">{person.role}</span>
                      <span className="helpful-person-expertise">{person.expertise}</span>
                    </div>
                    <svg className="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </Link>
                ))}
              </div>
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
