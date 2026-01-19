import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/floatingMenu.css'

function FloatingMenu() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const lastScrollTop = useRef(0)

  // Check if we're on a detail page (member or business)
  const isDetailPage = location.pathname.startsWith('/member/') ||
                       location.pathname.startsWith('/business/')

  // Check if we're on the Community page
  const isCommunityPage = location.pathname === '/members'

  // Reset states when switching pages
  useEffect(() => {
    setIsOpen(false)
    setIsCollapsed(false)
  }, [location.pathname])

  // Scroll detection for Community page
  useEffect(() => {
    if (!isCommunityPage) return

    const pageContent = document.querySelector('.page-content')
    if (!pageContent) return

    const handleScroll = () => {
      const scrollTop = pageContent.scrollTop
      const scrollHeight = pageContent.scrollHeight
      const clientHeight = pageContent.clientHeight
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight

      // Collapse when near bottom (within 50px)
      if (distanceFromBottom < 50) {
        setIsCollapsed(true)
      } else if (scrollTop < lastScrollTop.current && distanceFromBottom > 100) {
        // Expand when scrolling up and not near bottom
        setIsCollapsed(false)
      }

      lastScrollTop.current = scrollTop
    }

    pageContent.addEventListener('scroll', handleScroll)
    return () => pageContent.removeEventListener('scroll', handleScroll)
  }, [isCommunityPage])

  const isActive = (path) => {
    if (path === '/dashboard-v2') {
      return location.pathname === '/dashboard-v2'
    }
    if (path === '/members') {
      return location.pathname.startsWith('/members') ||
             location.pathname.startsWith('/member/') ||
             location.pathname.startsWith('/business/')
    }
    if (path === '/profile') {
      return location.pathname === '/profile'
    }
    return false
  }

  const menuItems = [
    {
      path: '/dashboard-v2',
      label: 'Home',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    {
      path: '/members',
      label: 'Community',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    {
      path: '/profile',
      label: 'Profile',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    }
  ]

  // Determine if we should show collapsed/hamburger state
  const showCollapsed = isDetailPage || isCollapsed

  return (
    <div className={`floating-menu-wrapper ${showCollapsed ? 'collapsed' : ''}`}>
      {/* Backdrop - only when hamburger menu is open */}
      {showCollapsed && isOpen && (
        <div className="menu-backdrop" onClick={() => setIsOpen(false)} />
      )}

      {/* Full Dock - fades out when collapsed */}
      <nav className={`floating-dock floating-dock-full ${showCollapsed ? 'hidden' : ''}`}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`dock-item ${isActive(item.path) ? 'active' : ''}`}
          >
            <span className="dock-icon">{item.icon}</span>
            <span className="dock-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Hamburger Menu - fades in when collapsed */}
      <div className={`hamburger-container ${showCollapsed ? 'visible' : ''}`}>
        <nav className={`floating-dock floating-dock-expandable ${isOpen ? 'open' : ''}`}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`dock-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
              title={item.label}
            >
              <span className="dock-icon">{item.icon}</span>
            </Link>
          ))}
        </nav>

        <button
          className={`hamburger-btn ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </div>
  )
}

export default FloatingMenu
