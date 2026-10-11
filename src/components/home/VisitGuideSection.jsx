import React, { useState } from 'react';
import { ArrowUpRight, BadgeCheck, Plus } from 'lucide-react';
import { parkInfo, visitFaqs } from '../../data/parkInfo';
import { Lines } from '../ui/Lines';

// Everything a first-time visitor asks before coming: hours, entrance fee,
// directions, contact, and a short FAQ. Sits just above the booking form.
export function VisitGuideSection() {
  const [openFaq, setOpenFaq] = useState(visitFaqs[0].id);

  return (
    <section className="section section--teal visit" id="visit" aria-labelledby="visit-title">
      <div className="shell">
        <header className="section-head">
          <p className="section-head-label label" data-reveal="fade">
            <span className="num">03</span>
            <span>Plan your visit</span>
          </p>
          <Lines
            id="visit-title"
            className="display display-lg section-head-title"
            lines={['Good to know', { text: 'before you go', className: 'accent' }]}
          />
          <p className="label section-head-aside visit-badge" data-reveal>
            <BadgeCheck size={16} aria-hidden="true" />
            <span>DOT-accredited tourism recreation facility</span>
          </p>
        </header>

        <hr className="rule" data-reveal="rule" />

        <div className="facts">
          <div className="fact" data-reveal>
            <h3 className="label fact-label"><span className="num">01</span> Park hours</h3>
            <p className="display display-sm fact-value">Daily<br />{parkInfo.hours.openLabel} – {parkInfo.hours.closeLabel}</p>
            <p className="fact-note">{parkInfo.hours.days}</p>
          </div>

          <div className="fact" data-reveal style={{ '--d': '90ms' }}>
            <h3 className="label fact-label"><span className="num">02</span> Entrance fee</h3>
            <p className="display display-sm fact-value">{parkInfo.entrance.display}</p>
            <p className="fact-note">{parkInfo.entrance.note}</p>
          </div>

          <div className="fact" data-reveal style={{ '--d': '180ms' }}>
            <h3 className="label fact-label"><span className="num">03</span> Find us</h3>
            <p className="display display-sm fact-value">Barangay Calean<br />Tacurong City</p>
            <a className="link-arrow" href={parkInfo.mapsHref} target="_blank" rel="noopener noreferrer">
              Get directions
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>

          <div className="fact" data-reveal style={{ '--d': '270ms' }}>
            <h3 className="label fact-label"><span className="num">04</span> Talk to us</h3>
            <p className="display display-sm fact-value">
              <a href={parkInfo.phoneHref}>{parkInfo.phoneDisplay}</a>
            </p>
            <a className="fact-note fact-mail" href={parkInfo.emailHref}>{parkInfo.email}</a>
          </div>
        </div>

        <div className="faq">
          <p className="label faq-label" data-reveal="fade">Quick answers</p>
          <div className="faq-list">
            {visitFaqs.map((faq, index) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  className={`faq-item ${isOpen ? 'is-open' : ''}`}
                  key={faq.id}
                  data-reveal
                  style={{ '--d': `${index * 70}ms` }}
                >
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${faq.id}`}
                    id={`faq-button-${faq.id}`}
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  >
                    <span className="label num faq-num">{String(index + 1).padStart(2, '0')}</span>
                    <span className="faq-question-text">{faq.question}</span>
                    <Plus size={18} className="faq-icon" aria-hidden="true" />
                  </button>
                  <div
                    className="faq-panel"
                    id={`faq-panel-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-button-${faq.id}`}
                  >
                    <div className="faq-panel-inner">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisitGuideSection;
