import { useEffect, useState } from 'react';

// True while the given media query matches, e.g. '(max-width: 768px)'.
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia?.(query).matches ?? false);

  useEffect(() => {
    const list = window.matchMedia?.(query);
    if (!list) return undefined;

    const handleChange = (event) => setMatches(event.matches);
    setMatches(list.matches);
    list.addEventListener('change', handleChange);
    return () => list.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

export default useMediaQuery;
