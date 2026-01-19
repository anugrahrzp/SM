import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/floatingMenu.css'

function FloatingMenu() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Check if we're on a detail page (member or business)
  const isDetailPage = location.pathname.startsWith('/member/') ||
                       location.pathname.startsWith('/business/')

  // Check if we're on the community/members page
  const isCommunityPage = location.pathname === '/members'

  // Scroll detection for community page
  useEffect(() => {
    if (!isCommunityPage) {
      setIsCollapsed(isDetailPage)
      return
    }

    const handleScroll = () => {
      const pageContent = document.querySelector('.page-content')
      if (!pageContent) return

      const scrollTop = pageContent.scrollTop
      const scrollHeight = pageContent.scrollHeight
      const clientHeight = pageContent.clientHeight

      // Check if near bottom (within 150px)
      const nearBottom = scrollTop + clientHeight >= scrollHeight - 150
      setIsCollapsed(nearBottom)
    }

    const pageContent = document.querySelector('.page-content')
    if (pageContent) {
      pageContent.addEventListener('scroll', handleScroll)
      handleScroll()
    }

    return () => {
      if (pageContent) {
        pageContent.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isCommunityPage, isDetailPage, location.pathname])

  // Set collapsed state for detail pages
  useEffect(() => {
    if (isDetailPage) {
      setIsCollapsed(true)
    }
  }, [isDetailPage])

  // Reset isOpen when switching pages or collapsing
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Close menu when collapsing
  useEffect(() => {
    if (!isCollapsed) {
      setIsOpen(false)
    }
  }, [isCollapsed])

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard'
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
      path: '/dashboard',
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

  const handleHamburgerClick = () => {
    setIsOpen(!isOpen)
  }

  const handleItemClick = () => {
    if (isCollapsed) {
      setIsOpen(false)
    }
  }

  const handleBackdropClick = () => {
    setIsOpen(false)
  }

  return (
    <div className={`floating-menu-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Backdrop for collapsed menu */}
      {isCollapsed && isOpen && (
        <div className="menu-backdrop" onClick={handleBackdropClick} />
      )}

      {/* Main Dock */}
      <nav className={`floating-dock ${isCollapsed ? 'dock-collapsed' : ''} ${isOpen ? 'dock-open' : ''}`}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`dock-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={handleItemClick}
            title={isCollapsed ? item.label : undefined}
          >
            <span className="dock-icon">{item.icon}</span>
            <span className="dock-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Hamburger Button - Only visible when collapsed */}
      <button
        className={`hamburger-btn ${isOpen ? 'open' : ''}`}
        onClick={handleHamburgerClick}
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
    </div>
  )
}

export default FloatingMenu
