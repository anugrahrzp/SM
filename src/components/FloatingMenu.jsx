import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/floatingMenu.css'

function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

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
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    {
      path: '/members',
      label: 'Members',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    }
  ]

  return (
    <div className={`floating-menu ${isOpen ? 'open' : ''}`}>
      {/* Menu Items */}
      <div className="floating-menu-items">
        {menuItems.map((item, index) => (
          <Link
            key={item.path}
            to={item.path}
            className={`floating-menu-item ${isActive(item.path) ? 'active' : ''}`}
            style={{ transitionDelay: isOpen ? `${index * 50}ms` : '0ms' }}
            onClick={() => setIsOpen(false)}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Toggle Button */}
      <button
        className="floating-menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="12" cy="5" r="1"/>
            <circle cx="12" cy="19" r="1"/>
          </svg>
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="floating-menu-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default FloatingMenu
