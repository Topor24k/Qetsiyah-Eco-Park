import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Minus, Plus } from 'lucide-react';
import { Lines } from './ui/Lines';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { playSound } from '../utils/sound';

const emptyForm = {
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
};

const activityOptions = [
  ['zipLining', 'Zip Lining'],
  ['skyBiking', 'Sky Biking'],
  ['paddleBoats', 'Paddle Boats'],
  ['horseRiding', 'Horse Riding'],
  ['playground', 'Playground for Kids'],
  ['kiddyPool', 'Kiddy Pool']
];

const bookingSteps = [
  {
    title: 'Choose your date & activities',
    text: 'Tell us your target visit date, preferred stays/venues, and adventure activities.'
  },
  {
    title: 'We verify park availability',
    text: 'Our park staff checks cottage schedules and ride capacity to reserve your slot.'
  },
  {
    title: 'Receive confirmation & payment guide',
    text: 'We send your reservation voucher with GCash / Bank deposit details to lock in your date.'
  }
];

// The three parts of the form. On phones they are shown one at a time.
const formParts = ['Your details', 'Your visit', 'Activities'];
const lastPart = formParts.length - 1;

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [part, setPart] = useState(0);
  const isPhone = useMediaQuery('(max-width: 768px)');
  const formRef = useRef(null);
  const partRefs = useRef([]);

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
    playSound('success', { delay: 0.16 });
    setTimeout(() => {
      setSubmitted(false);
      setFormData(emptyForm);
      setPart(0);
    }, 4000);
  };

  const setField = (name) => (e) => setFormData({ ...formData, [name]: e.target.value });

  const bumpGuests = (delta) => {
    setFormData((prev) => {
      const current = parseInt(prev.guests, 10) || 0;
      return { ...prev, guests: String(Math.max(1, current + delta)) };
    });
  };

  const showPart = (index) => {
    setPart(index);
    // Bring the top of the form back into view for the next set of fields.
    window.requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  // Phone only: check the fields on screen before moving on.
  const goNext = () => {
    const fields = partRefs.current[part]?.querySelectorAll('input, select') ?? [];
    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return;
      }
    }
    showPart(Math.min(lastPart, part + 1));
  };

  const goBack = () => showPart(Math.max(0, part - 1));

  const isHidden = (index) => isPhone && part !== index;
  const chosenActivities = activityOptions.filter(([key]) => formData.activities[key]).map(([, label]) => label);

  return (
    <section id="booking" className="section section--charcoal booking" aria-labelledby="booking-title">
      {/* Anchor for contact backward-compatibility */}
      <div id="contact" className="booking-anchor" />

      <div className="shell">
        <header className="booking-head">
          <p className="label booking-eyebrow" data-reveal="fade">
            <span className="num accent">04</span>
            <span>Reservation &amp; inquiry</span>
          </p>
          <Lines
            id="booking-title"
            className="display display-md booking-title"
            lines={['Tell us about', { text: 'your visit.', className: 'accent' }]}
          />
        </header>

        {/* Two columns on one grid. Each opens with the same kind of title
            row, so the rules and rows of both columns line up. */}
        <div className="booking-grid">
          <div className="booking-form-wrap">
            {submitted ? (
              <div className="booking-success" role="status" aria-live="polite">
                <p className="label accent">Sent</p>
                <h4 className="display display-sm">Reservation inquiry sent!</h4>
                <p className="body">
                  Thank you, {formData.fullName || 'Guest'}. Our reservations team will check schedule availability and contact you via mobile / email promptly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={`form ${isPhone ? 'form--steps' : ''}`}
                ref={formRef}
                data-reveal
              >
                {isPhone && (
                  <div className="form-progress" aria-live="polite">
                    <div className="form-progress-text">
                      <span className="label">{formParts[part]}</span>
                      <span className="label num">Step {part + 1} of {formParts.length}</span>
                    </div>
                    <div className="form-progress-bar" aria-hidden="true">
                      <i style={{ transform: `scaleX(${(part + 1) / formParts.length})` }} />
                    </div>
                  </div>
                )}

                {/* 1. Your details */}
                <fieldset className="form-group" hidden={isHidden(0)} ref={(el) => { partRefs.current[0] = el; }}>
                  <legend className="label group-title">
                    <span className="num">01</span>
                    <span>Your details</span>
                  </legend>

                  <div className="form-row">
                    <div className="field">
                      <label className="label" htmlFor="booking-full-name">Full name</label>
                      <input
                        id="booking-full-name"
                        name="fullName"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="e.g. Maria Santos"
                        className="input"
                        value={formData.fullName}
                        onChange={setField('fullName')}
                      />
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="booking-mobile-number">Mobile number</label>
                      <input
                        id="booking-mobile-number"
                        name="mobileNumber"
                        type="tel"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="09XX XXX XXXX"
                        className="input"
                        value={formData.mobileNumber}
                        onChange={setField('mobileNumber')}
                      />
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="booking-email">Email</label>
                      <input
                        id="booking-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        inputMode="email"
                        placeholder="name@example.com"
                        className="input"
                        value={formData.email}
                        onChange={setField('email')}
                      />
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="booking-guests">Number of guests</label>
                      <div className="stepper">
                        <input
                          id="booking-guests"
                          name="guests"
                          type="number"
                          min="1"
                          inputMode="numeric"
                          placeholder="e.g. 4"
                          className="input stepper-input"
                          value={formData.guests}
                          onChange={setField('guests')}
                        />
                        <button type="button" className="stepper-btn" onClick={() => bumpGuests(-1)} aria-label="Fewer guests">
                          <Minus size={16} aria-hidden="true" />
                        </button>
                        <button type="button" className="stepper-btn" onClick={() => bumpGuests(1)} aria-label="More guests">
                          <Plus size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </fieldset>

                {/* 2. Your visit */}
                <fieldset className="form-group" hidden={isHidden(1)} ref={(el) => { partRefs.current[1] = el; }}>
                  <legend className="label group-title">
                    <span className="num">02</span>
                    <span>Your visit</span>
                  </legend>

                  <div className="form-row">
                    <div className="field">
                      <label className="label" htmlFor="booking-visit-date">Target date of visit</label>
                      <input
                        id="booking-visit-date"
                        name="visitDate"
                        type="date"
                        required
                        className="input"
                        value={formData.visitDate}
                        onChange={setField('visitDate')}
                      />
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="booking-service-type">Our services (event type)</label>
                      <select
                        id="booking-service-type"
                        name="serviceType"
                        className="input input--select"
                        value={formData.serviceType}
                        onChange={setField('serviceType')}
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
                    <div className="field">
                      <label className="label" htmlFor="booking-venue-type">Stays &amp; venues</label>
                      <select
                        id="booking-venue-type"
                        name="venueType"
                        className="input input--select"
                        value={formData.venueType}
                        onChange={setField('venueType')}
                      >
                        <option value="None (Day Visit Only)">None (Day Visit Only)</option>
                        <option value="Verde Villa Retreat">Verde Villa Retreat</option>
                        <option value="Lakeside Cottages">Lakeside Cottages</option>
                        <option value="Qetsiyah Café Dining">Qetsiyah Café Dining</option>
                        <option value="Grand Function Hall">Grand Function Hall</option>
                        <option value="Nature Camp / Grounds">Nature Camp / Grounds</option>
                      </select>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="booking-unit-count">Number of units / cottages</label>
                      <select
                        id="booking-unit-count"
                        name="numUnits"
                        className="input input--select"
                        value={formData.numUnits}
                        onChange={setField('numUnits')}
                      >
                        <option value="Not Applicable">Not Applicable</option>
                        <option value="1">1 Unit</option>
                        <option value="2">2 Units</option>
                        <option value="3">3 Units</option>
                        <option value="4+">4+ Units</option>
                      </select>
                    </div>
                  </div>
                </fieldset>

                {/* 3. Activities */}
                <fieldset className="form-group" hidden={isHidden(2)} ref={(el) => { partRefs.current[2] = el; }}>
                  <legend className="label group-title group-title--flush">
                    <span className="num">03</span>
                    <span>Activities (add-ons)</span>
                  </legend>

                  <div className="checks-grid">
                    {activityOptions.map(([key, label]) => (
                      <label className={`check ${formData.activities[key] ? 'is-checked' : ''}`} key={key}>
                        <input
                          type="checkbox"
                          checked={formData.activities[key]}
                          onChange={() => handleActivityChange(key)}
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>

                  {/* Phone: a last look before sending */}
                  {isPhone && (
                    <dl className="form-review">
                      <div><dt className="label">Name</dt><dd>{formData.fullName}</dd></div>
                      <div><dt className="label">Mobile</dt><dd>{formData.mobileNumber}</dd></div>
                      <div><dt className="label">Date</dt><dd>{formData.visitDate}</dd></div>
                      <div><dt className="label">Guests</dt><dd>{formData.guests || 'Not set'}</dd></div>
                      <div><dt className="label">Service</dt><dd>{formData.serviceType}</dd></div>
                      <div><dt className="label">Venue</dt><dd>{formData.venueType}</dd></div>
                      <div><dt className="label">Activities</dt><dd>{chosenActivities.length ? chosenActivities.join(', ') : 'None chosen'}</dd></div>
                    </dl>
                  )}
                </fieldset>

                <div className="form-actions">
                  {isPhone && part > 0 && (
                    <button type="button" className="form-back" onClick={goBack}>
                      <ArrowLeft size={16} aria-hidden="true" />
                      <span>Back</span>
                    </button>
                  )}
                  {isPhone && part < lastPart ? (
                    <button type="button" className="btn form-next" onClick={goNext}>
                      <span>Next: {formParts[part + 1]}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  ) : (
                    <button type="submit" className="btn form-submit">
                      <span>Send reservation inquiry</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* What happens next, and direct contact details */}
          <aside className="booking-info">
            <div className="info-block" data-reveal>
              <h3 className="label group-title">Before you send</h3>
              <p className="display display-sm info-heading">Here’s what happens next.</p>

              <ol className="steps">
                {bookingSteps.map((step, index) => (
                  <li className="step" key={step.title}>
                    <span className="label num">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <strong className="step-title">{step.title}</strong>
                      <p className="step-text">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="info-block" data-reveal>
              <h3 className="label group-title group-title--flush">Official park contact</h3>

              <ul className="contact-rows">
                <li className="contact-row">
                  <span className="label label-dim">Location</span>
                  <span className="contact-value">Barangay Calean, Tacurong City, Sultan Kudarat</span>
                </li>
                <li>
                  <a className="contact-row" href="tel:09624074220">
                    <span className="label label-dim">Phone number</span>
                    <span className="contact-value">0962 407 4220</span>
                    <ArrowUpRight size={16} className="contact-arrow" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a className="contact-row" href="mailto:qetsiyahecopark@gmail.com">
                    <span className="label label-dim">Email</span>
                    <span className="contact-value">qetsiyahecopark@gmail.com</span>
                    <ArrowUpRight size={16} className="contact-arrow" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
