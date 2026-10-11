import React, { useEffect, useRef, useState } from 'react';

const sentence = 'Where families come together, celebrations feel special, adventures begin, and every moment is yours to enjoy.';
const words = sentence.split(' ');
// The closing promise is set in the accent color.
const accentFrom = words.indexOf('every');

// Scroll-driven statement: the sentence stays pinned while each word lights
// up in turn, so the visitor reads it at the pace they scroll.
export function AboutStorySection() {
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      animationFrameRef.current = null;
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalScrollDistance = Math.max(1, rect.height - windowHeight);
      let p = -rect.top / totalScrollDistance;
      p = Math.max(0, Math.min(1, p));
      setProgress(p);
    };

    const handleScroll = () => {
      if (animationFrameRef.current) return;
      animationFrameRef.current = window.requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  // Finish lighting the sentence a little before the section releases.
  const reading = Math.min(1, progress / 0.9);

  return (
    <section className="story" id="about-story" ref={containerRef}>
      <div className="story-pin">
        <div className="shell story-inner">
          <p className="label story-label">
            <span className="num accent">01</span>
            <span>The promise</span>
          </p>

          <h2 className="display story-text">
            {words.map((word, i) => {
              const wordStart = i / words.length;
              const wordEnd = (i + 1) / words.length;

              let wordOpacity = 0.14;
              if (reading > wordStart) {
                 let localProgress = (reading - wordStart) / (wordEnd - wordStart);
                 localProgress = Math.min(1, localProgress);
                 wordOpacity = 0.14 + (0.86 * localProgress);
              }

              return (
                <span
                  key={i}
                  className={i >= accentFrom ? 'accent' : undefined}
                  style={{ opacity: wordOpacity }}
                >
                  {word}{' '}
                </span>
              );
            })}
          </h2>

          <div className="story-progress" aria-hidden="true">
            <i style={{ transform: `scaleX(${reading})` }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutStorySection;
