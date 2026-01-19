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
    </Link>
  )
}

export default MemberCard
