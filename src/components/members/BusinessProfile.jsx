import { useParams, Link, useNavigate } from 'react-router-dom'
import StatusBar from '../StatusBar'
import FloatingMenu from '../FloatingMenu'
import { members } from '../../data/mockData'
import '../../styles/businessProfile.css'

function BusinessProfile() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Find member who owns this business
  const member = members.find(m => m.id === id && m.business)

  if (!member || !member.business) {
    return (
      <>
        <StatusBar />
        <div className="page-content">
          <div className="not-found">
            <h2>Business not found</h2>
            <Link to="/members?tab=services">Back to Services</Link>
          </div>
        </div>
      </>
    )
  }

  const { business } = member

  const getTypeLabel = (type) => {
    switch (type) {
      case 'service': return 'Service'
      case 'product': return 'Product'
      case 'both': return 'Product & Service'
      default: return 'Service'
    }
  }

  const handleWhatsAppClick = () => {
    const message = `Hi ${member.firstName}, I found your business "${business.name}" on Gang 360 and would like to know more.`
    window.open(`https://wa.me/${member.whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${business.name} - Gang 360`,
          url: url
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      navigator.clipboard.writeText(url)
      alert('Business link copied to clipboard!')
    }
  }

  return (
    <>
      <StatusBar />
      <div className="page-content business-profile-page">
        {/* Header */}
        <div className="business-profile-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div className="business-badge-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            Gang's Business
          </div>
          <button className="share-btn" onClick={handleShare}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
        </div>

        {/* Business Hero */}
        <div className="business-hero">
          <h1 className="business-title">{business.name}</h1>
          <div className="business-meta-row">
            <span className="business-category-tag">{business.category}</span>
            <span className="business-type-tag">{getTypeLabel(business.type)}</span>
          </div>
        </div>

        {/* Description */}
        <div className="business-description-section">
          <p className="business-full-description">{business.description}</p>
        </div>

        {/* Member Discount Banner */}
        <div className="business-discount-highlight">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
            <line x1="7" y1="7" x2="7.01" y2="7"/>
          </svg>
          <span>{business.memberDiscount}</span>
        </div>

        {/* Services List (for service businesses) */}
        {business.type === 'service' && business.offerings && business.offerings.length > 0 && (
          <div className="business-services-section">
            <h3 className="services-section-title">What We Offer</h3>
            <ul className="services-simple-list">
              {business.offerings.map((offering, index) => (
                <li key={index} className="service-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>{offering.name}</span>
                </li>
              ))}
            </ul>
            <p className="services-cta-note">WhatsApp us for pricing and availability</p>
          </div>
        )}

        {/* Product Catalogue (for product businesses) */}
        {(business.type === 'product' || business.type === 'both') && business.offerings && business.offerings.length > 0 && (
          <div className="business-catalogue-section">
            <h3 className="catalogue-section-title">
              {business.type === 'both' ? 'Products & Services' : 'Product Catalogue'}
            </h3>
            <div className="product-grid">
              {business.offerings.map((offering, index) => (
                <div key={index} className="product-card">
                  {offering.image && (
                    <div className="product-image">
                      <img src={offering.image} alt={offering.name} />
                    </div>
                  )}
                  <span className="product-name">{offering.name}</span>
                </div>
              ))}
            </div>
            <p className="services-cta-note">WhatsApp us for pricing and availability</p>
          </div>
        )}

        {/* Contact Section */}
        <div className="business-contact-section">
          <h3 className="contact-section-title">Get in Touch</h3>
          <button className="whatsapp-contact-btn" onClick={handleWhatsAppClick}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contact on WhatsApp
          </button>
        </div>

        {/* Founders Section */}
        <div className="business-founders-section">
          <h3 className="founders-section-title">
            {business.coFounderIds?.length > 0 ? 'Meet the Founders' : 'Meet the Founder'}
          </h3>
          <div className="founders-cards">
            {/* Primary founder */}
            <Link to={`/member/${member.id}`} className="founder-profile-card">
              <div className="founder-profile-avatar">
                {member.profilePicture ? (
                  <img src={member.profilePicture} alt={member.firstName} />
                ) : (
                  <span>{member.firstName.charAt(0)}{member.lastName.charAt(0)}</span>
                )}
              </div>
              <div className="founder-profile-info">
                <span className="founder-profile-name">{member.firstName} {member.lastName}</span>
                <span className="founder-profile-role">{member.currentRole}</span>
                <span className="founder-profile-location">{member.livesIn?.split(',')[0]}</span>
              </div>
              <svg className="founder-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>

            {/* Co-founders */}
            {business.coFounderIds?.map(coFounderId => {
              const coFounder = members.find(m => m.id === coFounderId)
              if (!coFounder) return null
              return (
                <Link key={coFounderId} to={`/member/${coFounderId}`} className="founder-profile-card">
                  <div className="founder-profile-avatar">
                    {coFounder.profilePicture ? (
                      <img src={coFounder.profilePicture} alt={coFounder.firstName} />
                    ) : (
                      <span>{coFounder.firstName.charAt(0)}{coFounder.lastName.charAt(0)}</span>
                    )}
                  </div>
                  <div className="founder-profile-info">
                    <span className="founder-profile-name">{coFounder.firstName} {coFounder.lastName}</span>
                    <span className="founder-profile-role">{coFounder.currentRole}</span>
                    <span className="founder-profile-location">{coFounder.livesIn?.split(',')[0]}</span>
                  </div>
                  <svg className="founder-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </Link>
              )
            })}
          </div>
        </div>

      </div>
      <FloatingMenu />
    </>
  )
}

export default BusinessProfile
