import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import StatusBar from '../StatusBar'
import MemberCard from './MemberCard'
import { members, stats } from '../../data/mockData'
import '../../styles/members.css'

function Members() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('completion')
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const sortOptions = [
    { value: 'completion', label: 'Profile Completion (High → Low)' },
    { value: 'name_asc', label: 'Name (A → Z)' },
    { value: 'name_desc', label: 'Name (Z → A)' },
    { value: 'recent', label: 'Recently Joined' }
  ]

  const filteredAndSortedMembers = useMemo(() => {
    let result = [...members]

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(member =>
        member.firstName.toLowerCase().includes(query) ||
        member.lastName.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.currentOrganization.toLowerCase().includes(query) ||
        member.livesIn.toLowerCase().includes(query) ||
        member.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Sort
    switch (sortBy) {
      case 'completion':
        result.sort((a, b) => (b.profileCompletion || 0) - (a.profileCompletion || 0))
        break
      case 'name_asc':
        result.sort((a, b) => a.firstName.localeCompare(b.firstName))
        break
      case 'name_desc':
        result.sort((a, b) => b.firstName.localeCompare(a.firstName))
        break
      case 'recent':
        // For mock data, just reverse the array
        result.reverse()
        break
      default:
        break
    }

    return result
  }, [searchQuery, sortBy])

  const handleSortSelect = (value) => {
    setSortBy(value)
    setShowSortDropdown(false)
  }

  return (
    <>
      <StatusBar />
      <div className="page-content members-page">
        {/* Header */}
        <div className="members-header">
          <Link to="/dashboard" className="back-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Link>
          <h1 className="members-title">Browse Members</h1>
          <div className="header-spacer"></div>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-input-wrapper">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, email or tags"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Sort and Count Row */}
        <div className="members-toolbar">
          <span className="members-count">
            All members ({filteredAndSortedMembers.length})
          </span>

          <div className="sort-dropdown-container">
            <button
              className="sort-btn"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="6" x2="20" y2="6"/>
                <line x1="4" y1="12" x2="16" y2="12"/>
                <line x1="4" y1="18" x2="12" y2="18"/>
              </svg>
              Sort
            </button>

            {showSortDropdown && (
              <div className="sort-dropdown">
                {sortOptions.map(option => (
                  <button
                    key={option.value}
                    className={`sort-option ${sortBy === option.value ? 'active' : ''}`}
                    onClick={() => handleSortSelect(option.value)}
                  >
                    {option.label}
                    {sortBy === option.value && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Members List */}
        <div className="members-list">
          {filteredAndSortedMembers.length > 0 ? (
            filteredAndSortedMembers.map(member => (
              <MemberCard key={member.id} member={member} />
            ))
          ) : (
            <div className="no-results">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <p>No members found matching "{searchQuery}"</p>
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <Link to="/dashboard" className="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>Home</span>
          </Link>
          <Link to="/members" className="nav-item active">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>Members</span>
          </Link>
          <Link to="/profile" className="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>Profile</span>
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Members
