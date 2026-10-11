import React from 'react';

// A photograph in a sharp-edged frame. It wipes into view on scroll and can
// drift slightly inside the frame (parallax). Pass `base` + `widths` for the
// pre-sized WebP copies in /public/optimized, or a plain `src`.
export function Media({
  base,
  widths = [640, 1100],
  src,
  sizes = '100vw',
  alt = '',
  className = '',
  parallax = false,
  reveal = true,
  hover = false,
  eager = false,
  delay = 0,
  children
}) {
  const imageProps = base
    ? {
        src: `${base}-${widths[0]}.webp`,
        srcSet: widths.map((width) => `${base}-${width}.webp ${width}w`).join(', '),
        sizes
      }
    : { src };

  return (
    <div
      className={`media ${hover ? 'media--hover' : ''} ${className}`}
      data-reveal={reveal ? 'clip' : undefined}
      style={delay ? { '--d': `${delay}ms` } : undefined}
    >
      <img
        {...imageProps}
        alt={alt}
        className="media-img"
        data-parallax={parallax ? '' : undefined}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
      {children}
    </div>
  );
}

export default Media;
