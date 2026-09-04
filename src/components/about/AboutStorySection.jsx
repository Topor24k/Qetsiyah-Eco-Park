import React, { useEffect, useRef, useState } from 'react';

export function AboutStorySection() {
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const sentence = "Where families come together, celebrations feel special, adventures begin, and every moment is yours to enjoy.";
  const words = sentence.split(' ');

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

  return (
    <section className="about-story-section" ref={containerRef}>
      <div className="about-story-container">
        <h2 className="story-sentence teleprompter-text">
          {words.map((word, i) => {
            const wordStart = i / words.length;
            const wordEnd = (i + 1) / words.length;
            
            let wordOpacity = 0.22;
            if (progress > wordStart) {
               let localProgress = (progress - wordStart) / (wordEnd - wordStart);
               localProgress = Math.min(1, localProgress);
               wordOpacity = 0.22 + (0.78 * localProgress);
            }
            
            return (
              <span 
                key={i} 
                style={{ 
                  opacity: wordOpacity, 
                  transition: 'opacity 0.08s linear',
                  color: '#383e24'
                }}
              >
                {word}{' '}
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
}

export default AboutStorySection;
