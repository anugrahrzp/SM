import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { currentUser } from '../data/mockData'
import '../styles/sidebar.css'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/members?tag=${encodeURIComponent(searchQuery.trim())}`)
      setIsOpen(false)
      setSearchQuery('')
    }
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Kebab Menu Button */}
      <button className="kebab-menu-btn" onClick={() => setIsOpen(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="2"/>
          <circle cx="12" cy="12" r="2"/>
          <circle cx="12" cy="19" r="2"/>
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={handleClose}></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <h2 className="sidebar-title">Menu</h2>
          <button className="sidebar-close-btn" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <form className="sidebar-search" onSubmit={handleSearch}>
          <div className="sidebar-search-wrapper">
            <svg className="sidebar-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              className="sidebar-search-input"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Menu Items */}
        <nav className="sidebar-nav">
          <Link to="/profile" className="sidebar-nav-item" onClick={handleClose}>
            <div className="sidebar-nav-avatar">
              {currentUser.profilePicture ? (
                <img src={currentUser.profilePicture} alt={currentUser.firstName} />
              ) : (
                <span>{getInitials(currentUser.firstName, currentUser.lastName)}</span>
              )}
            </div>
            <div className="sidebar-nav-content">
              <span className="sidebar-nav-label">My Profile</span>
              <span className="sidebar-nav-sublabel">{currentUser.firstName} {currentUser.lastName}</span>
            </div>
            <svg className="sidebar-nav-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>

          <Link to="/members" className="sidebar-nav-item" onClick={handleClose}>
            <div className="sidebar-nav-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="sidebar-nav-content">
              <span className="sidebar-nav-label">Browse Members</span>
              <span className="sidebar-nav-sublabel">Find and connect</span>
            </div>
            <svg className="sidebar-nav-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>

          <Link to="/dashboard" className="sidebar-nav-item" onClick={handleClose}>
            <div className="sidebar-nav-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div className="sidebar-nav-content">
              <span className="sidebar-nav-label">Home</span>
              <span className="sidebar-nav-sublabel">Dashboard</span>
            </div>
            <svg className="sidebar-nav-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Sidebar
