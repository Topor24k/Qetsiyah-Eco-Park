// Scrolls an in-page anchor into view, leaving room for the fixed header.
// Sections that sit under a sticky bar declare extra clearance in CSS with
// `scroll-margin-top`, and that value is honored here.
export function scrollToAnchor(el, behavior = 'smooth') {
  if (!el) return;
  const declared = parseFloat(window.getComputedStyle(el).scrollMarginTop);
  const clearance = declared > 0 ? declared : 72;
  // Layout position, ignoring transforms: a section that has not played its
  // reveal animation yet is still shifted and would throw the target off.
  let layoutTop = 0;
  for (let node = el; node; node = node.offsetParent) layoutTop += node.offsetTop;

  window.scrollTo({ top: Math.max(0, layoutTop - clearance), behavior });
}

export default scrollToAnchor;
