import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import StatusBar from '../StatusBar'
import FloatingMenu from '../FloatingMenu'
import MemberCard from './MemberCard'
import ServiceCard from './ServiceCard'
import { members, stats } from '../../data/mockData'
import '../../styles/members.css'

function Members() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tagFilter = searchParams.get('tag')
  const initialTab = searchParams.get('tab') || 'people'
  const [activeTab, setActiveTab] = useState(initialTab)
  const [searchQuery, setSearchQuery] = useState(tagFilter || '')
  const [sortBy, setSortBy] = useState('completion')
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  // Update search query when tag filter changes from URL
  useEffect(() => {
    if (tagFilter) {
      setSearchQuery(tagFilter)
    }
  }, [tagFilter])

  const sortOptions = [
    { value: 'completion', label: 'Profile Completion (High → Low)' },
    { value: 'name_asc', label: 'Name (A → Z)' },
    { value: 'name_desc', label: 'Name (Z → A)' },
    { value: 'recent', label: 'Recently Joined' }
  ]

  // Get members with businesses (services)
  const services = useMemo(() => {
    return members.filter(member => member.business && member.role === 'founder')
  }, [])

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

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services

    const query = searchQuery.toLowerCase()
    return services.filter(member =>
      member.business.name.toLowerCase().includes(query) ||
      member.business.category.toLowerCase().includes(query) ||
      member.business.description.toLowerCase().includes(query) ||
      member.firstName.toLowerCase().includes(query) ||
      member.lastName.toLowerCase().includes(query)
    )
  }, [services, searchQuery])

  const handleSortSelect = (value) => {
    setSortBy(value)
    setShowSortDropdown(false)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSearchQuery('')
    setSearchParams({ tab })
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
          <h1 className="members-title">Community</h1>
          <div className="header-spacer"></div>
        </div>

        {/* Tabs */}
        <div className="members-tabs">
          <button
            className={`tab-btn ${activeTab === 'people' ? 'active' : ''}`}
            onClick={() => handleTabChange('people')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            People
          </button>
          <button
            className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => handleTabChange('services')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            Services
          </button>
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
              placeholder={activeTab === 'people' ? "Search by name, email or tags" : "Search services or businesses"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => {
                setSearchQuery('')
                setSearchParams({ tab: activeTab }) // Keep tab, clear search
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Tag Filter Badge */}
        {tagFilter && activeTab === 'people' && (
          <div className="tag-filter-badge">
            <span>Filtering by tag:</span>
            <span className="tag-badge">{tagFilter}</span>
            <button
              className="clear-tag-btn"
              onClick={() => {
                setSearchQuery('')
                setSearchParams({ tab: activeTab })
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        )}

        {/* People Tab Content */}
        {activeTab === 'people' && (
          <>
            {/* Sort and Count Row */}
            <div className="members-toolbar">
              <span className="members-count">
                {tagFilter ? `Members with "${tagFilter}"` : 'All members'} ({filteredAndSortedMembers.length})
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
                  <button className="clear-search-btn" onClick={() => {
                    setSearchQuery('')
                    setSearchParams({ tab: activeTab })
                  }}>
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Services Tab Content */}
        {activeTab === 'services' && (
          <>
            {/* Count Row */}
            <div className="members-toolbar">
              <span className="members-count">
                Community Businesses ({filteredServices.length})
              </span>
              <span className="member-discount-badge">Member discounts available</span>
            </div>

            {/* Services List */}
            <div className="services-list">
              {filteredServices.length > 0 ? (
                filteredServices.map(member => (
                  <ServiceCard key={member.id} member={member} />
                ))
              ) : (
                <div className="no-results">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                  <p>No services found matching "{searchQuery}"</p>
                  <button className="clear-search-btn" onClick={() => {
                    setSearchQuery('')
                    setSearchParams({ tab: activeTab })
                  }}>
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </>
        )}

      </div>
      <FloatingMenu />
    </>
  )
}

export default Members
