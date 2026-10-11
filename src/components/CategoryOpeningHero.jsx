import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Play, Volume2, VolumeX } from 'lucide-react';

// Opening title card for a page: a full-bleed photograph or film with the
// page name set very large in the corner. Films play silently on larger
// screens; on phones (and for Save-Data visitors) they wait for a tap so a
// large video is never downloaded uninvited.
export function CategoryOpeningHero({
  titleTop = 'DISCOVER',
  titleBottom = 'ALL OUR ACTIVITIES',
  flankLeft = 'ECO-PARK EXPERIENCES',
  flankRight = 'SULTAN KUDARAT',
  image = '/Background Pictures/Background Hero Section II.jpg',
  video = null,
  id = 'opening-hero',
  lede = null,
  hasContentBelow = false,
  onExploreBelow = null,
  exploreLabel = 'SCROLL TO VIEW FULL MENU'
}) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const wantsPlaybackRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const isVideo = Boolean(video);

  // Quiet autoplay where it is welcome.
  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    const saveData = Boolean(navigator.connection?.saveData);
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const smallScreen = window.matchMedia?.('(max-width: 768px)').matches;
    if (saveData || reducedMotion || smallScreen) return;

    videoRef.current.muted = true;
    wantsPlaybackRef.current = true;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  }, [isVideo]);

  // Stop the film (and its sound) once the visitor scrolls past the hero,
  // and pick it back up when they return.
  useEffect(() => {
    if (!isVideo || !('IntersectionObserver' in window) || !sectionRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const el = videoRef.current;
        if (!el) return;
        if (!entry.isIntersecting) {
          el.pause();
          setIsPlaying(false);
        } else if (wantsPlaybackRef.current && el.paused) {
          el.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVideo]);

  // Depth on scroll: the media drifts slower than the page.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    let frame = null;
    const update = () => {
      frame = null;
      const el = sectionRef.current;
      if (!el) return;
      const progress = Math.min(1, Math.max(0, window.scrollY / el.offsetHeight));
      el.style.setProperty('--sy', progress.toFixed(4));
    };
    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    update();
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
    };
  }, []);

  // One control: start the film with sound, then toggle the sound.
  const handleFilmControl = () => {
    const el = videoRef.current;
    if (!el) return;

    if (!isPlaying) {
      el.muted = false;
      wantsPlaybackRef.current = true;
      el.play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {
          // Sound was refused: fall back to silent playback.
          el.muted = true;
          el.play().then(() => setIsPlaying(true)).catch(() => {});
          setIsMuted(true);
        });
      return;
    }

    el.muted = !el.muted;
    setIsMuted(el.muted);
  };

  const handleExplore = () => {
    if (onExploreBelow) onExploreBelow();
  };

  // Icon-only control showing the current state: a play mark before the film
  // starts, then the sound-off or sound-on speaker.
  let filmLabel = 'Play film with sound';
  let FilmIcon = Play;
  if (isPlaying) {
    filmLabel = isMuted ? 'Turn sound on' : 'Turn sound off';
    FilmIcon = isMuted ? VolumeX : Volume2;
  }

  return (
    <section className={`phero ${isPlaying ? 'is-playing' : ''}`} id={id} ref={sectionRef}>
      <div className="phero-media" data-intro aria-hidden="true">
        {isVideo ? (
          <video
            ref={videoRef}
            src={video}
            poster={image}
            loop
            playsInline
            muted
            preload="metadata"
            className="phero-asset"
          />
        ) : (
          <img src={image} alt="" className="phero-asset" fetchPriority="high" decoding="async" />
        )}
        <div className="phero-shade" />
      </div>

      <div className="phero-ui shell">
        <div className="phero-meta" data-intro style={{ '--intro-delay': '1250ms' }}>
          <span className="label">{flankLeft}</span>
          <span className="label">{flankRight}</span>
        </div>

        <div className="phero-foot">
          <h1 className="display phero-title">
            <span className="ln">
              <span data-intro style={{ '--intro-delay': '380ms' }}>{titleTop}</span>
            </span>
            <span className="ln">
              <span data-intro style={{ '--intro-delay': '520ms' }}><span className="accent">{titleBottom}</span></span>
            </span>
          </h1>

          {lede && (
            <p className="phero-lede" data-intro style={{ '--intro-delay': '1100ms' }}>{lede}</p>
          )}

          {(isVideo || hasContentBelow) && (
            <div className="phero-actions" data-intro style={{ '--intro-delay': '1250ms' }}>
              {isVideo && (
                <button
                  type="button"
                  className="icon-btn"
                  onClick={handleFilmControl}
                  aria-label={filmLabel}
                  title={filmLabel}
                >
                  <FilmIcon size={18} aria-hidden="true" />
                </button>
              )}
              {hasContentBelow && (
                <button type="button" className="link-arrow" onClick={handleExplore}>
                  {exploreLabel}
                  <ArrowDown size={14} aria-hidden="true" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CategoryOpeningHero;
