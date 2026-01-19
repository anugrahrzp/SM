import { useParams, Link, useNavigate } from 'react-router-dom'
import StatusBar from '../StatusBar'
import FloatingMenu from '../FloatingMenu'
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
        {/* Top Bar - Status Badge + Profile Link */}
        <div className="profile-top-bar">
          <span className={`status-badge-pill ${getStatusBadgeClass(member.status)}`}>
            {getStatusLabel(member.status)}
          </span>
          <button className="profile-link-btn" onClick={handleShare}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Profile Link
          </button>
        </div>

        {/* Profile Hero - Name Left, Avatar Right */}
        <div className="profile-hero-new">
          <div className="profile-hero-content">
            <h1 className="profile-name-large">{member.firstName} {member.lastName}</h1>
          </div>
          <div className="profile-avatar-hero">
            {member.profilePicture ? (
              <img src={member.profilePicture} alt={member.firstName} />
            ) : (
              <span>{getInitials(member.firstName, member.lastName)}</span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="profile-divider"></div>

        {/* Location */}
        <div className="profile-location-row">
          <span className="location-label">Lives in </span>
          <Link to={`/members?tag=${encodeURIComponent(member.livesIn.split(',')[0].trim())}`} className="location-link">
            {member.livesIn.split(',')[0].trim()}
          </Link>
        </div>

        {/* Bio */}
        <div className="profile-bio-section">
          <p className="profile-bio-text">{member.bio || member.introduction}</p>
        </div>

        {/* Business Section - Only for founders */}
        {member.role === 'founder' && member.business && (
          <div className="business-section">
            <div className="business-header">
              <div className="business-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
                Gang's Business
              </div>
            </div>
            <div className="business-card">
              <h3 className="business-name">{member.business.name}</h3>
              <div className="business-meta">
                <span className="business-category">{member.business.category}</span>
                <span className="business-type">
                  {member.business.type === 'service' ? 'Service' : member.business.type === 'product' ? 'Product' : 'Product & Service'}
                </span>
              </div>
              <p className="business-description">{member.business.description}</p>

              {/* Services list for service businesses */}
              {member.business.type === 'service' && member.business.offerings && (
                <div className="business-services-list">
                  <h4 className="offerings-title">What We Offer</h4>
                  {member.business.offerings.map((offering, index) => (
                    <div key={index} className="service-list-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span>{offering.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Product catalogue for product businesses */}
              {(member.business.type === 'product' || member.business.type === 'both') && member.business.offerings && (
                <div className="business-product-catalogue">
                  <h4 className="offerings-title">
                    {member.business.type === 'both' ? 'Products & Services' : 'Product Catalogue'}
                  </h4>
                  <div className="product-grid-small">
                    {member.business.offerings.map((offering, index) => (
                      <div key={index} className="product-card-small">
                        {offering.image && (
                          <div className="product-image-small">
                            <img src={offering.image} alt={offering.name} />
                          </div>
                        )}
                        <span className="product-name-small">{offering.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="business-discount-banner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/>
                  <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
                <span>{member.business.memberDiscount}</span>
              </div>

              <a
                href={`https://wa.me/${member.whatsapp}?text=${encodeURIComponent(`Hi ${member.firstName}, I found your business "${member.business.name}" on Gang 360 and would like to know more.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="business-contact-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contact on WhatsApp
              </a>

              {/* Founders Section - at bottom */}
              <div className="business-founders">
                <h4 className="founders-title">
                  {member.business.coFounderIds?.length > 0 ? 'Founders' : 'Founder'}
                </h4>
                <div className="founders-list">
                  {/* Current member (primary founder) */}
                  <div className="founder-card">
                    <div className="founder-avatar">
                      {member.profilePicture ? (
                        <img src={member.profilePicture} alt={member.firstName} />
                      ) : (
                        <span>{member.firstName.charAt(0)}{member.lastName.charAt(0)}</span>
                      )}
                    </div>
                    <div className="founder-info">
                      <span className="founder-name">{member.firstName} {member.lastName}</span>
                      <span className="founder-role">{member.currentRole}</span>
                    </div>
                  </div>

                  {/* Co-founders */}
                  {member.business.coFounderIds?.map(coFounderId => {
                    const coFounder = members.find(m => m.id === coFounderId)
                    if (!coFounder) return null
                    return (
                      <Link key={coFounderId} to={`/member/${coFounderId}`} className="founder-card founder-card-link">
                        <div className="founder-avatar">
                          {coFounder.profilePicture ? (
                            <img src={coFounder.profilePicture} alt={coFounder.firstName} />
                          ) : (
                            <span>{coFounder.firstName.charAt(0)}{coFounder.lastName.charAt(0)}</span>
                          )}
                        </div>
                        <div className="founder-info">
                          <span className="founder-name">{coFounder.firstName} {coFounder.lastName}</span>
                          <span className="founder-role">{coFounder.currentRole}</span>
                        </div>
                        <svg className="founder-link-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Current Life Section */}
        <div className="current-life-section">
          <div className="section-header-with-icon">
            <h3 className="section-title-large">Current Life</h3>
            <div className="section-icon">
              <svg width="24" height="24" viewBox="0 0 60 80" fill="none">
                <circle cx="30" cy="10" r="6" fill="#648349"/>
                <polygon points="30,20 45,45 15,45" fill="#648349" opacity="0.8"/>
                <polygon points="30,35 50,65 10,65" fill="#648349" opacity="0.6"/>
              </svg>
            </div>
          </div>
          <div className="section-divider"></div>

          {/* Video Thumbnail */}
          {member.hasVideos?.currentLife && (
            <div className="current-life-video">
              <div className="video-preview">
                <div className="video-placeholder">
                  <svg className="play-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>
                  </svg>
                </div>
                <span className="video-duration">3:12</span>
              </div>
            </div>
          )}

          {/* Tags */}
          {member.tags && member.tags.length > 0 && (
            <div className="current-life-tags">
              {member.livesIn && (
                <Link to={`/members?tag=${encodeURIComponent(member.livesIn.split(',')[0])}`} className="life-tag">
                  {member.livesIn.split(',')[0]}
                </Link>
              )}
              {member.tags.map((tag, index) => (
                <Link
                  key={index}
                  to={`/members?tag=${encodeURIComponent(tag)}`}
                  className="life-tag"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Roles / Organizations */}
          <div className="roles-section">
            <p className="roles-label">Roles / Organizations</p>
            <div className="role-badge">
              {member.currentRole} / {member.currentOrganization}
            </div>
          </div>

          {/* Current Life Summary */}
          <div className="current-life-summary">
            <p className="summary-label">Current Life Summary</p>
            <p className="summary-text">
              {member.bio?.substring(0, 100) || member.introduction?.substring(0, 100)}...
            </p>
            <button className="show-more-btn">Show More</button>
          </div>
        </div>

        {/* Quote Card - Purple */}
        {member.quote && (
          <div className="colored-card quote-card-purple">
            <div className="card-content">
              <p className="card-label">A Quote that inspires me!</p>
              <p className="card-text">{member.quote}</p>
            </div>
            <div className="card-decoration">
              <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
                <circle cx="45" cy="10" r="8" fill="rgba(255,255,255,0.3)"/>
                <polygon points="30,25 50,55 10,55" fill="rgba(255,255,255,0.25)"/>
                <polygon points="30,40 55,75 5,75" fill="rgba(255,255,255,0.2)"/>
              </svg>
            </div>
          </div>
        )}

        {/* Early Life Section */}
        <div className="life-section">
          <div className="section-header-with-icon">
            <h3 className="section-title-large">Early Life</h3>
            <div className="section-icon">
              <svg width="24" height="24" viewBox="0 0 60 80" fill="none">
                <circle cx="30" cy="10" r="6" fill="#648349"/>
                <polygon points="30,20 45,45 15,45" fill="#648349" opacity="0.8"/>
                <polygon points="30,35 50,65 10,65" fill="#648349" opacity="0.6"/>
              </svg>
            </div>
          </div>
          <div className="section-divider"></div>

          {/* Video Thumbnail */}
          {member.hasVideos?.earlyLife && (
            <div className="life-video">
              <div className="video-preview">
                <div className="video-placeholder">
                  <svg className="play-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>
                  </svg>
                </div>
                <span className="video-duration">1:58</span>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="life-tags">
            {member.hometown && (
              <Link to={`/members?tag=${encodeURIComponent(member.hometown)}`} className="life-tag">
                {member.hometown}
              </Link>
            )}
            {member.bornIn && (
              <Link to={`/members?tag=${encodeURIComponent(member.bornIn)}`} className="life-tag">
                {member.bornIn}
              </Link>
            )}
            {member.interests?.map((interest, index) => (
              <Link
                key={index}
                to={`/members?tag=${encodeURIComponent(interest)}`}
                className="life-tag"
              >
                {interest}
              </Link>
            ))}
          </div>

          {/* Background Info */}
          <div className="life-details">
            {member.hometown && (
              <div className="life-detail-item">
                <p className="detail-label">Hometown</p>
                <Link to={`/members?tag=${encodeURIComponent(member.hometown)}`} className="detail-value">
                  {member.hometown}
                </Link>
              </div>
            )}
            {member.bornIn && (
              <div className="life-detail-item">
                <p className="detail-label">Born in</p>
                <Link to={`/members?tag=${encodeURIComponent(member.bornIn)}`} className="detail-value">
                  {member.bornIn}
                </Link>
              </div>
            )}
            {member.school && (
              <div className="life-detail-item">
                <p className="detail-label">Went to school at</p>
                <p className="detail-value-text">{member.school}</p>
              </div>
            )}
            {member.college && (
              <div className="life-detail-item">
                <p className="detail-label">Went to college at</p>
                {Array.isArray(member.college) ? (
                  member.college.map((col, index) => (
                    <p key={index} className="detail-value-text">{col}</p>
                  ))
                ) : (
                  <p className="detail-value-text">{member.college}</p>
                )}
              </div>
            )}
          </div>

          {/* Early Life Summary */}
          {member.earlyLifeSummary && (
            <div className="life-summary">
              <p className="summary-label">Early Life Summary</p>
              <p className="summary-text">
                {member.earlyLifeSummary.substring(0, 100)}...
              </p>
              <button className="show-more-btn">Show More</button>
            </div>
          )}
        </div>

        {/* Professional Life Section */}
        <div className="life-section">
          <div className="section-header-with-icon">
            <h3 className="section-title-large">Professional Life</h3>
            <div className="section-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#648349" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
          </div>
          <div className="section-divider"></div>

          {/* Video Thumbnail */}
          {member.hasVideos?.professionalLife && (
            <div className="life-video">
              <div className="video-preview">
                <div className="video-placeholder">
                  <svg className="play-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>
                  </svg>
                </div>
                <span className="video-duration">2:45</span>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="life-tags">
            {member.tags?.map((tag, index) => (
              <Link
                key={index}
                to={`/members?tag=${encodeURIComponent(tag)}`}
                className="life-tag"
              >
                {tag}
              </Link>
            ))}
            {member.industry && (
              <Link to={`/members?tag=${encodeURIComponent(member.industry)}`} className="life-tag">
                {member.industry}
              </Link>
            )}
          </div>

          {/* Professional Details */}
          <div className="life-details">
            {member.previousCompanies && member.previousCompanies.length > 0 && (
              <div className="life-detail-item">
                <p className="detail-label">Previous Companies</p>
                {member.previousCompanies.map((company, index) => (
                  <p key={index} className="detail-value-text">{company}</p>
                ))}
              </div>
            )}
            {member.yearsOfExperience && (
              <div className="life-detail-item">
                <p className="detail-label">Years of Experience</p>
                <p className="detail-value-text">{member.yearsOfExperience} years</p>
              </div>
            )}
            {member.industry && (
              <div className="life-detail-item">
                <p className="detail-label">Industry</p>
                <Link to={`/members?tag=${encodeURIComponent(member.industry)}`} className="detail-value">
                  {member.industry}
                </Link>
              </div>
            )}
            {member.expertise && member.expertise.length > 0 && (
              <div className="life-detail-item">
                <p className="detail-label">Areas of Expertise</p>
                <p className="detail-value-text">{member.expertise.join(', ')}</p>
              </div>
            )}
          </div>

          {/* Professional Life Summary */}
          {member.professionalLifeSummary && (
            <div className="life-summary">
              <p className="summary-label">Professional Life Summary</p>
              <p className="summary-text">
                {member.professionalLifeSummary.substring(0, 100)}...
              </p>
              <button className="show-more-btn">Show More</button>
            </div>
          )}
        </div>

        {/* Joy Card - Orange */}
        {member.joyOutsideWork && (
          <div className="colored-card joy-card-orange">
            <div className="card-content">
              <p className="card-label">What fills me with joy</p>
              <p className="card-text">{member.joyOutsideWork}</p>
            </div>
            <div className="card-decoration">
              <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
                <circle cx="45" cy="10" r="8" fill="rgba(255,255,255,0.3)"/>
                <polygon points="30,25 50,55 10,55" fill="rgba(255,255,255,0.25)"/>
                <polygon points="30,40 55,75 5,75" fill="rgba(255,255,255,0.2)"/>
              </svg>
            </div>
          </div>
        )}

        {/* Coordinates Section */}
        <div className="coordinates-section">
          <h3 className="coordinates-title">{member.firstName}'s Coordinates</h3>
          <div className="coordinates-divider"></div>
          <div className="coordinates-grid">
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="coordinate-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            )}
            {member.twitter && (
              <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="coordinate-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>X.com</span>
              </a>
            )}
            {member.instagram && (
              <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="coordinate-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </a>
            )}
            <a href={`mailto:${member.email}`} className="coordinate-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>Email</span>
            </a>
            {member.whatsapp && (
              <a href={`https://wa.me/${member.whatsapp}`} target="_blank" rel="noopener noreferrer" className="coordinate-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Whatsapp</span>
              </a>
            )}
            {member.phone && (
              <a href={`tel:${member.phone}`} className="coordinate-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>Text/Cell</span>
              </a>
            )}
          </div>
        </div>

        <FloatingMenu />

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
