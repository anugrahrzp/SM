import { Link, useLocation } from 'react-router-dom'
import '../styles/floatingMenu.css'

function FloatingMenu() {
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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    {
      path: '/members',
      label: 'Members',
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

  return (
    <nav className="floating-dock">
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
  )
}

export default FloatingMenu
