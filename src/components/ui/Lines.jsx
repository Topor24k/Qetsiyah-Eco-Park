import React from 'react';

// A display headline broken into lines. Each line sits in its own mask and
// rises into place when the heading scrolls into view (see base.css).
// `lines` items are strings or { text, className } for an accented line.
export function Lines({ as: Tag = 'h2', lines, className = '', delay = 0, id, reveal = true }) {
  return (
    <Tag
      id={id}
      className={className}
      data-reveal={reveal ? 'lines' : undefined}
      style={delay ? { '--d': `${delay}ms` } : undefined}
    >
      {lines.map((line, index) => {
        const text = typeof line === 'string' ? line : line.text;
        const lineClass = typeof line === 'string' ? '' : line.className || '';
        return (
          <span className="ln" key={`${index}-${text}`} style={{ '--i': index }}>
            {/* outer span slides; inner span carries the color or highlight */}
            <span><span className={lineClass || undefined}>{text}</span></span>
          </span>
        );
      })}
    </Tag>
  );
}

export default Lines;
