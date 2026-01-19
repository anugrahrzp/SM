import { useState } from 'react'
import { Link } from 'react-router-dom'
import StatusBar from '../StatusBar'
import FloatingMenu from '../FloatingMenu'
import { currentUser, newMembers, stats } from '../../data/mockData'
import '../../styles/dashboard.css'

// V2: Complete profile, no upcoming events
function DashboardV2() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [aiResults, setAiResults] = useState(null)

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'super': return 'status-super'
      case 'active': return 'status-active'
      default: return 'status-basic'
    }
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`
  }

  // Simulated complete user profile
  const completeUser = {
    ...currentUser,
    profileCompletion: 100,
    status: 'super'
  }

  // Mock AI search through WhatsApp groups
  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSearching(true)
    setAiResults(null)

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Mock AI results based on query
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

  const clearSearch = () => {
    setQuery('')
    setAiResults(null)
  }

  return (
    <>
      <StatusBar />
      <div className="page-content dashboard-page">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1 className="welcome-greeting">Welcome, {completeUser.firstName}!</h1>
            <p className="welcome-subtitle">
              {stats.newMembersThisWeek} new people joined this week
            </p>
          </div>
        </div>

        {/* AI Search Section */}
        <div className="ai-search-section">
          <div className="ai-search-header">
            <div className="ai-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
                <circle cx="7.5" cy="14.5" r="1.5"/>
                <circle cx="16.5" cy="14.5" r="1.5"/>
              </svg>
              AI Assistant
            </div>
            <p className="ai-search-subtitle">Search through community knowledge</p>
          </div>

          <form onSubmit={handleSearch} className="ai-search-form">
            <div className="ai-search-input-wrapper">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                className="ai-search-input"
                placeholder="Ask anything... e.g., Best places to stay in Vietnam"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button type="button" className="clear-search-btn" onClick={clearSearch}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>
            <button type="submit" className="ai-search-btn" disabled={!query.trim() || isSearching}>
              {isSearching ? (
                <span className="loading-dots">
                  <span></span><span></span><span></span>
                </span>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                  Ask
                </>
              )}
            </button>
          </form>

          {/* AI Results */}
          {aiResults && (
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
                      onClick={() => {
                        setQuery(q)
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* New Members Section */}
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">New Members</h2>
            <Link to="/members" className="section-link">See all</Link>
          </div>
          <div className="new-members-scroll">
            {newMembers.map((member) => (
              <Link key={member.id} to={`/member/${member.id}`} className="new-member-card">
                <div className="new-member-avatar">
                  {member.profilePicture ? (
                    <img src={member.profilePicture} alt={member.firstName} />
                  ) : (
                    <span>{getInitials(member.firstName, member.lastName)}</span>
                  )}
                  <span className={`member-status-dot ${getStatusBadgeClass(member.status)}`} />
                </div>
                <span className="new-member-name">{member.firstName}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
      <FloatingMenu />
    </>
  )
}

export default DashboardV2
