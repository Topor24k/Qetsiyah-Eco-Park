import { useEffect } from 'react';
import { playSound } from '../utils/sound';

const CLICKABLE = 'a, button, [role="button"]';

// Which sound a clicked control makes. A component can override this with
// data-sound="name", or silence itself with data-sound="off".
function soundForClick(el) {
  const named = el.closest('[data-sound]');
  if (named) return named.dataset.sound === 'off' ? null : named.dataset.sound;
  if (el.disabled || el.getAttribute('aria-disabled') === 'true') return null;

  const has = (name) => el.classList.contains(name);

  // Things that unfold: read the state before the click changes it.
  if (has('nav-burger') || has('nav-link--toggle') || has('faq-question') || has('menu-item-row')) {
    return el.getAttribute('aria-expanded') === 'true' ? 'close' : 'open';
  }

  if (has('chapters-arrow--next')) return 'slideNext';
  if (has('chapters-arrow--prev')) return 'slidePrev';
  if (el.closest('.lightbox-nav')) {
    return (el.getAttribute('aria-label') || '').startsWith('Previous') ? 'slidePrev' : 'slideNext';
  }
  if (has('mosaic-tile')) return 'shutter';
  if (has('lightbox-close')) return null; // the viewer plays its own closing sound
  if (has('stepper-btn')) {
    return (el.getAttribute('aria-label') || '').startsWith('Fewer') ? 'stepDown' : 'stepUp';
  }
  if (has('btn')) return 'press';
  if (has('tab') || has('chapters-tab') || has('chapters-pill') || has('icon-btn') || has('menu-search-clear')) {
    return 'tick';
  }
  return 'tap';
}

/**
 * Gives the whole interface its sounds from one place: clicks, typing,
 * dropdowns, checkboxes and fields that fail validation. Page-change and
 * form-sent sounds are played where those things happen.
 */
export function useInterfaceSounds() {
  useEffect(() => {
    // Capture phase, so a toggle is read before React flips its state.
    const handleClick = (event) => {
      const el = event.target instanceof Element ? event.target.closest(CLICKABLE) : null;
      if (!el) return;
      const sound = soundForClick(el);
      if (sound) playSound(sound);
    };

    const handleInput = (event) => {
      const el = event.target;
      if (!(el instanceof HTMLElement) || el.closest('[data-sound="off"]')) return;

      if (el.matches('input[type="checkbox"], input[type="radio"]')) {
        playSound(el.checked ? 'checkOn' : 'checkOff');
        return;
      }
      if (el.matches('select, input[type="date"], input[type="time"], input[type="range"]')) {
        playSound('tick');
        return;
      }
      if (!el.matches('input, textarea')) return;

      const kind = event.inputType || '';
      if (kind.startsWith('delete')) playSound('keyBack');
      else if (event.data === ' ') playSound('keySpace');
      else if (kind === 'insertFromPaste' || kind === 'insertFromDrop') playSound('tick');
      else playSound('key');
    };

    // A required field was left empty or filled in wrongly.
    const handleInvalid = () => playSound('error');

    document.addEventListener('click', handleClick, true);
    document.addEventListener('input', handleInput, true);
    document.addEventListener('invalid', handleInvalid, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('input', handleInput, true);
      document.removeEventListener('invalid', handleInvalid, true);
    };
  }, []);
}

export default useInterfaceSounds;
