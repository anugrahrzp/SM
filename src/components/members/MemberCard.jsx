import { Link } from 'react-router-dom'

function MemberCard({ member }) {
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'super': return 'badge-super'
      case 'active': return 'badge-active'
      default: return 'badge-basic'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'super': return 'Super'
      case 'active': return 'Active'
      default: return 'Basic'
    }
  }

  const truncateText = (text, maxLength = 80) => {
    if (!text) return ''
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  const handleEmailClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    window.location.href = `mailto:${member.email}`
  }

  const handlePhoneClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    window.location.href = `tel:${member.phone}`
  }

  return (
    <Link to={`/member/${member.id}`} className="member-card">
      <div className="member-card-header">
        <div className="member-avatar">
          {member.profilePicture ? (
            <img src={member.profilePicture} alt={member.firstName} />
          ) : (
            <span>{getInitials(member.firstName, member.lastName)}</span>
          )}
        </div>
        <div className="member-info">
          <div className="member-name-row">
            <h3 className="member-name">{member.firstName} {member.lastName}</h3>
            <span className={`status-badge ${getStatusBadgeClass(member.status)}`}>
              {getStatusLabel(member.status)}
            </span>
          </div>
          <p className="member-role">{member.currentRole} at {member.currentOrganization}</p>
          <p className="member-location">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {member.livesIn}
          </p>
        </div>
      </div>

      <p className="member-intro">{truncateText(member.introduction)}</p>

      {member.tags && member.tags.length > 0 && (
        <div className="member-tags">
          {member.tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      )}

      <div className="member-actions">
        <button className="action-btn email-btn" onClick={handleEmailClick}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          Email
        </button>
        <button className="action-btn phone-btn" onClick={handlePhoneClick}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          Call
        </button>
      </div>
    </Link>
  )
}

export default MemberCard
