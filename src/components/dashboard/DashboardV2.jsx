import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StatusBar from '../StatusBar'
import FloatingMenu from '../FloatingMenu'
import { currentUser, newMembers, stats } from '../../data/mockData'
import '../../styles/dashboard.css'

// V2: Complete profile, no upcoming events
function DashboardV2() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

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

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    // Navigate to AI results page with query
    navigate(`/ai-search?q=${encodeURIComponent(query)}`)
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

        {/* AI Search Section - Full Width */}
        <div className="ai-search-section ai-search-full">
          <form onSubmit={handleSearch} className="ai-search-form-stacked">
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
            </div>
            <button type="submit" className="ai-search-btn-full" disabled={!query.trim()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
              Ask Community
            </button>
          </form>
        </div>

      </div>
      <FloatingMenu />
    </>
  )
}

export default DashboardV2
