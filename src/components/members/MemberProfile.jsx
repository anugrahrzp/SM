import { useParams, Link, useNavigate } from 'react-router-dom'
import StatusBar from '../StatusBar'
import { members } from '../../data/mockData'
import '../../styles/memberProfile.css'

function MemberProfile() {
  const { id } = useParams()
  const navigate = useNavigate()

  const member = members.find(m => m.id === id)

  if (!member) {
    return (
      <>
        <StatusBar />
        <div className="page-content">
          <div className="not-found">
            <h2>Member not found</h2>
            <Link to="/members">Back to Members</Link>
          </div>
        </div>
      </>
    )
  }

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

  const handleEmailClick = () => {
    window.location.href = `mailto:${member.email}`
  }

  const handlePhoneClick = () => {
    window.location.href = `tel:${member.phone}`
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${member.firstName} ${member.lastName} - Gang 360`,
          url: url
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      navigator.clipboard.writeText(url)
      alert('Profile link copied to clipboard!')
    }
  }

  return (
    <>
      <StatusBar />
      <div className="page-content profile-page">
        {/* Header */}
        <div className="profile-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <button className="share-btn" onClick={handleShare}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
        </div>

        {/* Profile Hero */}
        <div className="profile-hero">
          <div className="profile-avatar-large">
            {member.profilePicture ? (
              <img src={member.profilePicture} alt={member.firstName} />
            ) : (
              <span>{getInitials(member.firstName, member.lastName)}</span>
            )}
          </div>

          <div className="profile-name-section">
            <h1 className="profile-name">{member.firstName} {member.lastName}</h1>
            <span className={`status-badge ${getStatusBadgeClass(member.status)}`}>
              {getStatusLabel(member.status)}
            </span>
          </div>

          <p className="profile-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {member.livesIn}
          </p>

          {/* Tags */}
          {member.tags && member.tags.length > 0 && (
            <div className="profile-tags">
              {member.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* Contact Buttons */}
        <div className="contact-buttons">
          <button className="contact-btn email-btn" onClick={handleEmailClick}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Email
          </button>
          <button className="contact-btn phone-btn" onClick={handlePhoneClick}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Call
          </button>
        </div>

        {/* Currently Section */}
        <div className="profile-section">
          <h3 className="section-title">Currently</h3>
          <div className="currently-card">
            <p className="currently-role">{member.currentRole}</p>
            <p className="currently-org">at {member.currentOrganization}</p>
          </div>
        </div>

        {/* About Section */}
        <div className="profile-section">
          <h3 className="section-title">About</h3>
          <p className="profile-bio">{member.bio || member.introduction}</p>
        </div>

        {/* Joy Outside Work */}
        {member.joyOutsideWork && (
          <div className="profile-section">
            <h3 className="section-title">Outside Work</h3>
            <p className="profile-joy">{member.joyOutsideWork}</p>
          </div>
        )}

        {/* Quote */}
        {member.quote && (
          <div className="profile-section">
            <div className="quote-card">
              <svg className="quote-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
              </svg>
              <p className="quote-text">{member.quote}</p>
            </div>
          </div>
        )}

        {/* Videos Section */}
        {member.hasVideos && (member.hasVideos.earlyLife || member.hasVideos.professionalLife || member.hasVideos.currentLife) && (
          <div className="profile-section">
            <h3 className="section-title">Story Videos</h3>
            <div className="videos-grid">
              {member.hasVideos.earlyLife && (
                <div className="video-card">
                  <div className="video-thumbnail">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </div>
                  <span className="video-label">Early Life</span>
                </div>
              )}
              {member.hasVideos.professionalLife && (
                <div className="video-card">
                  <div className="video-thumbnail">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </div>
                  <span className="video-label">Professional</span>
                </div>
              )}
              {member.hasVideos.currentLife && (
                <div className="video-card">
                  <div className="video-thumbnail">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </div>
                  <span className="video-label">Current Life</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Social Links */}
        {(member.linkedin || member.twitter || member.instagram) && (
          <div className="profile-section">
            <h3 className="section-title">Connect</h3>
            <div className="social-links">
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              )}
              {member.twitter && (
                <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="social-link twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Twitter
                </a>
              )}
              {member.instagram && (
                <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="social-link instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
              )}
            </div>
          </div>
        )}

        {/* Content Links */}
        {member.contentLinks && member.contentLinks.length > 0 && (
          <div className="profile-section">
            <h3 className="section-title">Content</h3>
            <div className="content-links">
              {member.contentLinks.map((link, index) => (
                <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="content-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  {link.replace(/https?:\/\/(www\.)?/, '').split('/')[0]}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Spacer for scrolling */}
        <div style={{ height: '24px' }}></div>
      </div>
    </>
  )
}

export default MemberProfile
