import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import StatusBar from '../StatusBar'
import { currentUser } from '../../data/mockData'
import '../../styles/myProfile.css'

function MyProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    ...currentUser,
    bio: currentUser.introduction,
    quote: '"Innovation distinguishes between a leader and a follower." - Steve Jobs',
    joyOutsideWork: 'Reading, Hiking, Photography',
    twitter: '',
    linkedin: 'https://linkedin.com/in/anugrah',
    instagram: '',
    contentLinks: [],
    hasVideos: { earlyLife: false, professionalLife: false, currentLife: false }
  })
  const [profilePicturePreview, setProfilePicturePreview] = useState(null)
  const fileInputRef = useRef(null)

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    console.log('Saving profile:', profileData)
    setIsEditing(false)
    alert('Profile saved! (Mock)')
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset to original data
    setProfileData({
      ...currentUser,
      bio: currentUser.introduction,
      quote: '"Innovation distinguishes between a leader and a follower." - Steve Jobs',
      joyOutsideWork: 'Reading, Hiking, Photography',
      twitter: '',
      linkedin: 'https://linkedin.com/in/anugrah',
      instagram: '',
      contentLinks: [],
      hasVideos: { earlyLife: false, professionalLife: false, currentLife: false }
    })
  }

  const handleSubmitForReview = () => {
    console.log('Submitting for review:', profileData)
    alert('Profile submitted for review! (Mock)')
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profileData.firstName} ${profileData.lastName} - Gang 360`,
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

  const completionItems = [
    { label: 'Basic Info', done: profileData.firstName && profileData.lastName },
    { label: 'Organization & Role', done: profileData.currentOrganization && profileData.currentRole },
    { label: 'Introduction', done: profileData.bio?.length > 20 },
    { label: 'Location', done: profileData.livesIn },
    { label: 'Quote', done: profileData.quote },
    { label: 'Early Life Video', done: profileData.hasVideos?.earlyLife },
    { label: 'Professional Life Video', done: profileData.hasVideos?.professionalLife },
    { label: 'Current Life Video', done: profileData.hasVideos?.currentLife }
  ]

  const completedCount = completionItems.filter(item => item.done).length
  const completionPercentage = Math.round((completedCount / completionItems.length) * 100)

  return (
    <>
      <StatusBar />
      <div className="page-content my-profile-page">
        {/* Header */}
        <div className="my-profile-header">
          <h1 className="page-title">My Profile</h1>
          <div className="header-actions">
            {!isEditing ? (
              <>
                <button className="icon-btn" onClick={handleShare}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                </button>
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Edit
                </button>
              </>
            ) : (
              <>
                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                <button className="save-btn" onClick={handleSave}>Save</button>
              </>
            )}
          </div>
        </div>

        {/* Profile Completion Card */}
        <div className="completion-card">
          <div className="completion-header">
            <span className="completion-label">Profile Completion</span>
            <span className="completion-percent">{completionPercentage}%</span>
          </div>
          <div className="completion-bar">
            <div className="completion-fill" style={{ width: `${completionPercentage}%` }}></div>
          </div>
          <div className="completion-checklist">
            {completionItems.map((item, index) => (
              <div key={index} className={`checklist-item ${item.done ? 'done' : ''}`}>
                {item.done ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                ) : (
                  <div className="checkbox-empty"></div>
                )}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Avatar */}
        <div className="profile-avatar-section">
          <div
            className="my-profile-avatar"
            onClick={() => isEditing && fileInputRef.current?.click()}
          >
            {profilePicturePreview || profileData.profilePicture ? (
              <img src={profilePicturePreview || profileData.profilePicture} alt="Profile" />
            ) : (
              <span>{getInitials(profileData.firstName, profileData.lastName)}</span>
            )}
            {isEditing && (
              <div className="avatar-overlay">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <div className="profile-name-status">
            <h2 className="my-profile-name">{profileData.firstName} {profileData.lastName}</h2>
            <span className={`status-badge ${getStatusBadgeClass(profileData.status)}`}>
              {getStatusLabel(profileData.status)}
            </span>
          </div>
          <p className="my-profile-email">{profileData.email}</p>
        </div>

        {/* Basic Info Section */}
        <div className="profile-section">
          <h3 className="section-title">Basic Information</h3>

          {isEditing ? (
            <div className="edit-fields">
              <div className="field-row">
                <div className="field-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div className="field-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>
              <div className="field-group">
                <label>Organization</label>
                <input
                  type="text"
                  name="currentOrganization"
                  value={profileData.currentOrganization}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div className="field-group">
                <label>Role</label>
                <input
                  type="text"
                  name="currentRole"
                  value={profileData.currentRole}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div className="field-group">
                <label>Inspiring Quote</label>
                <textarea
                  name="quote"
                  value={profileData.quote}
                  onChange={handleChange}
                  className="input-field textarea"
                  rows={2}
                />
              </div>
            </div>
          ) : (
            <div className="view-fields">
              <div className="info-card">
                <p className="info-role">{profileData.currentRole}</p>
                <p className="info-org">at {profileData.currentOrganization}</p>
              </div>
              {profileData.quote && (
                <div className="quote-display">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="quote-icon">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                  </svg>
                  <p>{profileData.quote}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* About Section */}
        <div className="profile-section">
          <h3 className="section-title">About</h3>

          {isEditing ? (
            <div className="edit-fields">
              <div className="field-group">
                <label>Introduction (100 words max)</label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  className="input-field textarea"
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
              </div>
              <div className="field-group">
                <label>Lives In</label>
                <input
                  type="text"
                  name="livesIn"
                  value={profileData.livesIn}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="City, Country"
                />
              </div>
              <div className="field-group">
                <label>What fills you with joy outside work?</label>
                <input
                  type="text"
                  name="joyOutsideWork"
                  value={profileData.joyOutsideWork}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Hobbies, interests..."
                />
              </div>
            </div>
          ) : (
            <div className="view-fields">
              <p className="bio-text">{profileData.bio}</p>
              <div className="location-display">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {profileData.livesIn}
              </div>
              {profileData.joyOutsideWork && (
                <div className="joy-display">
                  <span className="joy-label">Outside work:</span>
                  <span>{profileData.joyOutsideWork}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Social Links Section */}
        <div className="profile-section">
          <h3 className="section-title">Social & Content</h3>

          {isEditing ? (
            <div className="edit-fields">
              <div className="field-group">
                <label>LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  value={profileData.linkedin}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div className="field-group">
                <label>Twitter</label>
                <input
                  type="url"
                  name="twitter"
                  value={profileData.twitter}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="https://twitter.com/username"
                />
              </div>
              <div className="field-group">
                <label>Instagram</label>
                <input
                  type="url"
                  name="instagram"
                  value={profileData.instagram}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="https://instagram.com/username"
                />
              </div>
            </div>
          ) : (
            <div className="social-links-display">
              {profileData.linkedin && (
                <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              )}
              {profileData.twitter && (
                <a href={profileData.twitter} target="_blank" rel="noopener noreferrer" className="social-link twitter">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Twitter
                </a>
              )}
              {profileData.instagram && (
                <a href={profileData.instagram} target="_blank" rel="noopener noreferrer" className="social-link instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
              )}
              {!profileData.linkedin && !profileData.twitter && !profileData.instagram && (
                <p className="no-links">No social links added yet</p>
              )}
            </div>
          )}
        </div>

        {/* Story Videos Section */}
        <div className="profile-section">
          <h3 className="section-title">Story Videos</h3>
          <p className="section-subtitle">Share your journey through video to become a Super member</p>

          <div className="video-upload-grid">
            <Link to="/profile/videos" className="video-upload-card">
              <div className={`video-status ${profileData.hasVideos?.earlyLife ? 'uploaded' : ''}`}>
                {profileData.hasVideos?.earlyLife ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                )}
              </div>
              <span className="video-label">Early Life</span>
              <span className="video-status-text">
                {profileData.hasVideos?.earlyLife ? 'Uploaded' : 'Not uploaded'}
              </span>
            </Link>

            <Link to="/profile/videos" className="video-upload-card">
              <div className={`video-status ${profileData.hasVideos?.professionalLife ? 'uploaded' : ''}`}>
                {profileData.hasVideos?.professionalLife ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                )}
              </div>
              <span className="video-label">Professional Life</span>
              <span className="video-status-text">
                {profileData.hasVideos?.professionalLife ? 'Uploaded' : 'Not uploaded'}
              </span>
            </Link>

            <Link to="/profile/videos" className="video-upload-card">
              <div className={`video-status ${profileData.hasVideos?.currentLife ? 'uploaded' : ''}`}>
                {profileData.hasVideos?.currentLife ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                )}
              </div>
              <span className="video-label">Current Life</span>
              <span className="video-status-text">
                {profileData.hasVideos?.currentLife ? 'Uploaded' : 'Not uploaded'}
              </span>
            </Link>
          </div>
        </div>

        {/* Submit for Review Button */}
        {!isEditing && (
          <button className="submit-review-btn" onClick={handleSubmitForReview}>
            Submit for Review
          </button>
        )}

        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <Link to="/dashboard" className="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>Home</span>
          </Link>
          <Link to="/members" className="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>Members</span>
          </Link>
          <Link to="/profile" className="nav-item active">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>Profile</span>
          </Link>
        </nav>
      </div>
    </>
  )
}

export default MyProfile
