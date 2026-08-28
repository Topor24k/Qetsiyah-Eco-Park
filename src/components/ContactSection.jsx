import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    guests: '',
    visitDate: '',
    serviceType: 'Day Tour & General Entrance',
    venueType: 'None (Day Visit Only)',
    numUnits: '1',
    activities: {
      zipLining: false,
      skyBiking: false,
      paddleBoats: false,
      horseRiding: false,
      playground: false,
      kiddyPool: false
    }
  });

  const handleActivityChange = (key) => {
    setFormData((prev) => ({
      ...prev,
      activities: {
        ...prev.activities,
        [key]: !prev.activities[key]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        mobileNumber: '',
        email: '',
        guests: '',
        visitDate: '',
        serviceType: 'Day Tour & General Entrance',
        venueType: 'None (Day Visit Only)',
        numUnits: '1',
        activities: {
          zipLining: false,
          skyBiking: false,
          paddleBoats: false,
          horseRiding: false,
          playground: false,
          kiddyPool: false
        }
      });
    }, 4000);
  };

  return (
    <section id="booking" className="booking-section-wrapper">
      {/* Anchor for contact backward-compatibility */}
      <div id="contact" style={{ position: 'relative', top: '-80px' }} />

      <div className="booking-section-container">
        <div className="booking-grid-layout">
          
          {/* =========================================================================
              LEFT COLUMN: WHAT HAPPENS NEXT & DIRECT CONTACT INFO
             ========================================================================= */}
          <div className="booking-left-column">
            <span className="booking-eyebrow">BEFORE YOU SEND</span>
            <h2 className="booking-left-title">
              Here’s what<br />happens next.
            </h2>

            {/* 3 Step Process List */}
            <div className="booking-steps-list">
              <div className="booking-step-item">
                <span className="step-num">1</span>
                <div className="step-content">
                  <strong className="step-title">Choose your date & activities</strong>
                  <p className="step-desc">Tell us your target visit date, preferred stays/venues, and adventure activities.</p>
                </div>
              </div>
              <div className="step-divider" />

              <div className="booking-step-item">
                <span className="step-num">2</span>
                <div className="step-content">
                  <strong className="step-title">We verify park availability</strong>
                  <p className="step-desc">Our park staff checks cottage schedules and ride capacity to reserve your slot.</p>
                </div>
              </div>
              <div className="step-divider" />

              <div className="booking-step-item">
                <span className="step-num">3</span>
                <div className="step-content">
                  <strong className="step-title">Receive confirmation & payment guide</strong>
                  <p className="step-desc">We send your reservation voucher with GCash / Bank deposit details to lock in your date.</p>
                </div>
              </div>
            </div>

            {/* Park Direct Contact Details */}
            <div className="booking-contact-info-card">
              <span className="contact-info-badge">OFFICIAL PARK CONTACT</span>
              
              <div className="contact-info-rows">
                <div className="contact-detail-item">
                  <MapPin size={18} className="contact-detail-icon" />
                  <div className="detail-texts">
                    <strong>Location:</strong>
                    <span>Barangay Calean, Tacurong City, Sultan Kudarat</span>
                  </div>
                </div>

                <a href="tel:09624074220" className="contact-detail-item link">
                  <Phone size={18} className="contact-detail-icon" />
                  <div className="detail-texts">
                    <strong>Phone Number:</strong>
                    <span>0962 407 4220</span>
                  </div>
                </a>

                <a href="mailto:qetsiyahecopark@gmail.com" className="contact-detail-item link">
                  <Mail size={18} className="contact-detail-icon" />
                  <div className="detail-texts">
                    <strong>Email:</strong>
                    <span>qetsiyahecopark@gmail.com</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: WHITE FORM CARD (TELL US ABOUT YOUR VISIT)
             ========================================================================= */}
          <div className="booking-form-card">
            <span className="booking-eyebrow">RESERVATION & INQUIRY</span>
            <h2 className="booking-form-title">Tell us about your visit.</h2>

            {submitted ? (
              <div className="booking-success-banner">
                <CheckCircle2 size={32} className="success-check-icon" />
                <div>
                  <h4 className="success-heading">Reservation Inquiry Sent!</h4>
                  <p className="success-desc">
                    Thank you, {formData.fullName || 'Guest'}. Our reservations team will check schedule availability and contact you via mobile / email promptly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="booking-stay-form">
                
                {/* Row 1: Full Name & Mobile Number */}
                <div className="form-line-row">
                  <div className="form-line-field">
                    <label className="field-line-label">FULL NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maria Santos"
                      className="line-input"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div className="form-line-field">
                    <label className="field-line-label">MOBILE NUMBER</label>
                    <input
                      type="tel"
                      required
                      placeholder="09XX XXX XXXX"
                      className="line-input"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    />
                  </div>
                </div>

                {/* Row 2: Email & Number of Guests */}
                <div className="form-line-row">
                  <div className="form-line-field">
                    <label className="field-line-label">EMAIL</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      className="line-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-line-field">
                    <label className="field-line-label">NUMBER OF GUESTS</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="e.g. 4"
                      className="line-input"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    />
                  </div>
                </div>

                {/* Row 3: Target Date of Visit & Our Services */}
                <div className="form-line-row">
                  <div className="form-line-field">
                    <label className="field-line-label">TARGET DATE OF VISIT</label>
                    <div className="date-input-wrapper">
                      <input
                        type="date"
                        required
                        className="line-input date-input"
                        value={formData.visitDate}
                        onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-line-field">
                    <label className="field-line-label">OUR SERVICES (EVENT TYPE)</label>
                    <div className="select-dropdown-wrapper">
                      <select
                        className="line-input line-select"
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      >
                        <option value="Day Tour & General Entrance">Day Tour & General Entrance</option>
                        <option value="Weddings & Receptions">Weddings & Receptions</option>
                        <option value="Family Events & Reunions">Family Events & Reunions</option>
                        <option value="Birthday & Milestone Celebrations">Birthday & Milestone Celebrations</option>
                        <option value="Office & Corporate Retreats">Office & Corporate Retreats</option>
                        <option value="Food Catering Package">Food Catering Package</option>
                        <option value="Event Hall Rental">Event Hall Rental</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Row 4: Stays & Venues & Number of Units */}
                <div className="form-line-row">
                  <div className="form-line-field">
                    <label className="field-line-label">STAYS & VENUES</label>
                    <div className="select-dropdown-wrapper">
                      <select
                        className="line-input line-select"
                        value={formData.venueType}
                        onChange={(e) => setFormData({ ...formData, venueType: e.target.value })}
                      >
                        <option value="None (Day Visit Only)">None (Day Visit Only)</option>
                        <option value="Verde Villa Retreat">Verde Villa Retreat</option>
                        <option value="Lakeside Cottages">Lakeside Cottages</option>
                        <option value="Qetsiyah Café Dining">Qetsiyah Café Dining</option>
                        <option value="Grand Function Hall">Grand Function Hall</option>
                        <option value="Nature Camp / Grounds">Nature Camp / Grounds</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-line-field">
                    <label className="field-line-label">NUMBER OF UNITS / COTTAGES</label>
                    <div className="select-dropdown-wrapper">
                      <select
                        className="line-input line-select"
                        value={formData.numUnits}
                        onChange={(e) => setFormData({ ...formData, numUnits: e.target.value })}
                      >
                        <option value="Not Applicable">Not Applicable</option>
                        <option value="1">1 Unit</option>
                        <option value="2">2 Units</option>
                        <option value="3">3 Units</option>
                        <option value="4+">4+ Units</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Activities Add-ons Section */}
                <div className="addons-section-wrapper">
                  <div className="addons-header-divider">
                    <span className="addons-title-tag">ACTIVITIES (ADD-ONS)</span>
                    <div className="addons-line" />
                  </div>

                  <div className="addons-checkbox-grid">
                    <label className="addon-check-label">
                      <input
                        type="checkbox"
                        checked={formData.activities.zipLining}
                        onChange={() => handleActivityChange('zipLining')}
                        className="custom-square-checkbox"
                      />
                      <span>Zip Lining</span>
                    </label>

                    <label className="addon-check-label">
                      <input
                        type="checkbox"
                        checked={formData.activities.skyBiking}
                        onChange={() => handleActivityChange('skyBiking')}
                        className="custom-square-checkbox"
                      />
                      <span>Sky Biking</span>
                    </label>

                    <label className="addon-check-label">
                      <input
                        type="checkbox"
                        checked={formData.activities.paddleBoats}
                        onChange={() => handleActivityChange('paddleBoats')}
                        className="custom-square-checkbox"
                      />
                      <span>Paddle Boats</span>
                    </label>

                    <label className="addon-check-label">
                      <input
                        type="checkbox"
                        checked={formData.activities.horseRiding}
                        onChange={() => handleActivityChange('horseRiding')}
                        className="custom-square-checkbox"
                      />
                      <span>Horse Riding</span>
                    </label>

                    <label className="addon-check-label">
                      <input
                        type="checkbox"
                        checked={formData.activities.playground}
                        onChange={() => handleActivityChange('playground')}
                        className="custom-square-checkbox"
                      />
                      <span>Playground for Kids</span>
                    </label>

                    <label className="addon-check-label">
                      <input
                        type="checkbox"
                        checked={formData.activities.kiddyPool}
                        onChange={() => handleActivityChange('kiddyPool')}
                        className="custom-square-checkbox"
                      />
                      <span>Kiddy Pool</span>
                    </label>
                  </div>
                </div>

                {/* Submit Action (Left Aligned) */}
                <div className="booking-submit-row">
                  <button type="submit" className="booking-submit-btn">
                    <span>SEND RESERVATION INQUIRY</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default ContactSection;
